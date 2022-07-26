import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import { Grid, Box, Typography, Button } from "@mui/material";

const Home: React.FC = () => {
  return (
    <Grid container alignItems="stretch" justifyContent="center" columns={12}>
      <Box
        className="home-bg"
        sx={{ pt: "150px", display: "inline-block", textAlign: "center" }}
      >
        <img
          src="/logo.svg"
          alt="MEMORYBOX by Alejandro and John"
          style={{ width: "300px" }}
        />

        <Box sx={{ px: "20px", margin: "0 auto", maxWidth: "500px" }}>
          <Typography
            variant="h1"
            color="initial"
            sx={{
              display: "inline-block",
              color: "#fff",
              fontSize: "24px",
              lineHeight: "35px",
              letterSpacing: "1px",
              pt: "50px",
              textAlign: "center",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <LinkRouter to="/register" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            size="large"
            disableElevation
            sx={{ mt: "calc(100vh - 793px)" }}
            className="buttons"
          >
            Create Box
          </Button>
        </LinkRouter>
        <Typography
          variant="caption"
          sx={{ textAlign: "center", p: "53px 20px 0 20px", color: "#d7d7d7" }}
        >
          This project has been developed by Alejandro F. Marrero and John
          Woitkowitz as part of the Intensive Program of Web Development
          (5-Months Full-Time Course) Full Stack Path.
        </Typography>
      </Box>
    </Grid>
  );
};
export default Home;
