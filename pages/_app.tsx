import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NavBarProvider } from '../context/navbar';

import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <NavBarProvider>
        <Component {...pageProps} />
        <CssBaseline />
      </NavBarProvider>
    </ThemeProvider>
  );
}

export default MyApp;
