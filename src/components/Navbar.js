import React, { useContext } from "react";
import "../styles/navbar.css";
import Logo from "../styles/accesa_white.jpg";
import { useLocation } from "react-router-dom";
import { SearchContext } from "./searchContext";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const [searchValue, setSearchValue] = useContext(SearchContext);
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    console.log(e.target.value);
  };

  const location = useLocation();
  let search = null;
  if (location.pathname === "/")
    search = (
      <div className="right">
        <input type="text" onChange={handleChange} placeholder="Search" />
      </div>
    );
  let navbar = (
    <div className="navbar">
      <div className="left">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
        <NavLink exact to="/" className="links" activeClassName="active">
          Users
        </NavLink>
        <NavLink to="/departments" className="links" activeClassName="active">
          Departments
        </NavLink>
      </div>
      {search}
    </div>
  );
  return <div>{navbar}</div>;
};

export default Navbar;
