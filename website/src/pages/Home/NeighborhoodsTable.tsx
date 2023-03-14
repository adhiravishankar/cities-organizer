import { Box, IconButton } from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { ReactNode, useMemo } from 'react';
import { useNavigate } from 'react-router';

import { Neighborhood } from '../../interfaces/Neighborhood';
import { AppStore } from '../../stores/AppStore';

export interface NeighborhoodsTableProps {
  store: AppStore;
}


export function NeighborhoodsTable(props: NeighborhoodsTableProps) {
  const navigation = useNavigate();

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

  return (
    <MaterialReactTable
      columns={ columns }
      data={ props.store.neighborhoodsArray }
      enableColumnActions={ false }
      positionActionsColumn="last"
      enableRowActions
      renderRowActions={({ row }) => (
        <Box>
          <IconButton onClick={() => navigation('/neighborhoods/' + row.original.ID)}>
            <i className="fas fa-circle-info" />
          </IconButton>
        </Box>
      ) as ReactNode}
    />
  );
}

