import { Grid } from '@mui/material';
import type { NextPage } from 'next';
import LeftBar from '../components/LeftBar';
import NavBar from '../components/NavBar';

const Home: NextPage = () => {
  return (
    <Grid display="flex" flexDirection="column">
      <Grid item xs={12}>
        <NavBar />
        <LeftBar />
      </Grid>
      <Grid item xs={4}>
        <span>laulau</span>
      </Grid>
      <Grid item xs={8}>
        <span>laulau</span>
      </Grid>
    </Grid>
  );
};

export default Home;
