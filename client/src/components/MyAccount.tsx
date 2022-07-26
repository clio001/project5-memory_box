import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import { Grid, Box, Typography, Button, TextField } from "@mui/material";

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
      }}
    ></Grid>
  );
};
export default MyAccount;
