import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { NextComponentType, NextPageContext } from 'next';
import type { AppProps } from 'next/app';
import { useContext } from 'react';
import SimpleBackdrop from '../components/SimpleBackdrop';
import AuthProvider, { AuthContext } from '../contexts/auth';
import { NavBarProvider } from '../contexts/navbar';
import '../styles/globals.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

interface PageProps {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
}

const Page = ({ Component, pageProps }: PageProps) => {
  const { isLoadingUser } = useContext(AuthContext);

  if (isLoadingUser) return <SimpleBackdrop open />;

  return <Component {...pageProps} />;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <AuthProvider>
        <NavBarProvider>
          <Page Component={Component} pageProps={pageProps} />
          <CssBaseline />
        </NavBarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
