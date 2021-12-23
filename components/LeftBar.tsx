import { List, ListItem, Box, SwipeableDrawer, Toolbar } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import QueueIcon from '@mui/icons-material/Queue';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import Link from 'next/link';
import { useContext } from 'react';
import { NavBarContext } from '../context/navbar';

const LeftBar = () => {
  const { isOpen, setIsOpen } = useContext(NavBarContext);
  const renderListItems = () => (
    <>
      <ListItem>
        <Link href="/deploy">
          <a>
            <RocketLaunchIcon />
            <Box ml={1}>Deploys</Box>
          </a>
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/queue" passHref>
          <a>
            <QueueIcon />
            <Box ml={1}>Filas</Box>
          </a>
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/users" passHref>
          <a>
            <SupervisedUserCircleIcon />
            <Box ml={1}>Usuários</Box>
          </a>
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/settings" passHref>
          <a>
            <SettingsIcon />
            <Box ml={1}>Configurações</Box>
          </a>
        </Link>
      </ListItem>
    </>
  );

  const onOpenHandler = () => setIsOpen(true);
  const onCloseHandler = () => setIsOpen(false);

  return (
    <SwipeableDrawer
      open={isOpen}
      onOpen={onOpenHandler}
      onClose={onCloseHandler}
      variant="persistent"
      sx={{
        width: 200,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 200,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <List>{renderListItems()}</List>
    </SwipeableDrawer>
  );
};

export default LeftBar;
