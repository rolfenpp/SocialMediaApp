import React, { useState } from "react";
import styled from "styled-components"
import { useDispatch } from 'react-redux'; // Import useDispatch
import { login, logout } from '../../authSlice'
import axios from "axios"; // Import Axios

const LoginWrapper = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: #2a2a2a;
`

const LoginImage = styled.div `
  width: 400px;
  height: 75vh;
  background-image: url("https://socialmediaproject01.blob.core.windows.net/socialmediaimgs/HikeLogin.jpg");
  background-size: cover;
  z-index: 999;

  @media (max-width: 600px) {
    display: none;
  }
`


const LoginFormContainer = styled.form`
  position: relative;
  right: 20%;
  display: flex;
  flex-direction: column; 
  
  
  padding: 20px;
  height: 55vh;
  width: 300px;
  background-color: white;
  z-index: 999;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  
  h1 {
    margin: 20px 0px 20px 0px;
  }
  input {
    margin: 5px;
    text-align: center;

    @media (max-width: 600px) {
    border-radius: 3px;
    border: 1px solid;
    font-size: 110%;
    height: 35px;
  }
  }

  button {
    background-color: green;
    color: white;
    border: none;
    height: 25px;
    margin-top: 10px;
  
    border-radius: 3px;

    &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  @media (max-width: 600px) {
    right: 0;
    height: 35px;
  }


  }
  

  @media (max-width: 600px) {
    right: 0;
    width: 80%;
    height: 100vh;
  }
`;


const Login = () => {
    const [userName, setUserName] = useState("user01");
    const [password, setPassword] = useState("password");
    const dispatch = useDispatch();

    const handleUsername = (e) => {
        setUserName(e.target.value);
      };
    
      const handlePassword = (e) => {
        setPassword(e.target.value);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("https://localhost:7000/auth", {
            userName: userName,
            password: password,
          });
    
          if (response.status === 200) {
            // Assuming a successful login returns a status code 200
            const data = response.data;
            console.log(data);
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.userId);
            console.log("Authentication Successful");
            dispatch(login());
    
          } else {
            
            console.error("Authentication failed.");
          }
        } catch (error) {
            alert(error)
            console.error("Error during authentication:", error);
        }
      };



    return (
    <LoginWrapper>
      <LoginImage />
      <LoginFormContainer onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <input
          required
          type="text"
          placeholder="Username"
          value={userName}
          onChange={handleUsername}
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePassword}
        />
        <button>Continue</button>
      </LoginFormContainer>
    </LoginWrapper>)
}

export default Login