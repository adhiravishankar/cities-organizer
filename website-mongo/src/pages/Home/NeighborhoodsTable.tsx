import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { Neighborhood } from '../../common/interfaces/Neighborhood';
import { AppStore } from '../../common/stores/AppStore';

export interface NeighborhoodsTableProps {
  store: AppStore;
}


export function NeighborhoodsTable(props: NeighborhoodsTableProps) {
  const columns: MRT_ColumnDef<Neighborhood>[] = useMemo(() => [
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
      header: 'City',
      accessorKey: 'CityID',
      Cell: ({ cell }) => props.store.citiesMap.get(cell.getValue() as string)?.Name ?? 'Unknown',
    },
    {
      header: 'Link',
      accessorKey: 'Link',
      Cell: ({ cell }) => cell.getValue(),
    },
  ] as MRT_ColumnDef<Neighborhood>[], []);

  return <MaterialReactTable columns={ columns } data={ props.store.neighborhoodsArray } enableColumnActions={ false } />;
}

