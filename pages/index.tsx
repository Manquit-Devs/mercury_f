import { Box } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import LeftBar from '../components/LeftBar';
import Main from '../components/Main';
import NavBar from '../components/NavBar';
import VerifyAuth from '../components/VerifyAuth';
import { NavBarContext } from '../contexts/navbar';

const Home: NextPage = () => {
  const { isOpen } = useContext(NavBarContext);
  const router = useRouter();

  useEffect(() => {
    router.push('/deploys');
  }, [router]);

  return (
    <>
      <Head>
        <title>Home page</title>
      </Head>
      <Box>
        <VerifyAuth />
        <NavBar />
        <Box display="flex">
          <LeftBar />
          <Main open={isOpen}>
            Essa partida foi deveras fácil aconselho-lhes que treinem mais para
            que possam ganhar futuramente algum dia, gostei do treino para
            iniciantes, poderiam ter inserido o "FF" ou "/surrender" mais rápido
            possível para que tamanha humilhação não fosse tão grande, espero
            encontra-los logo mais para que eu possa ganhar mais CR e Evoluir meu
            rank rapidamente.
          </Main>
        </Box>
      </Box>
    </>
  );
};

export default Home;
