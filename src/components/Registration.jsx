import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/registration.css";
import { storeData } from "../helper";
import { useMutation } from "@apollo/client";
import { USER_REGISTRATION } from "../query/query";
function Registration() {
  const [isVisible, setIsVisible] = useState(false);

  const [mutationFun,{data,loading,error}] = useMutation(USER_REGISTRATION,{
    onCompleted(data){
      console.log(data)
      storeData(data.register)
      navigate('/')
    },
    onError(error){
      window.alert(error)
    }
  })
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

      const username =  formData.get("username")
      const email =  formData.get("email")
      const password =  formData.get("password")    

    if (
      username === "" ||
      password === "" ||
      email === ""
    ) {
      window.alert("Please valid input");
    } else if (password.length < 6) {
      window.alert("Password should has minimum 6 character");
    } 
    else{
      mutationFun({variables:{
        username,
        email,
        password,
      }})
    }
    // try {
    //   const response =await fetch("http://localhost:1337/api/auth/local/register", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(userData),
    //   });

    //   const resData = await response.json();
    //   storeData(resData)

    //   if (!response.ok) {
    //     throw new Error("Something went wrong................!");
    //   }
    //   if (response.ok) {
    //     setTimeout(() => {
    //       navigate("/");
    //     }, 1000);
    //   }
    // } catch (error) {
    //   window.alert(error);
    // }
  }
  return (
    <>
      <div className="registration-container">
        <div>
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
          <button type="submit" className="resgistration-btn">Submit</button>
          
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
