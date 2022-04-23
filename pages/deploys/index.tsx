import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Button, Typography } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import DeployTable from '../../components/DeployTable';
import LeftBar from '../../components/LeftBar';
import Main from '../../components/Main';
import NavBar from '../../components/NavBar';
import Spinner from '../../components/Spinner';
import VerifyAuth from '../../components/VerifyAuth';
import { NavBarContext } from '../../contexts/navbar';
import { DeployGetBody, getDeploys } from '../../services/deploy';

const Deploy: NextPage = () => {
  const { isOpen } = useContext(NavBarContext);
  const [isLoading, setIsLoading] = useState(true);
  const [deploys, setDeploys] = useState(Array<DeployGetBody>());

  const fetchDeploys = async () => {
    try {
      setIsLoading(true);
      const deploys = await getDeploys();
      setDeploys(deploys);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefreshTableHandler = () => fetchDeploys();

  useEffect(() => {
    fetchDeploys();
  }, []);

  return (
    <>
      <VerifyAuth />
      <Head>
        <title>Deploys</title>
      </Head>
      <Box>
        <NavBar />
        <Box display="flex">
          <LeftBar />
          <Main open={isOpen}>
            {isLoading ? (
              <Spinner />
            ) : (
              <Box display="flex" flexDirection="column">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h5">Deploys</Typography>
                  <Box display="grid" gap="5px" gridTemplateColumns="1fr 1fr">
                    <Button
                      endIcon={<RefreshIcon />}
                      onClick={onRefreshTableHandler}
                    >
                      Refresh table
                    </Button>
                    <Link href="deploys/create" passHref>
                      <Button variant="contained">New deploy setup</Button>
                    </Link>
                  </Box>
                </Box>

                <DeployTable
                  deploys={deploys}
                  reloadTable={onRefreshTableHandler}
                />
              </Box>
            )}
          </Main>
        </Box>
      </Box>
    </>
  );
};

export default Deploy;
