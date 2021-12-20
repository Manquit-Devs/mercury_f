import { List, ListItem, Box, SwipeableDrawer, Toolbar } from '@mui/material';

const LeftBar = () => {
  return (
    <SwipeableDrawer
      open={true}
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        <ListItem>Deploys</ListItem>
        <ListItem>Filas</ListItem>
        <ListItem>Usuários</ListItem>
        <ListItem>Configurações</ListItem>
      </List>
    </SwipeableDrawer>
  );
};

export default LeftBar;
