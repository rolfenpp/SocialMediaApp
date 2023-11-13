import React from "react";
import { useState } from "react";

const CreateUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      password: password,
    };
    try {
      const response = await fetch("https://localhost:7000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        console.log("Account created");
      } else {
        console.error("Failed to create account");
      }
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  };
  return (
    <div className="createAcc-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={handleFirstName}
        />
        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={handleLastName}
        />
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={handleUserName}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePassword}
        />
        <button className="createAcc-btn">Sign Up</button>
      </form>
    </div>
  );
};

export default CreateUser;
