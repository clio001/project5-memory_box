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
//       title
//       description
//       email
//       password
//       file_url
//       location
//     }
//   }
// `;

// const ADD_ITEM = gql`
// mutation AddItem($title: String, $description: String, $userId: String, $fileUrl: String) {
//   addItem(title: $title, description: $description, user_id: $userId, file_url: $fileUrl) {
//     title
//     description
//     user_id
//     file_url
//   }
// }
// `;
const ADD_ITEM = gql`
mutation AddItem($title: String, $description: String, $createdBy: String, $userId: String, $type: String, $fileUrl: String) {
  addItem(title: $title, description: $description, createdBy: $createdBy, user_id: $userId, type: $type, file_url: $fileUrl) {
    id
    title
    description
    file_url
    groups
    user_id
  }
}
`;


const GroupAddItem: React.FC = () => {
	//   const {loading, error, data} = useQuery<GetUsers>(GET_USERS);
	const [addGroupItem] = useMutation(ADD_ITEM);

	const redirectTo = useNavigate();
	
	const {user, setUser} = React.useContext(UserContext);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [formValues, setFormValues] = useState<FormErrors>({
    title: {
      value: "",
      error: false,
      errorMessage: "You must enter a Title",
    },
    description: {
      value: "",
      error: false,
      errorMessage: "You must enter a Description",
    },
    file_url: {
      value: "",
      error: false,
      errorMessage: "You must enter a file_url",
    },
    location: {
      value: "",
      error: false,
      errorMessage: "You must enter a location",
    },
  });

  const [alert, setAlert] = useState<boolean>(false);
  const [alertSeverity, setAlertSeverity] = useState<ErrorSeverity>();
  const [alertMessage, setAlertMessage] = useState<ErrorMessage>();

  function closeAlerts() {
    setAlert(false);
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

const  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("User ID: ", user?.groups[0].id,);
    e.preventDefault();
      addGroupItem({
        variables: {
          id: user?._id,
          title: formValues.title.value,
          description: formValues.description.value,
          fileUrl: formValues.file_url.value,
			 groups: user?.groups[0].id,
			 user_id: user?._id,
			//  location: user?.groups[0].location,
			//  firstName: user?.firstName,
			//  lastName: user?.lastName,
			//  avatar_url: user?.avatar_url,
         //  location: formValues.location.value,
        },
      });
      setUser({
        __typename: "User",
        _id: user?._id,
		  firstName: user?.firstName,
		  lastName: user?.lastName,
        token: user?.token, 
        email: user?.email,
        role: user?.role,
		  avatar_url: user?.avatar_url,
		  banner_url: user?.banner_url,
        title: formValues.title.value,
        description: formValues.description.value,
        file_url: formValues.file_url.value,
        location: formValues.location.value,
		  groups: user?.groups,
		  items: user?.items


      });
      setAlert(true);
      setAlertSeverity("success");
      setAlertMessage("Changes have been saved successfully.");
      setTimeout(closeAlerts, 3000);
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
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "200px",
          mb: "70px",
          backgroundColor: "#f6f6f6",
          borderRadius: "0 0 70px 70px",
          background: `#f6f6f6 url(${user && user?.groups[0].banner_url ? user?.groups[0].banner_url : "./profile-bg.jpg"}) center center/cover no-repeat`,
        }}>
        <LinkRouter to="/group">
          <Box sx={{position: "absolute", display: "flex", alignItems: "center", top: "20px", left: "15px", color: "#fff"}}>
            <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", background: "#fff", borderRadius: "100px", mr: "8px", boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.13)"}}>
              <ArrowBackIosNewIcon sx={{color: "#AEAEAE"}} />
            </Box>
            <Box sx={{fontSize: "12px", textShadow: "0px 0px 8px #484848"}}>Go back</Box>
          </Box>
        </LinkRouter>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: "90px",
            width: "150px",
            margin: "0 auto",
          }}>
          <img
            src={user && user?.groups[0].avatar_url ? user?.groups[0].avatar_url : "./profile.svg"}
            alt="profile img"
            style={{
              borderRadius: "10px",
              width: "150px",
				  height: "150px",
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
            pt: "22px",
            pb: "15px",
            textAlign: "center",
          }}>
          Add Group Item
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
          <CssTextField id="outlined-title" label="Title" type="text" InputLabelProps={{shrink: true}} sx={{width: "280px", mb: "20px"}} name="title" value={formValues.title.value} onChange={handleChange} error={formValues.title.error} helperText={formValues.title.error && formValues.title.errorMessage} />

          <CssTextField id="outlined-description" label="Description" type="text" InputLabelProps={{shrink: true}} sx={{width: "280px", mb: "20px"}} name="description" value={formValues.description.value} onChange={handleChange} error={formValues.description.error} helperText={formValues.description.error && formValues.description.errorMessage} />

          <CssTextField id="outlined-password" label="File URL" type="text" InputLabelProps={{shrink: true}} sx={{width: "280px", mb: "30px"}} name="file_url" value={formValues.file_url.value} onChange={handleChange} error={formValues.file_url.error} helperText={formValues.file_url.error && formValues.file_url.errorMessage} />

          {/* <CssTextField id="outlined-banner" label="Location" type="text" InputLabelProps={{shrink: true}} sx={{width: "280px", mb: "30px"}} name="location" value={formValues.location.value} onChange={handleChange} error={formValues.location.error} helperText={formValues.location.error && formValues.location.errorMessage} /> */}

          <Button variant="contained" size="large" disableElevation className="buttons" type="submit">
            Save Item
          </Button>
          <Collapse in={alert} sx={{mt: "20px", borderRadius: "100px"}}>
            <Alert severity={alertSeverity}>{alertMessage}</Alert>
          </Collapse>
        </form>
      </Box>
    </Grid>
  );
};
export default GroupAddItem;
