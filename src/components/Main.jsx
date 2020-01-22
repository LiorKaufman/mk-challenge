import React, { useState } from "react";

// Mui
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

// Icons
import ContactMailIcon from "@material-ui/icons/ContactMail";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Lior Kaufman
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const defaultValues = {
  name: "",
  email: "",
  message: ""
};

const defaultErrors = {
  nameError: "",
  emailError: "",
  messageError: ""
};

export default function Main() {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState(defaultErrors);
  const classes = useStyles();

  document.title = "MK Challenge";

  const handleChange = e => {
    const name = e.target.name;
    const errorName = `${name}Error`;
    setValues({ ...values, [name]: e.target.value });
    setErrors({ ...errors, [errorName]: "" });
  };

  const handleErrors = () => {
    for (let key in values) {
      const errorName = `${key}Error`;
      if (values[key].trim() === "") {
        setErrors({ ...errors, [errorName]: "Cannot be left blank" });
        return false;
      }
    }
    return true;
  };

  const resetForm = () => {
    setValues(defaultValues);
    setErrors(defaultErrors);
  };

  const handleSend = event => {
    event.preventDefault();
    handleErrors();
    if (handleErrors()) {
      console.log("will call the api here");
      resetForm();
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ContactMailIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Contact me
        </Typography>
        <TextField
          error={Boolean(errors.nameError)}
          helperText={Boolean(errors.nameError) ? errors.nameError : ""}
          variant="outlined"
          margin="normal"
          fullWidth
          name="name"
          label="Name"
          type="text"
          placeholder="name"
          id="name"
          onChange={handleChange}
          value={values.name}
        />
        <TextField
          error={Boolean(errors.emailError)}
          helperText={Boolean(errors.emailError) ? errors.emailError : ""}
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          placeholder="email address"
          autoComplete="email"
          autoFocus
          onChange={handleChange}
          value={values.email}
        />
        <TextField
          error={Boolean(errors.messageError)}
          helperText={Boolean(errors.messageError) ? errors.messageError : ""}
          fullWidth
          id="outlined-multiline-static"
          label="message"
          multiline
          rows="4"
          name="message"
          placeholder="Message"
          variant="outlined"
          onChange={handleChange}
          value={values.message}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSend}
          className={classes.submit}
        >
          Send
        </Button>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
