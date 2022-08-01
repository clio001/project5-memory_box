import React, { useState } from "react";
// import { Link as LinkRouter } from "react-router-dom";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Grid, Box, Typography, TextField, Button } from "@mui/material";
import { styled } from '@mui/material/styles';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#473800',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#473800',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      color: '#79747E',
      borderColor: '#79747E',
    },
    '&:hover fieldset': {
      color: '#666500',
      borderColor: '#666500',
    },
    '&.Mui-focused fieldset': {
      color: '#473800',
      borderColor: '#473800',
    },
  },
});

// type  GetUsers Array<{
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   avatar_url: string;
// }>
interface GetUsers {
  [key: string]: any;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar_url: string;
  banner_url: string;
}

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      firstName
      lastName
      email
		password
      avatar_url
		banner_url
    }
  }
`;

const UPDATE_USER = gql`
mutation UpdateUser(
	$firstName: String, 
	$lastName: String, 
	$email: String, 
	$password: String, 
	$avatarUrl: String,
	$bannerURL: String
	) {
  updateUser(
	firstName: $firstName, 
	lastName: $lastName, 
	email: $email,
	password: $password,
	avatar_url: $avatarUrl,
	banner_url: $bannerURL,
	) {
    firstName
    lastName
    email
    avatar_url
    banner_url
    password
  }
}
`;

const MyAccountEdit: React.FC = () => {

  const { loading, error, data } = useQuery<GetUsers>(GET_USERS);
  console.log(data?.users);
//   console.log(data?.users[3].firstName);


	//Default value for inputs
	const defaultValues = {firstName: "", lastName: "", avatar_url: "", banner_url: "", email: "", password: ""};

	const [formValues, setFormValues] = useState(defaultValues);
	console.log(formValues)

    const [updateUser] = useMutation(UPDATE_USER);
	 
	 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		 e.preventDefault();
		 handleClear();
		 updateUser({ variables: {
			 firstName: formValues.firstName,
			 lastName: formValues.lastName,
			 email: formValues.email,
			 avatar_url: formValues.avatar_url,
			 banner_url: formValues.banner_url,
			 password: formValues.password
			} });
		};
		
		const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setFormValues({
				...formValues,
				[e.target.name]: e.target.value
			});
		};

  const handleClear = () => {
	setFormValues(defaultValues)
 };


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
          mt: "30px",
        }}
      >
	<form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
        <CssTextField
          id="outlined-firstName"
          label="Name"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: "280px", mb: "20px" }}
			 name="firstName"
			 value={formValues.firstName}
			 onChange={handleInputChange}
        />

        <CssTextField
          id="outlined-lastName"
          label="Last Name"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: "280px", mb: "20px"}}
			 name="lastName"
			 value={formValues.lastName}
			 onChange={handleInputChange}
        />

		  	{/* <CssTextField
          id="outlined-location"
          label="Location"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: "280px", mb: "20px", }}
			 name="location"
			 value={data?.users[3].location}
			 onChange={handleInputChange}
        /> */}

		  <CssTextField
          id="outlined-email"
          label="E-Mail"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: "280px", mb: "20px" }}
			 name="email"
			 value={formValues.email}
			 onChange={handleInputChange}
        />

        <CssTextField
          id="outlined-password"
          label="Password"
          type="password"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: "280px", mb: "30px", }}
			 name="password"
			 value={formValues.password}
			 onChange={handleInputChange}
        />

        <CssTextField
          id="outlined-password"
          label="Avatar URL"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: "280px", mb: "30px", }}
			 name="avatar_url"
			 value={formValues.avatar_url}
			 onChange={handleInputChange}
        />

        <CssTextField
          id="outlined-banner"
          label="Banner URL"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: "280px", mb: "30px", }}
			 name="banner_url"
			//  value={data?.users[3].banner_url || ''}
			 value={formValues.banner_url}
			 onChange={handleInputChange}
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
