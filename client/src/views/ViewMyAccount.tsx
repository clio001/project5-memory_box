import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../components/Register";
import { Box } from "@mui/material";

function ViewMyAccount() {
  return (
    <Box className="ViewMyAccount">
      <Register />
    </Box>
  );
}

export default ViewMyAccount;
