import React, { useState } from "react";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  Collapse,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useMutation, gql } from "@apollo/client";

import { UserContext } from "../context/UserContext";

import { FormErrors, ErrorSeverity, ErrorMessage } from "../types";

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

const LOGIN_USER = gql`
  mutation LoginUser($email: String, $password: String) {
    loginUser(email: $email, password: $password) {
      _id
      token
      firstName
      lastName
      email
      avatar_url
      banner_url
      items {
        id
        title
      }
    }
  }
`;

const Login: React.FC = () => {
  const { user, setUser } = React.useContext(UserContext);

  const redirectTo = useNavigate();

  const [formValues, setFormValues] = useState<FormErrors>({
    email: {
      value: "",
      error: false,
      errorMessage: "You must enter a E-Mail",
    },
    password: {
      value: "",
      error: false,
      errorMessage: "You must enter a Password",
    },
  });

  const [alert, setAlert] = useState<boolean>(false);
  const [alertSeverity, setAlertSeverity] = useState<ErrorSeverity>();
  const [alertMessage, setAlertMessage] = useState<ErrorMessage>();

  function closeAlerts() {
    setAlert(false);
  }

  const [loginUser, { error }] = useMutation(LOGIN_USER, {
    onCompleted(data) {
      const myToken = data?.loginUser.token;
      window.localStorage.setItem("TOKEN", myToken);
      // set userContxt
      setUser(data?.loginUser);
		console.log(data?.loginUser)
      redirectTo("/my-account");
    },
  });

  const validateEmail = (e: string) => {
    return e.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formFields = Object.keys(formValues);

    let newFormValues = { ...formValues };
    for (let i = 0; i < formFields.length; i++) {
      const currentField = formFields[i];
      const currentValue = formValues[currentField].value;
      if (currentValue === "" && !validateEmail(formValues.email.value)) {
        newFormValues = {
          ...newFormValues,
          [currentField]: {
            ...newFormValues[currentField],
            error: true,
          },
        };
      } else if (
        !validateEmail(formValues.email.value) &&
        formValues.password.value !== ""
      ) {
        newFormValues = {
          email: {
            value: formValues.email.value,
            error: true,
            errorMessage: "You must enter a valid E-Mail",
          },
          password: {
            value: formValues.password.value,
            error: false,
            errorMessage: "You must enter a Password",
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

    if (
      !newFormValues.email.error &&
      !newFormValues.password.error &&
      validateEmail(formValues.email.value)
    ) {
      loginUser({
        variables: {
          email: formValues.email.value,
          password: formValues.password.value,
        },
      });
      setAlert(true);
      setAlertSeverity("error");
      setAlertMessage("Changes have been saved successfully.");
      setTimeout(closeAlerts, 443000);
    }
    setFormValues(newFormValues);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const {name, value}:{name: string; value: string}  = e.target;
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value,
      },
    });
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
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
          mt: "60px",
        }}
      >
        <img src="/login.svg" alt="Login" style={{ width: "80px" }} />
        <Typography
          variant="h1"
          color="initial"
          sx={{
            display: "inline-block",
            fontSize: "24px",
            lineHeight: "35px",
            letterSpacing: "1px",
            pt: "40px",
            textAlign: "center",
          }}
        >
          Log in in to your Account
        </Typography>
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
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <CssTextField
            id="outlined-email"
            label="E-Mail"
            type="text"
            InputLabelProps={{ shrink: true }}
            sx={{
              width: "280px",
              mb: "20px",
            }}
            name="email"
            value={formValues.email.value}
            onChange={handleChange}
            error={formValues.email.error}
            helperText={formValues.email.error && formValues.email.errorMessage}
          />

          <CssTextField
            id="outlined-password"
            label="Password"
            type="password"
            InputLabelProps={{ shrink: true }}
            sx={{
              width: "280px",
              mb: "30px",
              borderRadius: "100px",
            }}
            name="password"
            value={formValues.password.value}
            onChange={handleChange}
            error={formValues.password.error}
            helperText={
              formValues.password.error && formValues.password.errorMessage
            }
          />

          <Button
            variant="contained"
            size="large"
            disableElevation
            className="buttons"
            type="submit"
          >
            Login
          </Button>

          <Collapse in={alert} sx={{ mt: "20px" }}>
            <Alert
              severity={alertSeverity}
              sx={{ borderRadius: "100px", width: "248px" }}
            >
              {error &&
                error?.graphQLErrors.map(({ message }, i) => (
                  <span key={i}>{message}</span>
                ))}
            </Alert>
          </Collapse>
        </form>
        <Typography component="p" sx={{ mt: "25px" }}>
          Don't have an account?{" "}
          <LinkRouter to="/register" style={{ textDecoration: "none" }}>
            Signup
          </LinkRouter>
        </Typography>
      </Box>

      <Box
        sx={{
          width: "300px",
          mt: "25px",
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
            fontSize: "12px",
          }}
        >
          OR
        </Box>

        <Box
          component="span"
          m={1}
          sx={{ width: "100%", border: "1px solid #C2C8D0" }}
        ></Box>
      </Box>
      <Box sx={{ mt: "30px" }}>
        <Button
          variant="outlined"
          size="large"
          disableElevation
          className="social-btn"
        >
          <img
            src="/google.svg"
            alt="Register with Google"
            className="google"
          />
          Continue with Google
        </Button>
      </Box>
      <Box sx={{ mt: "15px" }}>
        <Button
          variant="outlined"
          size="large"
          disableElevation
          className="social-btn"
        >
          <img
            src="/github.svg"
            alt="Register with GitHub"
            className="google"
          />
          Continue with GitHub
        </Button>
      </Box>
    </Grid>
  );
};
export default Login;
