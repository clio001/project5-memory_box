import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import { Grid, Box, Typography, Button } from "@mui/material";

const NoMatch: React.FC = () => {
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
          mt: "35px",
        }}
      >
        <img src="/404.svg" alt="Login" style={{ width: "250px" }} />
        <Typography
          variant="h1"
          color="initial"
          sx={{
            display: "inline-block",
            fontSize: "100px",
            lineHeight: "35px",
            letterSpacing: "1px",
            pt: "40px",
            textAlign: "center",
            fontWeight: "400",
          }}
        >
          404
        </Typography>
        <Typography
          variant="h1"
          color="initial"
          sx={{
            display: "inline-block",
            fontSize: "30px",
            lineHeight: "35px",
            letterSpacing: "1px",
            pt: "40px",
            textAlign: "center",
          }}
        >
          page not found
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
          sorry{" "}
        </Box>

        <Box
          component="span"
          m={1}
          sx={{ width: "100%", border: "1px solid #C2C8D0" }}
        ></Box>
      </Box>
      <Box sx={{ mt: "30px" }}>
        <LinkRouter to="/" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            size="large"
            disableElevation
            className="buttons"
          >
            Go back Home
          </Button>
        </LinkRouter>
      </Box>
    </Grid>
  );
};
export default NoMatch;
