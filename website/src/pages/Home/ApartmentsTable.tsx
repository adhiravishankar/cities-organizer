import { Box, IconButton } from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { ReactNode, useMemo } from 'react';
import { useNavigate } from 'react-router';

import { Apartment } from '../../common/interfaces/Apartment';
import { AppStore } from '../../common/stores/AppStore';

export interface ApartmentsTableProps {
  store: AppStore;
}


export function ApartmentsTable(props: ApartmentsTableProps) {
  const navigation = useNavigate();

  const columns: MRT_ColumnDef<Apartment>[] = useMemo(() => [
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
  ] as MRT_ColumnDef<Apartment>[], []);

  return (
    <MaterialReactTable
      columns={ columns }
      data={ props.store.apartmentsArray }
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

