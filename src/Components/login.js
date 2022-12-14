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

const Login = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: "400px",
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "green" };
  const textFieldStyle = { margin: "10px" };
  const checkboxStyle = { position: "relative", right: "28%" };
  const btnStyle = { margin: "5px  " };
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

  const [accessToken , setAccessToken] = useState('');
  const [refreshToken , setRefreshToken] = useState('');

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
        .catch((err) => console.log("error in postData try : ",err));
    } catch (err) {
      console.log("error is", err);
    }
  };

  const [loggedin , setLoggedin] = useState(false);
  const baseURL = 'https://therecipepool.pythonanywhere.com/'


  const token2 = async (response) => {
    await 
    axios.post( baseURL+"account/token-refresh/" , {
      refresh: refreshToken,
    } ,
      {
        headers: {
          'Authorization' : 'Bearer' + accessToken,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    ).then((response) => {
      setRefreshToken(response.data.refresh);
      setAccessToken(response.data.access);
      localStorage.setItem("accessToken", accessToken);
      console.log("Logged in");
      setLoggedin(true);
      
    }
    ).catch((err) => console.log("error in token2  : ",err));

    return response;
    }

    useEffect(() => {
      if(loggedin) window.location.href = '/';
    },[loggedin]);

return (
    <Grid>
      <form>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
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
              color="success"
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
        </Paper>
      </form>
    </Grid>
  );
};
export default Login;
