import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Table } from 'react-bootstrap';

import { Neighborhood } from '../../common/interfaces/Neighborhood';
import { AppStore } from '../../common/stores/AppStore';

export interface NeighborhoodsTableProps {
  store: AppStore;
}


export function NeighborhoodsTable(props: NeighborhoodsTableProps) {
  const columnHelper = createColumnHelper<Neighborhood>();

  const columns = [
    columnHelper.accessor('Name', {
      cell: info => info.getValue(),
      header: () => <span>Name</span>,
    }),
    columnHelper.accessor('MetroID', {
      cell: info => <span>{ props.store.metrosMap.get(info.getValue())?.Name ?? 'Unknown' }</span>,
      header: () => <span>Metropolitan Area</span>,
    }),
    columnHelper.accessor('CityID', {
      header: () => 'City',
      cell: info => <span>{ props.store.citiesMap.get(info.getValue())?.Name ?? 'Unknown' }</span>,
    }),
    columnHelper.accessor('Link', {
      header: () => <span>Link</span>,
      cell: info => <span>{ info.renderValue() }</span>,
    }),
    columnHelper.accessor('Address', {
      header: () => <span>Address</span>,
      cell: info => <span>{ info.renderValue() }</span>,
    }),
  ];

  const tableProps = {
    data: props.store.neighborhoodsArray,
    getCoreRowModel: getCoreRowModel(),
    columns,
  };
  const table = useReactTable<Neighborhood>(tableProps);
  return (
    <Table striped bordered hover responsive size="sm">
      <thead>
      {table.getHeaderGroups().map(headerGroup => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map(header => (
            <th key={header.id} colSpan={header.colSpan}>
              {header.isPlaceholder
                ? null
                : flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
            </th>
          ))}
        </tr>
      ))}
      </thead>
      <tbody>
      {table.getRowModel().rows.map(row => (
        <tr key={row.id}>
          {row.getVisibleCells().map(cell => (
            <td key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
      </tbody>
    </Table>
  );
}

