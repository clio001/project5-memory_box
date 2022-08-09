import React, { useEffect, useState } from "react";
import {Link as LinkRouter, useNavigate} from "react-router-dom";
import { Grid, Box, Typography, Button } from "@mui/material";

const DeletedUser: React.FC = (targetDate) => {

	const [counter, setCounter] = React.useState(5);

	  const redirectTo = useNavigate();

	React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);

	 if(counter === 0) {
		redirectTo("/");
	 }

  }, [counter]);

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
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          mt: "60px",
        }}>
        <img src="/delete.svg" alt="Login" style={{width: "80px"}} />
        
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
          Account deleted
        </Typography>
        <Typography
          component="p"
          color="initial"
          sx={{
            display: "inline-block",
            fontSize: "13px",
            lineHeight: "10px",
            letterSpacing: "1px",
            pt: "20px",
            textAlign: "center",
          }}
        >
          You will be redirected back to Home in a few seconds.
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
          {counter}
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
export default DeletedUser;
