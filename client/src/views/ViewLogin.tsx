import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from "../components/Login"
import {Box} from '@mui/material';

function ViewLogin() {
  return (
    <Box className="ViewLogin">
		<Login />
    </Box>
  );
}

export default ViewLogin;
