
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { City } from '../../common/interfaces/City';
import { AppStore } from '../../common/stores/AppStore';

export interface CitiesTableProps {
  store: AppStore;
}


export function CitiesTable(props: CitiesTableProps) {
  const columns: MRT_ColumnDef<City>[] = useMemo(() => [
    {
      header: 'Name',
      accessorKey: 'Name',
      Cell: ({ cell }) => cell.getValue(),
    },
    {
      header: 'Metropolitan Area',
      accessorKey: 'MetroID',
      Cell: ({ cell }) => props.store.metrosMap.get(cell.getValue() as string)?.Name ?? 'Unknown',
    },
    {
      header: 'Population',
      accessorKey: 'Population',
      Cell: ({ cell }) => cell.getValue(),
    },
  ] as MRT_ColumnDef<City>[], []);

  return <MaterialReactTable columns={ columns } data={ props.store.citiesArray } />;
}

