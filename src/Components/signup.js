import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  FormControlLabel,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import styles from "../App.css";
import axios from "axios";

// const axios = require('axios').default;

const Signup = () => {
  // adding event listener for responsiveness
  const [width, setWindowWidth] = useState(0);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const response = { responsive: width < 1100 };
  const resp = response.responsive;
  const response2 = { responsive: width < 760 };
  const resp2 = response2.responsive;
  //

  const paperStyle = {
    padding: "20",
    height: "70vh",
    width: resp ? "20rem" : "25rem",
    margin: " 1rem ",
    justifyContent : resp2 ? "center" : "normal"
  };
  const avatarStyle = {
    backgroundImage: "linear-gradient(227deg, #40c057 5%, #4dabf7 95%)",
    display: "flex",
  };
  const textFieldStyle = { margin: "10px" };
  // const checkboxStyle = { position: "relative", right: "28%" };
  const btnStyle = {
    margin: "5px  ",
    backgroundImage: "linear-gradient(227deg, #40c057 5%, #4dabf7 95%)",
  };
  const numberStyle = { position: "relative", left: "2.5%" };
  const radioStyle = { position: "relative", right: "5%", margin: "4px" };
  const genderStyle = { position: "relative", left: "-45%", margin: "2px" };
  // const errorStyle = {position:'relative', left:'-27%', margin:'-1px', color:'red'};
  const errorStyle = {
    display: "flex",
    align: "left",
    margin: "-1px",
    color: "red",
  };

  const initialValues = {
    username: "",
    lastname: "",
    email: "",
    password: "",
    number: "",
    confirm_password: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    // console.log(e.target);
    // console.log(e.target.value);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
    setFormErrors(validateForm(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    // console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);

  const validateForm = (formValues) => {
    const errors = {};
    const regex_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // const regex_password = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const regex_password =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const regex_phone =
      /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (!formValues.username) {
      errors.username = "Username is required!";
    }
    if (!formValues.lastname) {
      errors.lastname = "Lastname is required!";
    }
    if (!formValues.email) {
      errors.email = "Email is required!";
    } else if (!formValues.email.match(regex_email)) {
      errors.email = "Enter a valid emailID";
    }
    if (!formValues.password) {
      errors.password = "Password is required!";
    } else if (!formValues.password.match(regex_password)) {
      errors.password =
        "Password must contain min 8 characters, 1 uppercase, 1 lowercase & 1 number";
    }
    if (!(formValues.password === formValues.confirm_password)) {
      errors.confirm_password = "Password not confirmed!";
    }
    if (!formValues.number) {
      errors.number = "Contact number is required!";
    } else if (!formValues.number.match(regex_phone)) {
      errors.number = "Enter a valid contact number";
    }
    // console.log(errors);
    return errors;
  };

  const postData = async () => {
    try {
      axios
        .post("https://therecipepool.pythonanywhere.com/account/signup/", {
          email: formValues.email,
          password: formValues.password,
          firstname: formValues.username,
          lastname: formValues.lastname,
        })
        .then((response) => console.log("posting data ... ", response))
        .catch((err) => console.log("error in try block is : ", err));
    } catch (err) {
      console.log("error is", err);
    }
  };

  return (
    <Grid align="center">
      <img
        src="https://media.gettyimages.com/id/182245919/photo/stack-of-pork-ribs.jpg?s=612x612&w=0&k=20&c=Y6PGzgUTnwZd2Xc4TszfJZUdzpJHszztaAddLTwc_2s="
        alt="dish-img"
        style={{
          width: resp ? "55%" : "60%",
          display: resp2 ? "none" : "inline-block",
          position: "relative",
          bottom: resp ? "6rem" : "2rem",
          right: resp ? "6rem" : "0",
        }}
      />
      <form style={{ display: resp2 ? "flex" : "inline-block" }}>
        <Grid style={paperStyle}>
          <Avatar style={avatarStyle}>
            <AddCircleOutlinedIcon />
          </Avatar>
          <h2>Sign Up</h2>

          <TextField
            id="outlined-basic"
            label="Name"
            name="username"
            placeholder="Enter Name"
            variant="outlined"
            fullWidth
            required
            style={textFieldStyle}
            onChange={handleChange}
            value={formValues.username}
          />
          <p style={errorStyle}>{formErrors.username}</p>

          <TextField
            id="outlined-basic"
            label="Last name"
            name="lastname"
            placeholder="Enter Last name"
            variant="outlined"
            fullWidth
            required
            style={textFieldStyle}
            onChange={handleChange}
            value={formValues.lastname}
          />
          <p style={errorStyle}>{formErrors.lastname}</p>

          <TextField
            id="outlined-basic signupmail"
            label="Email"
            name="email"
            placeholder="Enter Email"
            variant="outlined"
            type="email"
            fullWidth
            required
            style={textFieldStyle}
            value={formValues.email}
            onChange={handleChange}
          />
          <p style={errorStyle}>{formErrors.email}</p>

          <FormControl>
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              style={genderStyle}
            >
              Gender
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              style={radioStyle}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>

          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            fullWidth
            required
            name="number"
            style={numberStyle}
            InputLabelProps={{
              shrink: true,
            }}
            value={formValues.number}
            onChange={handleChange}
          />
          <p style={errorStyle}>{formErrors.number}</p>

          <TextField
            id="outlined-basic"
            label="Password"
            name="password"
            placeholder="Enter password"
            type="password"
            variant="outlined"
            fullWidth
            required
            style={textFieldStyle}
            value={formValues.password}
            onChange={handleChange}
          />
          <p style={errorStyle}>{formErrors.password}</p>

          <TextField
            id="outlined-basic"
            label="Confirm Password"
            placeholder="Confirm password"
            name="confirm_password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={formValues.confirm_password}
            onChange={handleChange}
            style={textFieldStyle}
          />
          <p style={errorStyle}>{formErrors.confirm_password}</p>

          <Button
            variant="contained"
            style={btnStyle}
            onClick={handleSubmit}
            fullWidth
          >
            SIGN UP
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};
export default Signup;
