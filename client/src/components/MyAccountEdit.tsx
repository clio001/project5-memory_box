import React, { useState } from "react";
// import { Link as LinkRouter } from "react-router-dom";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Grid, Box, Typography, TextField, Button, Collapse, Alert } from "@mui/material";
import { styled } from '@mui/material/styles';

import {Severity} from "../types"


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
  _id: string;
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

const UPDATE_USER = gql`
mutation UpdateUser(
	$firstName: String, 
	$lastName: String,  
	$avatarUrl: String,
	) {
	updateUser(
	id: "62dd51f4c0c6c0d1781a1dac", 
	firstName: $firstName, 
	lastName: $lastName, 
	avatar_url: $avatarUrl, 
	) {
    firstName
    lastName
    avatar_url
  }
}
`;
interface FormError {
	value: string;
	error: boolean;
	errorMessage: string
}

interface FormFieldError {
	firstName: FormError;
	lastName: FormError;
	avatar_url: FormError;
	banner_url: FormError;
}


const MyAccountEdit: React.FC = () => {

  const { loading, error, data } = useQuery<GetUsers>(GET_USERS);
//   console.log(data?.users);
//   console.log(data?.users[3].firstName);


	const defaultValues: any = {
		firstName:{
			value:'',
			error:false,
			errorMessage:'You must enter a Name'
    	}, 

		lastName:{
			value:'',
			error:false,
			errorMessage:'You must enter a Last Name'
    	},  
		avatar_url:{
			value:'',
			error:false,
			errorMessage:'You must enter a Avatar_URL'
    	}, 
		banner_url:{
			value:'',
			error:false,
			errorMessage:'You must enter a Banner_URL'
    	}, 
	};


	const [formValues, setFormValues] = useState(defaultValues);

	const [alert, setAlert] = useState<boolean>(false)
	const [alertSeverity, setAlertSeverity] = useState<Severity>()
	const [alertMessage, setAlertMessage] = useState<string>()

	function closeAlerts() {
		setAlert(false);
	}


   const [updateUser] = useMutation(UPDATE_USER);
	 
	const handleChange  = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const {name, value}:{name: any; value: string}  = e.target;
		setFormValues({
			...formValues,
			[name]:{
				...formValues[name],
				value
			}
		})
	}
	 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		 e.preventDefault();
	 const formFields = Object.keys(formValues);
    let newFormValues = {...formValues}

    for (let i = 0; i < formFields.length; i++) {
      const currentField = formFields[i];
      const currentValue = formValues[currentField].value;
      if(currentValue === ""){
        newFormValues = {
          ...newFormValues,
          [currentField]:{
            ...newFormValues[currentField],
            error:true
          }
        }
      } else {
			newFormValues = {
          ...newFormValues,
          [currentField]:{
            ...newFormValues[currentField],
            error:false
          }
        }
		}
    }
	 for (let i = 0; i < formFields.length; i++) { 
		const currentField = formFields[i];
      const currentValue = formValues[currentField].error;
		console.log(currentValue)
		if(currentValue === false) {
		 	updateUser({ variables: {
				firstName: formValues.firstName.value,
				lastName: formValues.lastName.value,
				avatarUrl: formValues.avatar_url.value,
				bannerUrl: formValues.banner_url.value,
			} });
			setAlert(true)
			setAlertSeverity("warning")
			setAlertMessage("Todo bien")
			setTimeout(closeAlerts, 3000);
		}
	 }
    setFormValues(newFormValues)
	};
		

  const handleClear = () => {
	setFormValues({defaultValues})
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
          InputLabelProps={{shrink: true,}}
          sx={{ width: "280px", mb: "20px" }}
			 name="firstName"
			 value={formValues.firstName.value}
			 onChange={handleChange }
			error={formValues.firstName.error}
         helperText={formValues.firstName.error && formValues.firstName.errorMessage}
        />

        <CssTextField
          id="outlined-lastName"
          label="Last Name"
          type="text"
          InputLabelProps={{shrink: true,}}
          sx={{ width: "280px", mb: "20px"}}
			 name="lastName"
			 value={formValues.lastName.value}
			 onChange={handleChange }
			error={formValues.lastName.error}
         helperText={formValues.lastName.error && formValues.lastName.errorMessage}
        />


        <CssTextField
          id="outlined-password"
          label="Avatar URL"
          type="text"
          InputLabelProps={{shrink: true,}}
          sx={{ width: "280px", mb: "30px", }}
			 name="avatar_url"
			 value={formValues.avatar_url.value}
			 onChange={handleChange }
			 error={formValues.avatar_url.error}
         helperText={formValues.avatar_url.error && formValues.avatar_url.errorMessage}
        />

        <CssTextField
          id="outlined-banner"
          label="Banner URL"
          type="text"
          InputLabelProps={{shrink: true,}}
          sx={{ width: "280px", mb: "30px", }}
			 name="banner_url"
			 value={formValues.banner_url.value}
			 onChange={handleChange }
			 error={formValues.banner_url.error}
         helperText={formValues.banner_url.error && formValues.banner_url.errorMessage}
        />


		  <Button variant="contained"
          size="large"
          disableElevation
          className="buttons" 
			 type="submit">
          Save Changes
        </Button>
		  <Collapse in={alert}>
				<Alert severity={alertSeverity}>
					Hola
				</Alert>
			</Collapse>
		</form>
</Box>

    </Grid>
  );
};
export default MyAccountEdit;

