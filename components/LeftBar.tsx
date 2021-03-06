import { List, ListItem, Box, SwipeableDrawer, Toolbar } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import QueueIcon from '@mui/icons-material/Queue';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import Link from 'next/link';
import { useContext } from 'react';
import { NavBarContext } from '../contexts/navbar';

const LeftBar = () => {
  const { isOpen, setIsOpen } = useContext(NavBarContext);
  const renderListItems = () => (
    <>
      <ListItem>
        <Link href="/deploys">
          <a>
            <RocketLaunchIcon />
            <Box ml={1}>Deploys</Box>
          </a>
        </Link>
      </ListItem>
      <ListItem style={{ color: 'grey' }}>
        {/* <Link href="/queue" passHref> */}
        <a>
          <QueueIcon />
          <Box ml={1}>Queues</Box>
        </a>
        {/* </Link> */}
      </ListItem>
      <ListItem style={{ color: 'grey' }}>
        {/* <Link href="/users" passHref> */}
        <a>
          <SupervisedUserCircleIcon />
          <Box ml={1}>Users</Box>
        </a>
        {/* </Link> */}
      </ListItem>
      <ListItem style={{ color: 'grey' }}>
        {/* <Link href="/settings" passHref> */}
        <a>
          <SettingsIcon />
          <Box ml={1}>Settings</Box>
        </a>
        {/* </Link> */}
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
