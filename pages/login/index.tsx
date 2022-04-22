import { Box, Button, TextField, Typography } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';
import SimpleBackdrop from '../../components/SimpleBackdrop';
import VerifyAuth from '../../components/VerifyAuth';
import { AuthContext } from '../../contexts/auth';
import { errorAlert } from '../../utils/alertUtils';

const Login: NextPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signUp, isAuthenticated } = useContext(AuthContext);

  const isFormValid = useMemo(
    () => Boolean(username && password),
    [username, password]
  );

  const onLoginHandler = async () => {
    if (isFormValid) {
      try {
        setIsLoading(true);
        await signUp(username, password);
      } catch (error) {
        await errorAlert('Failed to sign up, check your username or password', true);
      } finally{
        setIsLoading(false);
      }
    }
  };

  const onChangeUsernameHandler = (username: string) => setUsername(username);

  const onChangePasswordHandler = (password: string) => setPassword(password);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <SimpleBackdrop open={isLoading} />
      <Box
        width="100%"
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box mb="20px">
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              MERCURY
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={isFormValid ? onLoginHandler : () => {}}
            display="grid"
            gap="10px"
            width={{
              xs: '90%',
              md: '70%',
              lg: '35%',
              xl: '30%',
            }}
          >
            <TextField
              label="Username"
              variant="filled"
              value={username}
              fullWidth
              onChange={(event) => onChangeUsernameHandler(event.target.value)}
            />
            <TextField
              label="Password"
              variant="filled"
              type="password"
              value={password}
              fullWidth
              onChange={(event) => onChangePasswordHandler(event.target.value)}
            />
            <Button fullWidth onClick={onLoginHandler} disabled={!isFormValid}>
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
