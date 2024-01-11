import React, { useEffect } from "react";
import { useState } from "react";

import "./App.css";
import Login from "./views/Login";
import Home from "./views/Home";

function App() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      setLogin(true);
    } else setLogin(false)
  }, []);

  return (
    <div className="app">
          {login ? <Home setLogin={setLogin} /> : 
                   <Login setLogin={setLogin} />}
    </div >
  );
}

export default App;