import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "../component/Login";
import Feed from "../component/Feed";
import CreateUser from "../component/CreateUser";
import HikePointImg from "../src/assets/hikepairpointing.jpg";
import ForestAboveImg from "../src/assets/forestabove.jpg";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState();
  const [userCredentials, setUserCredentials] = useState(null);
  const [toggleCreate, setToggleCreate] = useState(false);

  const toggleCreateAccount = () => {
    setToggleCreate((prev) => !prev);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="app" style={{ backgroundImage: `url(${ForestAboveImg})` }}>
      {/* <div className="background-blur"></div> */}
      {loggedIn ? (
        // Transfer user credentials to feed
        <Feed userCredentials={userCredentials} setLoggedIn={setLoggedIn} />
      ) : (
        <div className="login-container">
          <div
            className="login-item"
            style={{ backgroundImage: `url(${HikePointImg})` }}
          ></div>
          <div className="login-item form">
            <Login
              setLoggedIn={setLoggedIn}
              setUserCredentials={setUserCredentials}
              toggleCreateAccount={toggleCreateAccount}
            />{" "}
            {toggleCreate ? <CreateUser /> : null}
          </div>
          {/*  */}
        </div>
      )}
    </div>
  );
}

export default App;
