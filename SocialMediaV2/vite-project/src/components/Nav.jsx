const Nav = ({setLogin}) => {

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setLogin(false);
  };
  return (
  <nav>
    <button onClick={handleLogout}>Logout</button>
  </nav>)
  
};

export default Nav;
