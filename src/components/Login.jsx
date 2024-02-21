import React from "react";
import "./CSS/login.css";
import { Link, useNavigate } from "react-router-dom";
import { storeData } from "../helper";
import { useMutation } from "@apollo/client";
import { USER_LOGIN } from "../query/query";


function Login() {

  const navigate = useNavigate();

  const [mutationFun,{data,loading,error}] = useMutation(USER_LOGIN,{
    onCompleted(data){
      console.log("inside onComleted")
      console.log(data)
      storeData(data.login)
      navigate("/")
    },
    onError(error){
      window.alert("somethng wrong....!")
      console.log(error)
    }
  })

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData.get('username'))

      const identifier =  formData.get("username")
      const password =  formData.get("password")

    if (identifier === "" || password === "") {
      window.alert('Please enter valid input')
    }else{
      console.log('inside success')
      mutationFun({variables:{
        identifier,
        password
      }})
        


      // try {
      //   const response = await fetch("http://localhost:1337/api/auth/local",{
      //     method:"POST",
      //     headers:{
      //       "Content-Type": "application/json",
      //       "Authorization" : "bearer" 
  
      //     },
      //     body:JSON.stringify(userData)
      //   })
      //   const resData = await response.json()
      //   console.log(resData)
        

      //   if(!response.ok){
      //     throw new Error("Something went wrong...!")
      //   }else if(response.ok){
      //     console.log("Login successfully")
      //     storeData(resData)
      //     setTimeout(() => {
      //       navigate("/")
      //     }, 1000);
      //   }
      // } catch (error) {
      //   window.alert(error) 
      // }
    }
  }
  return (
    <>
      <div className="login-container">
        <div>
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="login-form-group">
            <label className="login-lable" htmlFor="username">Username</label>
            <input
            className="login-input "
              type="text"
              id="username"
              name="username"
              placeholder="name or email"
            />
          </div>
          <div className="login-form-group">
            <label className="login-lable" htmlFor="password">Password</label>
            <input
            className="login-input "
              type="password"
              id="password"
              name="password"
              placeholder="password"
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
          
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