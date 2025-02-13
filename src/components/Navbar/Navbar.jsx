import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import img from "../../assets/images/noonlogo.svg"
import { TokenContext } from "../Context/tokenContext";
import { CartContextProvider } from "../Context/CartContext";

export default function Navbar() {

  const {token , setToken} = useContext(TokenContext);
  const {count} = useContext(CartContextProvider);

  function handleLogout(){
    setToken(null);
    window.localStorage.removeItem("token");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <NavLink to={"/"} className="navbar-brand">
            <img style={{width: "100px", height: "50px"}} src={img} alt="logo" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to={"/"} className="nav-link active" aria-current="page">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/category/electronics"} className="nav-link">
                  categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/cart"} className="nav-link">
                  Cart {count}
                </NavLink>
              </li>
              {!token ? <>
                  <li className="nav-item">
                    <NavLink to={"/register"} className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={"/login"} className="nav-link">
                      Login
                    </NavLink>
                  </li></> :  <li className="nav-item">
                <NavLink onClick={handleLogout} to={"/login"} className="nav-link">
                  Logout
                </NavLink>
              </li>}
              
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
