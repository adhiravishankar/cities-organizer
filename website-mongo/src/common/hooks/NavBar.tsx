import { Fragment, useCallback } from 'react';
import { useNavigate } from 'react-router';
import {AppBar, Box, Toolbar, Typography} from "@mui/material";

export interface NavBarProps {
  name: string;

  id?: string;

  editIcon: boolean;

  onEdit?: () => void;
}

export function NavBar(props: NavBarProps) {
  const { editIcon, id, name, onEdit } = props;

  const navigation = useNavigate();

  const onClickEditIcon = useCallback(() => {
    onEdit();
  }, [onEdit, id]);

  const onAddMetro = useCallback(() => navigation('/add-metro'), []);
  const onAddCity = useCallback(() => navigation('/add-city'), []);
  const onAddNeighborhood = useCallback(() => navigation('/add-neighborhood'), []);

  const plusIconJSX = (
    <Fragment>
      <i className="fas fa-plus" />
      Add
    </Fragment>
  );
  const editIconJSX = editIcon ? <i className="fas fa-pen" /> : null;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>{ name }</Typography>
          <div>
            { editIconJSX }
            { plusIconJSX }
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
