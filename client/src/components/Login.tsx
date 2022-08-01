import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import { Grid, Box, Typography, Button, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';


const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#473800',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#473800',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      color: '#79747E',
      borderColor: '#79747E',
    },
    '&:hover fieldset': {
      color: '#666500',
      borderColor: '#666500',
    },
    '&.Mui-focused fieldset': {
      color: '#473800',
      borderColor: '#473800',
    },
  },
});


const Login: React.FC = () => {
  return (
    <Grid
      container
      alignItems="stretch"
      justifyContent="center"
      columns={12}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "nowrap",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          mt: "60px",
        }}
      >
        <img src="/login.svg" alt="Login" style={{ width: "80px" }} />
        <Typography
          variant="h1"
          color="initial"
          sx={{
            display: "inline-block",
            fontSize: "24px",
            lineHeight: "35px",
            letterSpacing: "1px",
            pt: "40px",
            textAlign: "center",
          }}
        >
          Log in in to your Account
        </Typography>
      </Box>
      <Box
        className="TextField"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          mt: "50px",
        }}
      >
        <CssTextField
          id="outlined-email"
          label="E-Mail"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: "280px", mb: "20px" }}
        />

        <CssTextField
          id="outlined-password"
          label="Password"
          type="password"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: "280px", mb: "30px", borderRadius: "100px" }}
        />

        <Button
          variant="contained"
          size="large"
          disableElevation
          className="buttons"
        >
          Login
        </Button>

        <Typography component="p" sx={{ mt: "25px" }}>
          Don't have an account?{" "}
          <LinkRouter to="/register" style={{ textDecoration: "none" }}>
            Signup
          </LinkRouter>
        </Typography>
      </Box>

      <Box
        sx={{
          width: "300px",
          mt: "25px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="span"
          m={1}
          sx={{ width: "100%", border: "1px solid #C2C8D0" }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: "10px",
            color: "#2D333A",
            fontSize: "12px",
          }}
        >
          OR
        </Box>

        <Box
          component="span"
          m={1}
          sx={{ width: "100%", border: "1px solid #C2C8D0" }}
        ></Box>
      </Box>
      <Box sx={{ mt: "30px" }}>
        <Button
          variant="outlined"
          size="large"
          disableElevation
          className="social-btn"
        >
          <img
            src="/google.svg"
            alt="Register with Google"
            className="google"
          />
          Continue with Google
        </Button>
      </Box>
      <Box sx={{ mt: "15px" }}>
        <Button
          variant="outlined"
          size="large"
          disableElevation
          className="social-btn"
        >
          <img
            src="/github.svg"
            alt="Register with GitHub"
            className="google"
          />
          Continue with GitHub
        </Button>
      </Box>
    </Grid>
  );
};
export default Login;
