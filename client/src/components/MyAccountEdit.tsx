import React, {useState} from "react";
import {Link as LinkRouter} from "react-router-dom";
import {useQuery, gql, useMutation} from "@apollo/client";
import {Grid, Box, Typography, TextField, Button, Collapse, Alert, FormControl, IconButton} from "@mui/material";
import {PhotoCamera} from "@mui/icons-material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {styled} from "@mui/material/styles";

import {GetUsers, FormErrors, ErrorSeverity, ErrorMessage} from "../types";

const Input = styled("input")({
  display: "none",
});

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#473800",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#473800",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      color: "#79747E",
      borderColor: "#79747E",
    },
    "&:hover fieldset": {
      color: "#666500",
      borderColor: "#666500",
    },
    "&.Mui-focused fieldset": {
      color: "#473800",
      borderColor: "#473800",
    },
  },
});

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
  mutation UpdateUser($firstName: String, $lastName: String, $avatarUrl: String) {
    updateUser(id: "62dd51f4c0c6c0d1781a1dac", firstName: $firstName, lastName: $lastName, avatar_url: $avatarUrl) {
      firstName
      lastName
      avatar_url
    }
  }
`;

const MyAccountEdit: React.FC = () => {
  const {loading, error, data} = useQuery<GetUsers>(GET_USERS);
  console.log(data?.users);
  //   console.log(data?.users[3].firstName);

  const [formValues, setFormValues] = useState<FormErrors>({
    firstName: {
      value: "",
      error: false,
      errorMessage: "You must enter a Name",
    },
    lastName: {
      value: "",
      error: false,
      errorMessage: "You must enter a Last Name",
    },
    avatar_url: {
      value: "",
      error: false,
      errorMessage: "You must enter a Avatar_URL",
    },
    banner_url: {
      value: "",
      error: false,
      errorMessage: "You must enter a Banner_URL",
    },
  });

  const [alert, setAlert] = useState<boolean>(false);
  const [alertSeverity, setAlertSeverity] = useState<ErrorSeverity>();
  const [alertMessage, setAlertMessage] = useState<ErrorMessage>();

  function closeAlerts() {
    setAlert(false);
  }

  const [updateUser] = useMutation(UPDATE_USER);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // const {name, value}:{name: string; value: string}  = e.target;
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formFields = Object.keys(formValues);
    let newFormValues = {...formValues};

    console.log("Before For", newFormValues);

    for (let i = 0; i < formFields.length; i++) {
      const currentField = formFields[i];
      const currentValue = formValues[currentField].value;
      if (currentValue === "") {
        newFormValues = {
          ...newFormValues,
          [currentField]: {
            ...newFormValues[currentField],
            error: true,
          },
        };
        console.log("First IF ", newFormValues);
      } else {
        newFormValues = {
          ...newFormValues,
          [currentField]: {
            ...newFormValues[currentField],
            error: false,
          },
        };
      }
    }
    if (!newFormValues.firstName.error && !newFormValues.lastName.error && !newFormValues.avatar_url.error && !newFormValues.banner_url.error) {
      updateUser({
        variables: {
          firstName: formValues.firstName.value,
          lastName: formValues.lastName.value,
          avatarUrl: formValues.avatar_url.value,
          bannerUrl: formValues.banner_url.value,
        },
      });
      setAlert(true);
      setAlertSeverity("success");
      setAlertMessage("Changes have been saved successfully.");
      setTimeout(closeAlerts, 3000);
    }
    setFormValues(newFormValues);
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
      }}>
      {" "}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "200px",
          backgroundColor: "#f6f6f6",
          borderRadius: "0 0 70px 70px",
          background: "#f6f6f6 url(./profile-bg.jpg) center center/cover no-repeat;",
        }}>
        <LinkRouter to="/my-account">
          <Box sx={{position: "absolute", display: "flex", alignItems: "center", top: "20px", left: "15px", color: "#fff"}}>
            <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", background: "#fff", borderRadius: "100px", mr: "8px", boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.13)"}}>
              <ArrowBackIosNewIcon sx={{color: "#AEAEAE"}} />
            </Box>
            <Box sx={{fontSize: "12px", textShadow: "0px 0px 8px #484848"}}>Go back</Box>
          </Box>
        </LinkRouter>

        <Box sx={{position: "absolute", top: "20px", right: "15px", background: "#fff", borderRadius: "100px", boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.13)"}}>
          <FormControl>
            <label htmlFor="icon-button-file">
              <Input accept="image/*" id="icon-button-file" type="file" />
              <IconButton color="primary" aria-label="PROFILE" component="span">
                <PhotoCamera sx={{color: "#000"}} />
              </IconButton>
            </label>
            {/* <Button variant="contained" size="small" color="error" sx={{ my: '10px', padding: '0px' }} disableElevation >UPLOAD</Button> */}
          </FormControl>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: "90px",
            width: "150px",
            margin: "0 auto",
            position: "relative",
          }}>
          <img
            src={data?.users[3].avatar_url === null || "" ? "profile.svg" : data?.users[3].avatar_url}
            alt="profile img"
            style={{
              borderRadius: "100px",
              width: "150px",
              boxShadow: "rgb(181 181 181) 0px 0px 0px 5px",
            }}
          />
          <Box sx={{position: "absolute", top: "100px", right: "-7px", background: "#fff", borderRadius: "100px", boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.13)"}}>
            <FormControl>
              <label htmlFor="icon-button-file">
                <Input accept="image/*" id="icon-button-file" type="file" />
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera sx={{color: "#000"}} />
                </IconButton>
              </label>
              {/* <Button variant="contained" size="small" color="error" sx={{ my: '10px', padding: '0px' }} disableElevation >UPLOAD</Button> */}
            </FormControl>
          </Box>
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
          }}>
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
        }}>
        <Box component="span" m={1} sx={{width: "100%", border: "1px solid #C2C8D0"}}></Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: "10px",
            color: "#2D333A",
            fontSize: "17px",
          }}>
          +
        </Box>

        <Box component="span" m={1} sx={{width: "100%", border: "1px solid #C2C8D0"}}></Box>
      </Box>
      <Box
        className="TextField"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          mt: "30px",
        }}>
        <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <CssTextField id="outlined-firstName" label="Name" type="text" InputLabelProps={{shrink: true}} sx={{width: "280px", mb: "20px"}} name="firstName" value={formValues.firstName.value} onChange={handleChange} error={formValues.firstName.error} helperText={formValues.firstName.error && formValues.firstName.errorMessage} />

          <CssTextField id="outlined-lastName" label="Last Name" type="text" InputLabelProps={{shrink: true}} sx={{width: "280px", mb: "20px"}} name="lastName" value={formValues.lastName.value} onChange={handleChange} error={formValues.lastName.error} helperText={formValues.lastName.error && formValues.lastName.errorMessage} />

          <CssTextField id="outlined-password" label="Avatar URL" type="text" InputLabelProps={{shrink: true}} sx={{width: "280px", mb: "30px"}} name="avatar_url" value={formValues.avatar_url.value} onChange={handleChange} error={formValues.avatar_url.error} helperText={formValues.avatar_url.error && formValues.avatar_url.errorMessage} />

          <CssTextField id="outlined-banner" label="Banner URL" type="text" InputLabelProps={{shrink: true}} sx={{width: "280px", mb: "30px"}} name="banner_url" value={formValues.banner_url.value} onChange={handleChange} error={formValues.banner_url.error} helperText={formValues.banner_url.error && formValues.banner_url.errorMessage} />

          <Button variant="contained" size="large" disableElevation className="buttons" type="submit">
            Save Changes
          </Button>
          <Collapse in={alert} sx={{mt: "20px", borderRadius: "100px"}}>
            <Alert severity={alertSeverity}>{alertMessage}</Alert>
          </Collapse>
        </form>
      </Box>
    </Grid>
  );
};
export default MyAccountEdit;
