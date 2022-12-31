import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import changePg from './index';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import styles from '../App.css';

const Login = () => {
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
  const response2 = { responsive: width < 700 };
  const resp2 = response2.responsive;
  //

  const paperStyle = {
    padding: "20",
    height: "70vh",
    width : resp ? "20rem" : "25rem",
    margin: " 1rem ",
    position: "relative",
    bottom: resp ? "" : "6rem",
    top : resp ? "3rem" : "",
    right: resp ? "-1rem" : "4rem",
    justifyContent : resp2 ? "center" : "normal"
  };
  // backgroundImage: 'linear-gradient(227deg, #40c057 5%, #4dabf7 95%)'
  const avatarStyle = {
    backgroundImage: "linear-gradient(227deg, #40c057 5%, #4dabf7 95%)",
  };
  const textFieldStyle = { margin: "10px" };
  const checkboxStyle = { position: "relative", right: "28%" };
  const btnStyle = {
    margin: "5px  ",
    backgroundImage: "linear-gradient(227deg, #40c057 5%, #4dabf7 95%)",
  };
  const errorStyle = {
    display: "flex",
    align: "left",
    margin: "-1px",
    color: "red",
  };

  const initialValues = { email: "", password: "" };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
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
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validateForm = (formValues) => {
    const errors = {};
    const regex_password =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!formValues.email) {
      errors.email = "Email is required!";
    }
    if (!formValues.password) {
      errors.password = "Password is required!";
    } else if (!formValues.password.match(regex_password)) {
      errors.password =
        "Password must contain min 8 characters, 1 uppercase, 1 lowercase & 1 number";
    }
    return errors;
  };

  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const postData = async () => {
    try {
      await axios
        .post("https://therecipepool.pythonanywhere.com/account/login/", {
          email: formValues.email,
          password: formValues.password,
        })
        .then((response) => {
          // localStorage.setItem("refresh_token", response.data.refresh);
          // localStorage.setItem("access_token", response.data.access);
          setAccessToken(response.data.access);
          setRefreshToken(response.data.refresh);
          token2(response);
        })
        .catch((err) => console.log("error in postData try : ", err));
    } catch (err) {
      console.log("error is", err);
    }
  };

  const [loggedin, setLoggedin] = useState(false);
  const baseURL = "https://therecipepool.pythonanywhere.com/";

  const token2 = async (response) => {
    await axios
      .post(
        baseURL + "account/token-refresh/",
        {
          refresh: refreshToken,
        },
        {
          headers: {
            Authorization: "Bearer" + accessToken,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        setRefreshToken(response.data.refresh);
        setAccessToken(response.data.access);
        localStorage.setItem("accessToken", accessToken);
        console.log("Logged in");
        setLoggedin(true);
      })
      .catch((err) => console.log("error in token2  : ", err));

    return response;
  };

  useEffect(() => {
    if (loggedin) window.location.href = "/";
  }, [loggedin]);

  return (
    <div  style={{ height: "100vh" }}>
      {/* <Grid item> */}
      <img
        src="https://media.gettyimages.com/id/175409166/photo/lamb-and-aparagus.jpg?s=612x612&w=0&k=20&c=kv2J_iNLSW3I_4717-zTJCWW1fLj2jFd-aGYdczoUPM="
        alt="dish-img"
        style={{
          width: resp ? "50%" : "60%",
          display: resp2 ? "none" : "inline-block",
          position: "relative",
          top: "4rem",
        }}
      />
      {/* </Grid> */}

      <form style={{ display: resp2 ? "flex" : "inline-block"}}>
        <Grid item align="center" style={paperStyle}>
          <Avatar style={avatarStyle}>
            <LockIcon />
          </Avatar>
          <h2>Sign In</h2>

          <TextField
            id="outlined-basic"
            label="Email"
            placeholder="Enter Email"
            variant="outlined"
            fullWidth
            required
            style={textFieldStyle}
            name="email"
            onChange={handleChange}
            value={formValues.email}
          />
          <p style={errorStyle}>{formErrors.username}</p>
          <TextField
            id="outlined-basic"
            label="Password"
            placeholder="Enter password"
            type="password"
            variant="outlined"
            fullWidth
            required
            style={textFieldStyle}
            name="password"
            onChange={handleChange}
            value={formValues.password}
          />
          <p style={errorStyle}>{formErrors.password}</p>

          <FormControlLabel
            control={<Checkbox color="success" />}
            label="Remember me"
            style={checkboxStyle}
          />

          <Button
            variant="contained"
            style={btnStyle}
            fullWidth
            onClick={handleSubmit}
          >
            SIGN IN
          </Button>

          <Typography>
            <Link to="#" underline="hover">
              Forgot password ?
            </Link>
          </Typography>

          <Typography>
            Do you have an account ?
            <Link to="/signup" underline="hover ">
              Sign Up
            </Link>
          </Typography>
        </Grid>
      </form>
    </div>
  );
};
export default Login;
