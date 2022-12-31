import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Table } from 'react-bootstrap';

import { Metro } from '../../common/interfaces/Metro';
import { AppStore } from '../../common/stores/AppStore';
import {NumericFormat} from "react-number-format";
import { getOrdinal } from '../../common/functions/getOrdinal';

export interface MetrosTableProps {
  store: AppStore;
}


export function MetrosTable(props: MetrosTableProps) {
  const columnHelper = createColumnHelper<Metro>();

  const columns = [
    columnHelper.accessor('Name', {
      cell: info => info.getValue(),
      header: () => <span>Name</span>,
    }),
    columnHelper.accessor('ExtendedName', {
      cell: info => info.getValue(),
      header: () => <span>Extended Name</span>,
    }),
    columnHelper.accessor('Population', {
      header: () => 'Population',
      cell: info => <NumericFormat displayType="text" thousandSeparator="," value={ info.renderValue() } />,
    }),
    columnHelper.accessor('MetroSizeRank', {
      header: () => <span>Metro Size Rank</span>,
      cell: info => <span>{ info.renderValue() + getOrdinal(info.renderValue()) }</span>,
    }),
  ];

  const tableProps = {
    data: props.store.metrosArray,
    getCoreRowModel: getCoreRowModel(),
    columns,
  };
  const table = useReactTable<Metro>(tableProps);
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

