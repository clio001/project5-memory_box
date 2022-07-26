import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import { Grid, Box, Typography, Button, TextField } from "@mui/material";

const Register: React.FC = () => {
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
        <img src="/register.svg" alt="Login" style={{ width: "80px" }} />
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
          Create an Account
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
        <TextField
          id="outlined-email"
          label="E-Mail"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: "280px", mb: "20px" }}
        />

        <TextField
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
          Register
        </Button>

        <Typography component="p" sx={{ mt: "25px" }}>
          Already have an account?{" "}
          <LinkRouter to="/login" style={{ textDecoration: "none" }}>
            Login
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
export default Register;
