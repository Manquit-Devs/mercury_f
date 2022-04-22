import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface SimpleBackdropProps {
  open: boolean;
}

const SimpleBackdrop = ({ open }: SimpleBackdropProps) => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: 9999 }} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default SimpleBackdrop;
