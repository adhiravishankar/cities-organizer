import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { NumericFormat } from 'react-number-format';

import { attachOrdinal } from '../../common/functions/getOrdinal';
import { Metro } from '../../common/interfaces/Metro';
import { AppStore } from '../../common/stores/AppStore';

export interface MetrosTableProps {
  store: AppStore;
}


export function MetrosTable(props: MetrosTableProps) {
  const columns: MRT_ColumnDef<Metro>[] = useMemo(() => [
    {
      header: 'Name',
      accessorKey: 'Name',
      Cell: ({ cell }) => cell.getValue(),
    },
    {
      header: 'ExtendedName',
      accessorKey: 'ExtendedName',
      Cell: ({ cell }) => cell.getValue(),
    },
    {
      header: 'Population',
      accessorKey: 'Population',
      Cell: ({ cell }) => <NumericFormat displayType="text" thousandSeparator="," value={ cell.getValue() as number } />,
    },
    {
      header: 'Metro Size Rank',
      accessorKey: 'MetroSizeRank',
      Cell: ({ cell }) => attachOrdinal(cell.getValue() as number),
    },
  ] as MRT_ColumnDef<Metro>[], []);

  return <MaterialReactTable columns={ columns } data={ props.store.metrosArray } enableColumnActions={ false } />;
}

