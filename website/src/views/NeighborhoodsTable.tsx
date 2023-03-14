import { Box, IconButton } from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { ReactNode, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useContainer } from 'unstated-next';

import { Neighborhood } from '../interfaces/Neighborhood';
import { CitiesContainer } from '../stores/CitiesStore';
import { MetrosContainer } from '../stores/MetrosStore';
import { NeighborhoodsContainer } from '../stores/NeighborhoodsStore';


export function NeighborhoodsTable() {
  const MetrosStore = useContainer(MetrosContainer);
  const CitiesStore = useContainer(CitiesContainer);
  const NeighborhoodsStore = useContainer(NeighborhoodsContainer);

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
      Cell: ({ cell }) => MetrosStore.metrosMap.get(cell.getValue() as string)?.Name ?? 'Unknown',
    },
    {
      header: 'City',
      accessorKey: 'CityID',
      Cell: ({ cell }) => CitiesStore.citiesMap.get(cell.getValue() as string)?.Name ?? 'Unknown',
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
      data={ NeighborhoodsStore.neighborhoods }
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

