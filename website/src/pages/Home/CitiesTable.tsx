
import { Box, IconButton, MenuItem } from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { ReactNode, useMemo } from 'react';
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router';

import { City } from '../../common/interfaces/City';
import { AppStore } from '../../common/stores/AppStore';

export interface CitiesTableProps {
  store: AppStore;
}


export function CitiesTable(props: CitiesTableProps) {
  const navigation = useNavigate();

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
      Cell: ({ cell }) => <NumericFormat displayType="text" thousandSeparator="," value={ cell.getValue() as number } />,
    },
  ] as MRT_ColumnDef<City>[], []);

  return (
    <MaterialReactTable
      columns={ columns }
      data={ props.store.citiesArray }
      positionActionsColumn="last"
      enableRowActions
      renderRowActions={({ row }) => (
        <Box>
          <IconButton onClick={() => navigation('/cities/' + row.original.ID)}>
            <i className="fas fa-circle-info" />
          </IconButton>
        </Box>
      ) as ReactNode}
    />
  );
}

