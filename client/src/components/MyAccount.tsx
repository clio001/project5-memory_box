import React from "react";
// import { Link as LinkRouter } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Grid, Box, Typography } from "@mui/material";


import {GetUsers, FormErrors, ErrorSeverity, ErrorMessage} from "../types"


const GET_USERS = gql`
  query GetUsers {
    users {
      _id
      firstName
      lastName
      email
		password
      avatar_url
		banner_url
    }
  }
`;

const MyAccount: React.FC = () => {
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
          position: "relative",
          width: "100%",
          height: "200px",
          backgroundColor: "#f6f6f6",
          borderRadius: "0 0 70px 70px",
          background:
            "#f6f6f6 url(./profile-bg.jpg) center center/cover no-repeat;",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: "90px",
            width: "150px",
            margin: "0 auto",
          }}
        >
          <img
            src={data?.users[3].avatar_url}
            alt="profile img"
            style={{
              borderRadius: "100px",
              width: "150px",
              boxShadow: "0 0 0px 5px #b5b5b5",
            }}
          />
        </Box>
      </Box>
      <Box>
        <Typography
          variant="h1"
          color="initial"
          sx={{
            fontSize: "24px",
            lineHeight: "0px",
            letterSpacing: "0px",
            pt: "90px",
            pb: "15px",
            textAlign: "center",
          }}
        >
          {data?.users[3].firstName}
        </Typography>
        <Typography
          component="p"
          color="initial"
          sx={{
            fontSize: "16px",
            pt: "5px",
            letterSpacing: "0px",
            textAlign: "center",
            color: "#C2C8D0",
            fontWeight: "300",
          }}
        >
          {data?.users[3].email}
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
    </Grid>
  );
};
export default MyAccount;

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
