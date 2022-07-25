import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import {
	Grid, Box, Typography, Button
} from '@mui/material';

const Login: React.FC = () => {
  return (
  <Grid container alignItems="stretch"
			justifyContent="center"
			columns={12}
			sx={{ mt: '0', pb: '60px' }}
		>
			Login
		</Grid>
  );
};
export default Login;