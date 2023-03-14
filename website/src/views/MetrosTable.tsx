import { Box, IconButton } from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { ReactNode, useMemo } from 'react';
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router';
import { useContainer } from 'unstated-next';

import { attachOrdinal } from '../functions/getOrdinal';
import { Metro } from '../interfaces/Metro';
import { MetrosContainer } from '../stores/MetrosStore';


export function MetrosTable() {
  const MetrosStore = useContainer(MetrosContainer);
  const navigation = useNavigate();

  const columns: MRT_ColumnDef<Metro>[] = useMemo(() => [
    {
      header: 'Name',
      accessorKey: 'Name',
      Cell: ({ cell }) => cell.getValue(),
    },
    {
      header: 'Extended Name',
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

  return (
    <MaterialReactTable
      columns={ columns }
      data={ MetrosStore.metros }
      enableColumnActions={ false }
      positionActionsColumn="last"
      enableRowActions
      renderRowActions={({ row }) => (
        <Box>
          <IconButton onClick={() => navigation('/metros/' + row.original.ID)}>
            <i className="fas fa-circle-info" />
          </IconButton>
        </Box>
      ) as ReactNode}
    />
  );
}

