import { useState } from "react";
import { fetchUsername } from "../src/UserContext";
import "../component/Login.css";
import Button from "./Button";

const Login = ({ setLoggedIn, setUserCredentials, toggleCreateAccount }) => {
  const [userName, setUserName] = useState("user1");
  const [password, setPassword] = useState("password");

  const handleUsername = (e) => {
    setUserName(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:7000/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          password: password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setLoggedIn(true);
        const token = data.token;
        const userId = data.userId;
        console.log("Received userId:", userId);
        const userFetched = await fetchUsername(userId);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        try {
          if (userFetched) {
            localStorage.setItem("firstName", userFetched.firstName);

            setUserCredentials(userFetched);
          } else {
            console.error("Failed to fetch user data.");
          }
        } catch (fetchError) {
          console.error("Error fetching user data:", fetchError);
        }

        console.log("Authentication successful. Token:", token);
        console.log(
          localStorage.getItem("userId"),
          localStorage.getItem("token")
        );
      } else {
        console.error("Authentication failed.");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <h1 style={{ color: "black" }}>Sign in</h1>
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

        <Button
          customClass={"btn-hover"}
          background={
            "linear-gradient(45deg, rgb(35, 111, 138), rgb(25, 63, 17))"
          }
          color={"white"}
          label={"Continue"}
        />
      </form>
      <Button
        customClass={"becomeMember-btn"}
        label={"Become a member"}
        onClick={toggleCreateAccount}
      />
    </div>
  );
};

export default Login;
