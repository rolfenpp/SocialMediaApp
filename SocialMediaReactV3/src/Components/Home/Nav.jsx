import { useDispatch } from "react-redux";
import styled from "styled-components";
import { login, logout } from '../../authSlice'

import { FiHome } from "react-icons/fi";
import { FiBell } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";

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
      opacity: 0.8; /* Change opacity on hover */
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
        <MenuBtn><FiHome size={30}/></MenuBtn>
    </NavBar>)
}

export default Nav