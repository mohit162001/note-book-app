import React, { useState } from "react";
import "./CSS/login.css";
import { Link, useNavigate } from "react-router-dom";
import { storeData } from "../helper";
import { useMutation } from "@apollo/client";
import { USER_LOGIN } from "../query/query";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


function Login() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");

  const navigate = useNavigate();
  const [mutationFun, { error }] = useMutation(USER_LOGIN, {
    onCompleted(data) {
      handleSnackbarOpen('success', 'Login Succesfull');
      console.log(data);
      storeData(data.login);
      setTimeout(()=>{
        navigate("/");
      },1000)
    },
    onError(error) {
      handleSnackbarOpen('error', 'Something went wrong');
      console.log(error);
    },
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData.get("username"));

    const identifier = formData.get("username");
    const password = formData.get("password");

    if (identifier === "" || password === "") {
      handleSnackbarOpen('error', 'Please enter valid input');
    }else if(error){
      if(error.message === "Invalid identifier or password"){
        handleSnackbarOpen('warning', "Enter identifier or password");
      }else{
        handleSnackbarOpen('error', 'Something went wrong');
      }
    } 
    else {
      mutationFun({
        variables: {
          identifier,
          password,
        },
      });
    }
  }

  const handleSnackbarOpen = (severity, message) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
    <Snackbar open={open} autoHideDuration={2000} onClose={handleSnackbarClose} anchorOrigin={{vertical:"top",horizontal:"center"}}>
        <MuiAlert elevation={6}  onClose={handleSnackbarClose} severity={severity} sx={{fontSize: "1.4rem",width:"100%",}}>
         {message}
       </MuiAlert>
    </Snackbar>

      <div className="login-container">
        <div>
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="login-form-group">
              <label className="login-lable" htmlFor="username">
                Username
              </label>
              <input
                className="login-input "
                type="text"
                id="username"
                name="username"
                placeholder="name or email"
              />
            </div>
            <div className="login-form-group">
              <label className="login-lable" htmlFor="password">
                Password
              </label>
              <input
                className="login-input "
                type="password"
                id="password"
                name="password"
                placeholder="password"
              />
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          <p className="registration-message">
            New user ?
            <span>
              <Link to="/register">Register</Link>
            </span>
            here
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
