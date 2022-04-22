import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import type { NextPage } from "next";

const Login: NextPage = () => {
  return (
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
          display="grid"
          gap="10px"
          width={{
            xs: "90%",
            md: "70%",
            lg: "35%",
            xl: "30%",
          }}
        >
          <TextField label="Username" variant="filled" fullWidth />
          <TextField
            label="Password"
            variant="filled"
            type="password"
            fullWidth
          />
          <Button fullWidth>Login</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
