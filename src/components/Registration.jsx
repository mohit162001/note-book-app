import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/registration.css";
import { storeData } from "../helper";
function Registration() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      mobileNumber: formData.get("mobilenumber"),
    };
    console.log(userData);

    if (
      userData.username === "" ||
      userData.password === "" ||
      userData.mobileNumber === "" ||
      userData.email === ""
    ) {
      window.alert("Please valid input");
    } else if (userData.password.length < 6) {
      window.alert("Password should has minimum 6 character");
    } else if (
      userData.mobileNumber.length !== 10 ||
      userData.mobileNumber.length > 10
    ) {
      window.alert("Please enter valid mobile number");
    }
    try {
      const response =await fetch("http://localhost:1337/api/auth/local/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const resData = await response.json();
      storeData(resData)

      if (!response.ok) {
        throw new Error("Something went wrong................!");
      }
      if (response.ok) {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      window.alert(error);
    }
  }
  return (
    <>
      <div className="registration-container">
        <form className="registration-form" onSubmit={handleSubmit}>
          <h2>Registration</h2>
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
            <input
              className="registration-input"
              type={isVisible ? "text" : "password"}
              id="password"
              name="password"
              placeholder="password"
            />
          </div>

          <div className="show">
            <input
              type="checkbox"
              onClick={() => setIsVisible((prev) => !prev)}
            />
            <span className="show-password">show password</span>
          </div>

          <div className="form-group">
            <label>Mobile Number</label>
            <input
              className="registration-input"
              type="number"
              id="mobilenumber"
              name="mobilenumber"
              placeholder="mobile number"
            />
          </div>
          <button type="submit" className="resgistration-btn">Submit</button>
          <p className="login-message">
            Already have account ?
            <span>
              <Link to="/login">Login</Link>
            </span>
            here
          </p>
        </form>
      </div>
    </>
  );
}

export default Registration;
