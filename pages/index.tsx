import type { NextPage } from 'next';
import { Grid, CssBaseline } from '@mui/material';
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
        
      </Grid>
    </Grid>
  );
};

export default Home;
