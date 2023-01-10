import { AppBar, Box, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Fragment, useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

export interface NavBarProps {
  name: string;

  id?: string;

  editIcon: boolean;

  onEdit?: () => void;
}

export function NavBar(props: NavBarProps) {
  const { editIcon, id, name, onEdit } = props;
  const navigation = useNavigate();

  const [addMenu, setAddMenu] = useState<null | HTMLElement>(null);
  
  const openAddMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAddMenu(event.currentTarget);
  };

  const closeAddMenu = () => {
    setAddMenu(null);
  };

  const onClickEditIcon = useCallback(() => onEdit(), [onEdit, id]);
  const onClickAboutIcon = useCallback(() => navigation('/about'), [onEdit, id]);

  const onAddMetro = useCallback(() => navigation('/add-metro'), []);
  const onAddCity = useCallback(() => navigation('/add-city'), []);
  const onAddNeighborhood = useCallback(() => navigation('/add-neighborhood'), []);

  const plusIconJSX = (
    <Fragment>
      <div onClick={ openAddMenu } className="nav-icon">
        <i className="fas fa-plus" />
        Add
      </div>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={addMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(addMenu)}
        onClose={closeAddMenu}
      >
        <MenuItem key="metro" onClick={onAddMetro}>
          <Typography textAlign="center">Metro</Typography>
        </MenuItem>
        <MenuItem key="city" onClick={onAddCity}>
          <Typography textAlign="center">City</Typography>
        </MenuItem>
        <MenuItem key="neighborhood" onClick={onAddNeighborhood}>
          <Typography textAlign="center">Neighborhood</Typography>
        </MenuItem>
      </Menu>
    </Fragment>
  );
  const editIconJSX = !editIcon ? null : (
    <div onClick={ onClickEditIcon } className="nav-icon">
      <i className="fas fa-pen"/>
      Edit
    </div>
  );

  const aboutIconJSX = (
    <div onClick={ onClickAboutIcon } className="nav-icon">
      <i className="fas fa-circle-info"/>
      About
    </div>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>{ name }</Typography>
          <div className="nav-icons">
            { editIconJSX }
            { plusIconJSX }
            { aboutIconJSX }
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
