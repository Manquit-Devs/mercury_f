import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { useContext } from 'react';
import { NavBarContext } from '../contexts/navbar';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const NavBar = () => {
  const { isOpen, setIsOpen } = useContext(NavBarContext);

  const onToggleMenuHandle = () => setIsOpen(!isOpen);

  return (
    <AppBar
      position="sticky"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={onToggleMenuHandle}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MERCURY
        </Typography>
        <Button color="inherit">
          <PersonIcon />
          Alfred
        </Button>
        <IconButton>
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
