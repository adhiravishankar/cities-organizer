import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

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
      Cell: ({ cell }) => cell.getValue(),
    },
    {
      header: 'Metro Size Rank',
      accessorKey: 'MetroSizeRank',
      Cell: ({ cell }) => cell.getValue(),
    },
  ] as MRT_ColumnDef<Metro>[], []);

  return <MaterialReactTable columns={ columns } data={ props.store.metrosArray } enableColumnActions={ false } />;
}

