import { Box, Container, styled } from '@mui/material';
import type { NextPage } from 'next';
import { useContext } from 'react';
import LeftBar from '../components/LeftBar';
import NavBar from '../components/NavBar';
import { NavBarContext } from '../context/navbar';
import Main from '../components/Main';

const Deploy: NextPage = () => {
  const { isOpen, setIsOpen } = useContext(NavBarContext);
  return (
    <Box>
      <NavBar />
      <Box display="flex">
        <LeftBar />
        <Main open={isOpen}>laulau</Main>
      </Box>
    </Box>
  );
};

export default Deploy;
