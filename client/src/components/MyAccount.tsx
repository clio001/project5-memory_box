import React from "react";
// import { Link as LinkRouter } from "react-router-dom";
import { Grid, Box, Typography } from "@mui/material";
import { width } from "@mui/system";

const MyAccount: React.FC = () => {
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
        mt: "55px",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "200px",
          backgroundColor: "#f6f6f6",
          borderRadius: "0 0 70px 70px",
          background:
            "#f6f6f6 url(./profile-bg.jpg) center center/cover no-repeat;",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", pt: "170px" }}>
          <img
            src="./profile-img.png"
            alt="profile img"
            style={{ border: "5px solid #fff", borderRadius: "100px" }}
          />
        </Box>
      </Box>
      <Box>
        <Typography
          variant="h1"
          color="initial"
          sx={{
            display: "inline-block",
            fontSize: "24px",
            lineHeight: "35px",
            letterSpacing: "0px",
            pt: "80px",
            textAlign: "center",
          }}
        >
          Alejandro F. Marrero
        </Typography>
        <br />
        <Typography
          component="p"
          color="initial"
          sx={{
            fontSize: "16px",
            pt: "5px",
            letterSpacing: "0px",
            textAlign: "center",
            color: "#C2C8D0",
            fontWeight: "300",
          }}
        >
          info@alejandrofm.com
        </Typography>
      </Box>
      <Box
        sx={{
          width: "300px",
          mt: "15px",
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
            fontSize: "17px",
          }}
        >
          +
        </Box>

        <Box
          component="span"
          m={1}
          sx={{ width: "100%", border: "1px solid #C2C8D0" }}
        ></Box>
      </Box>
    </Grid>
  );
};
export default MyAccount;
