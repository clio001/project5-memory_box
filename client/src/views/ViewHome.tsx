import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home"
import {Box} from '@mui/material';

function ViewHome() {
  return (
    <Box className="ViewHome">
		<Home />
    </Box>
  );
}

export default ViewHome;
