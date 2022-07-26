import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../components/Register";
import { Box } from "@mui/material";

function ViewRegister() {
  return (
    <Box className="ViewRegister">
      <Register />
    </Box>
  );
}

export default ViewRegister;
