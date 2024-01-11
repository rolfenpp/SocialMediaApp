import { useState } from "react";

const Login = ({setLogin}) => {
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
        // Login = Token + UserId
        const data = await response.json();
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        console.log("Authentication Succesful");
        setLogin(true);
        
      } else {
        console.error("Authentication failed.");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
