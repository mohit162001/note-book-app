import React from "react";
import "./CSS/login.css";
import { Link } from "react-router-dom";


function Login() {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData.get('username'))
    const userData = {
      identifier: formData.get("username"),
      password: formData.get("password"),
    };

    if (userData.identifier === "" || userData.password === "") {
      window.alert('Please enter valid input')
    }
    console.log(userData)
    window.alert("submitted...!")
  }
  return (
    <>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
            className="login-input "
              type="text"
              id="username"
              name="username"
              placeholder="name or email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
            className="login-input "
              type="password"
              id="password"
              name="password"
              placeholder="password"
            />
          </div>
          <button type="submit">Login</button>
          <p className="registration-message">
            New user ?
            <span>
              <Link to="/register">Register</Link>
            </span>
            here
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;