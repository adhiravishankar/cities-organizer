import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useCallback } from 'react';

export interface NavBarProps {
  name: string;

  id?: number;

  editIcon: boolean;

  onEdit?: (id: number) => void;
}

export function NavBar(props: NavBarProps) {
  const onClick = useCallback(() => {
    props.onEdit(props.id);
  }, [props.onEdit, props.id]);

  const editIcon = props.editIcon ? <IconButton onClick={ onClick }><EditIcon sx={{ color: 'white' }} /></IconButton>
    : null;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>{ props.name }</Typography>
          { editIcon }
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
