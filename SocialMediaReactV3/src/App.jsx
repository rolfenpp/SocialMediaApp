import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import styled from 'styled-components';
import './App.css';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import Profile from './Components/Home/Profile';
import Nav from './Components/Home/Nav';
import { QueryClient, QueryClientProvider, useQueryClient } from 'react-query';

/* import { useDispatch } from 'react-redux';
import { login, logout } from './authSlice';
import Nav from './Components/Home/Nav'; */

const MainWrapper = styled.div `
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: #2A2A2A;
`;
const NavWrapper = styled.div `
    width: 100%;
    bottom: 0;
    position: fixed;
    z-index: 999;
`
function App() {
  /* const [isLoggedIn, setIsLoggedIn] = useState(true); */
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MainWrapper>
          <Routes>
            <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          {isLoggedIn && (
            <NavWrapper>
              <Nav />
            </NavWrapper>
          )}
        </MainWrapper>
    </BrowserRouter>
  </QueryClientProvider>
  )
}

export default App
