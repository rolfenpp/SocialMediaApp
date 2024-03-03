import { useDispatch } from "react-redux";
import styled from "styled-components";
import { login, logout } from '../../authSlice'

import { FiHome } from "react-icons/fi";
import { FiBell } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const NavBar = styled.div`
    background-color: #424242;
    display: flex;
    justify-content: space-evenly;

`
const MenuBtn = styled.button `
    background-color: ${(props) => (props.primary ? "blue" : "gray")};
    color: ${(props) => (props.primary ? "white" : "black")};
    border: none;
    border-radius: 80%;
    width: 80px;
    height: 80px;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
`

const Nav = () => { 
    const dispatch = useDispatch()
    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch(logout())
  };

    return (
    <NavBar>
        <MenuBtn onClick={handleLogout}><RiLogoutBoxLine size={30}/></MenuBtn>
        <MenuBtn><IoSettingsOutline size={32}/></MenuBtn>
        <MenuBtn><FiBell size={30}/></MenuBtn>
        <Link to="/profile"><MenuBtn><FiUser size={35}/></MenuBtn></Link>
        <Link to="/"><MenuBtn><FiHome size={30}/></MenuBtn></Link>
    </NavBar>)
}

export default Nav