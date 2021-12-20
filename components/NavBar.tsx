import { SwipeableDrawer } from '@mui/material';
import { useState } from 'react';

const NavBar = () => {
  const [open, setOpen] = useState(true);
  return (
    <SwipeableDrawer
      variant="permanent"
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <div>Fala otarios</div>
    </SwipeableDrawer>
  );
};

export default NavBar;
