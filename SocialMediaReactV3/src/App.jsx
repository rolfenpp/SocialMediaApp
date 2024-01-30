import React from 'react';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';

import { useDispatch } from 'react-redux';
import { login, logout } from './authSlice';
import Nav from './Components/Home/Nav';

const MainWrapper = styled.div `
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: #2A2A2A;
  
`

function App() {
  /* const [isLoggedIn, setIsLoggedIn] = useState(true); */
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
 
  return (
     
      <BrowserRouter>
        <MainWrapper>
          <Routes>
            {/* Use a ternary operator to conditionally render Login or Home */}
            {isLoggedIn ? 
              (<Route path="/" element={<Home  />} />) 
            : (<Route path="/" element={<Login />} />)}
          </Routes>
        </MainWrapper>
      </BrowserRouter>

  )
}

export default App
