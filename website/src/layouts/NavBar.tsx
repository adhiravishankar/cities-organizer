import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

export interface NavBarProps {
  name: string;
}

export function NavBar(props: NavBarProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>{ props.name }</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
