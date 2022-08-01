import React from "react";
// import { Link as LinkRouter } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Grid, Box, Typography, TextField, Button } from "@mui/material";

interface GetUsers {
  [key: string]: any;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar_url: string;
}

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      firstName
      lastName
      email
      avatar_url
    }
  }
`;

const MyAccountEdit: React.FC = () => {
  const { loading, error, data } = useQuery<GetUsers>(GET_USERS);

  console.log(data?.users);

  console.log(data?.users[3].firstName);

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
            display: "flex",
            justifyContent: "center",
            pt: "60px",
            width: "150px",
            margin: "0 auto",
          }}
        >
          <img
            src={data?.users[3].avatar_url}
            alt="profile img"
            style={{
              borderRadius: "100px",
              width: "100px",
            }}
          />
        </Box>

      <Box>
        <Typography
          variant="h1"
          color="initial"
          sx={{
            fontSize: "24px",
            lineHeight: "0px",
            letterSpacing: "0px",
            pt: "50px",
            pb: "15px",
            textAlign: "center",
          }}
        >
          Edit your account
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

      <Box
        className="TextField"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          mt: "50px",
        }}
      >
	{/* <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}> */}
	<form style={{display: 'flex', flexDirection: 'column'}}>
        <TextField
          id="outlined-email"
          label="E-Mail"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: "280px", mb: "20px" }}
			 name="email"
			//  value={formValues.email}
			//  onChange={handleInputChange}
        />

        <TextField
          id="outlined-password"
          label="Password"
          type="password"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: "280px", mb: "30px", borderRadius: "100px" }}
			 name="password"
			//  value={formValues.password}
			//  onChange={handleInputChange}
        />

		  <Button variant="contained"
          size="large"
          disableElevation
          className="buttons" 
			 type="submit">
          Save Changes
        </Button>
		</form>
</Box>

    </Grid>
  );
};
export default MyAccountEdit;

// <Box>
//   <div>
//     {data &&
//       data?.users.map((param: any) => (
//         <div key={param.id}>
//           <h2>{param.firstName}</h2>
//         </div>
//       ))}
//   </div>
// </Box>;
