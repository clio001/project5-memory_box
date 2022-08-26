import React, {useState} from "react";
import {Link as LinkRouter, useNavigate} from "react-router-dom";
import { gql, useMutation} from "@apollo/client";

import {Grid, Box, Typography, TextField, Button, Collapse, Alert, FormControl, IconButton, Fade, Modal, Backdrop} from "@mui/material";
import {PhotoCamera} from "@mui/icons-material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {styled} from "@mui/material/styles";

import {FormErrors, ErrorSeverity, ErrorMessage} from "../types";

import {UserContext} from "../context/UserContext";

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

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #666500",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  textAlign: "center",
};

// const GET_USERS = gql`
//   query GetUsers {
//     users {
//       _id
//       firstName
//       lastName
//       email
//       password
//       avatar_url
//       banner_url
//     }
//   }
// `;

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID, $firstName: String, $lastName: String, $avatarUrl: String, $bannerUrl: String) {
    updateUser(id: $id, firstName: $firstName, lastName: $lastName, avatar_url: $avatarUrl, banner_url: $bannerUrl) {
      firstName
      lastName
      avatar_url
      banner_url
    }
  }
`;

const DELETE_USER = gql`
mutation DeleteUser($id: String, $token: String) {
  deleteUser(id: $id, token: $token) {
    _id
  }
}
`;
const MyAccountEdit: React.FC = () => {
	//   const {loading, error, data} = useQuery<GetUsers>(GET_USERS);
	const [updateUser] = useMutation(UPDATE_USER);
	const [deleteUser] = useMutation(DELETE_USER);

	const redirectTo = useNavigate();
	
	const {user, setUser} = React.useContext(UserContext);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


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

     const handleDeletion = (e: any) => {
	console.log("ID: ", user?._id)
	console.log("Token: ", user?.token)
		deleteUser({
        variables: {
          id: user?._id,
			 token: user?.token
        },
      });
		redirectTo("/delete");
  }

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
    console.log("User ID: ", user?._id);
    e.preventDefault();
    const formFields = Object.keys(formValues);
    let newFormValues = {...formValues};

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
          id: user?._id,
          firstName: formValues.firstName.value,
          lastName: formValues.lastName.value,
          avatarUrl: formValues.avatar_url.value,
          bannerUrl: formValues.banner_url.value,
        },
      });
      // setUser({
      //   __typename: "User",
      //   _id: user?._id,
      //   firstName: formValues.firstName.value,
      //   lastName: formValues.lastName.value,
      //   token: user?.token,
      //   email: user?.email,
      //   role: user?.role,
      //   avatar_url: formValues.avatar_url.value,
      //   banner_url: formValues.banner_url.value,
		//   title: formValues.title.value,
      //   description: formValues.description.value,
      //   file_url: formValues.file_url.value,
      //   location: formValues.location.value,
		//   groups: user?.groups,
		//   items: user?.items
      // });
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
          background: `#f6f6f6 url(${user?.banner_url ? user?.banner_url : "./profile-bg.jpg"}) center center/cover no-repeat`,
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
            src={user?.avatar_url ? user?.avatar_url : "./profile.svg"}
            alt="profile img"
            style={{
              borderRadius: "100px",
              width: "150px",
              boxShadow: "0 0 0px 5px #b5b5b5",
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

          <Box sx={{mt: "15px", mb: "30px"}}>
            <LinkRouter onClick={handleOpen} to={""}>
              <Typography component="p" sx={{fontSize: "12px", color: "#BD5252", textDecoration: "underline"}}>
                Delete Account
              </Typography>
            </LinkRouter>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}>
              <Fade in={open}>
                <Box sx={style}>
                  <Typography id="transition-modal-title" variant="h6" component="h2">
                    Confirm account deletion
                  </Typography>
                  <Typography id="transition-modal-description" sx={{mt: 2}}>
                    The deletion will be definitive and irreversible.
                  </Typography>
                  <Button variant="contained" size="small" color="error" sx={{mt: "20px", my: "10px", padding: "0px"}} disableElevation onClick={handleDeletion}>
                    DELETE
                  </Button>
                </Box>
              </Fade>
            </Modal>
          </Box>
        </form>
      </Box>
    </Grid>
  );
};
export default MyAccountEdit;
