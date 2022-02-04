import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Spinner = () => {
  return (
    <Box width="100%" display="flex" m={1} justifyContent="center">
      <CircularProgress />
    </Box>
  );
}

export default Spinner;