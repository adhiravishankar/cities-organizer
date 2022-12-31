import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Table } from 'react-bootstrap';
import { NumericFormat } from 'react-number-format';

import { City } from '../../common/interfaces/City';
import { AppStore } from '../../common/stores/AppStore';

export interface MetrosTableProps {
  store: AppStore;
}


export function CitiesTable(props: MetrosTableProps) {
  const columnHelper = createColumnHelper<City>();

  const columns = [
    columnHelper.accessor('Name', {
      cell: info => info.getValue(),
      header: () => <span>Name</span>,
    }),
    columnHelper.accessor('MetroID', {
      cell: info => props.store.metrosMap.get(info.getValue())?.Name ?? 'Unknown',
      header: () => <span>Metropolitan Area</span>,
    }),
    columnHelper.accessor('Population', {
      header: () => 'Population',
      cell: info => <NumericFormat displayType="text" thousandSeparator="," value={ info.renderValue() } />,
    }),
  ];

  const tableProps = {
    data: props.store.citiesArray,
    getCoreRowModel: getCoreRowModel(),
    columns,
  };
  const table = useReactTable<City>(tableProps);
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

