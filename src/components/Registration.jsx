import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/registration.css";
import { storeData } from "../helper";
import { useMutation } from "@apollo/client";
import { USER_REGISTRATION } from "../query/query";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
function Registration() {
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [mutationFun, { error }] = useMutation(
    USER_REGISTRATION,
    {
      onCompleted(data) {
        handleSnackbarOpen("success", "Registration Successfull");
        storeData(data.register);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      },
      onError(error){
        if (error.message === "Email or Username are already taken") {
          handleSnackbarOpen("error", "Email or Username are already taken");
        } else {
          handleSnackbarOpen("error", "Something went wrong..");
        }
      }
    }
  );
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    if (username === "" || password === "" || email === "") {
      handleSnackbarOpen("warning", "Please enter valid input");
    } else if (password.length < 6) {
      handleSnackbarOpen("warning", "Password should have 6 characters");
    } else if (!email.includes(".com")) {
      handleSnackbarOpen("warning", "Enter valid Email Address");
    } else{
      mutationFun({
        variables: {
          username,
          email,
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
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          onClose={handleSnackbarClose}
          severity={severity}
          sx={{ fontSize: "1.4rem", width: "100%" }}
        >
          {message}
        </MuiAlert>
      </Snackbar>
      <div className="registration-container">
        <div>
          <form className="registration-form" onSubmit={handleSubmit}>
            <h2 className="registration-h2">Registration</h2>
            <div className="form-group">
              <label>Username</label>
              <input
                className="registration-input"
                type="text"
                id="username"
                name="username"
                placeholder="name "
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                className="registration-input"
                type="email"
                id="email"
                name="email"
                placeholder="email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-feild">
              <input
                className="registration-input"
                type={isVisible ? "text" : "password"}
                id="password"
                name="password"
                placeholder="password"
              />
              <span onClick={() => setIsVisible((prev) => !prev)} className="password-eye"><i className="far fa-eye"></i></span>
              </div>
            </div>

            {/* <div className="show">
              <input
                type="checkbox"
                onClick={() => setIsVisible((prev) => !prev)}
              />
              
              <span className="show-password">show password</span>
            </div> */}
            <button type="submit" className="resgistration-btn">
              Submit
            </button>
          </form>
          <p className="login-message">
            Already have account ?
            <span>
              <Link to="/login">Login</Link>
            </span>
            here
          </p>
        </div>
      </div>
    </>
  );
}

export default Registration;
