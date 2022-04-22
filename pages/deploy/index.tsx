import { Box, Button } from "@mui/material";
import type { NextPage } from "next";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import DeployTable from "../../components/DeployTable";
import LeftBar from "../../components/LeftBar";
import Main from "../../components/Main";
import NavBar from "../../components/NavBar";
import Spinner from "../../components/Spinner";
import { NavBarContext } from "../../context/navbar";
import { DeployGetBody, getDeploys } from "../../services/deploy";

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

  useEffect(() => {
    fetchDeploys();
  }, []);

  return (
    <Box>
      <NavBar />
      <Box display="flex">
        <LeftBar />
        <Main open={isOpen}>
          {isLoading ? (
            <Spinner />
          ) : (
            <Box display="flex" flexDirection="column">
              <Box alignSelf="flex-end">
                <Link href="deploy/create" passHref>
                  <Button variant="contained">New deploy setup</Button>
                </Link>
              </Box>
              <DeployTable deploys={deploys} />
            </Box>
          )}
        </Main>
      </Box>
    </Box>
  );
};

export default Deploy;
