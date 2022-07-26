import React from "react";
// import { Link as LinkRouter } from "react-router-dom";
import { Grid, Box } from "@mui/material";

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
    >
      <Box sx={{ mt: "100px" }}>Hola</Box>
    </Grid>
  );
};
export default MyAccount;
