import React from "react";
import "./CSS/login.css";
import { Link, useNavigate } from "react-router-dom";
import { storeData } from "../helper";


function Login() {

  const navigate = useNavigate();

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
    
    if(userData.password !== "" && userData.identifier !==""){
      try {
        const response = await fetch("http://localhost:1337/api/auth/local",{
          method:"POST",
          headers:{
            "Content-Type": "application/json",
            "Authorization" : "bearer" 
  
          },
          body:JSON.stringify(userData)
        })
        const resData = await response.json()
        console.log(resData)
        

        if(!response.ok){
          throw new Error("Something went wrong...!")
        }else if(response.ok){
          console.log("Login successfully")
          storeData(resData)
          setTimeout(() => {
            navigate("/")
          }, 1000);
        }
      } catch (error) {
        window.alert(error) 
      }
    }
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
          <button type="submit" className="login-btn">Login</button>
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