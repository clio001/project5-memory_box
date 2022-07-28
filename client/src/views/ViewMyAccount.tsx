import React from "react";
import { Routes, Route } from "react-router-dom";
import Appbar from "../components/Appbar";
import MyAccount from "../components/MyAccount";
import { Box } from "@mui/material";

function ViewMyAccount() {
  return (
    <Box className="ViewMyAccount">
      <Appbar />
      <MyAccount />
    </Box>
  );
}

export default ViewMyAccount;
