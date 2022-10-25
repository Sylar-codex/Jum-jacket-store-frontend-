import React, { useState, useEffect } from "react";
import useAuthState from "../../hooks/authHook";
import useCartState from "../../hooks/cartHooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faShoppingBag,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "../../css/header.css";
import logo from "../../images/cover.png";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const { auth, logout } = useAuthState();
  const { carts, getCarts } = useCartState();
  const { user, isAuthenticated } = auth;
  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getCarts();
  }, []);
  const toggleMenu = () => {
    return {
      left: toggle ? "0" : "100%",
    };
  };

  const guest = (
    <div style={toggleMenu()} className="guest">
      <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faUser} />
      <p>Welcome, guest</p>
      <Link
        onClick={() => {
          setToggle(false);
        }}
        to="/login"
        className="guest-login"
      >
        Login
      </Link>
    </div>
  );

  const authUser = (
    <div>
      <div style={toggleMenu()} className="auth-user">
        <div className="profile-icon">
          <div className="user-welcome">
            <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faUser} />
            <p>{user ? `Welcome, ${user.first_name}` : ""}</p>
          </div>
          <ul>
            <li
              onClick={() => {
                navigate("/carts");
                setToggle(false);
              }}
            >
              carts
            </li>
            <li
              onClick={() => {
                navigate("/orders");
                setToggle(false);
              }}
            >
              orders
            </li>
          </ul>
        </div>
        <button
          onClick={() => {
            logout();
            setToggle(false);
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
  return (
    <div className="header-div-main">
      <div className="header-div">
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/");
            setToggle(false);
          }}
          className="logo"
        >
          <img src={logo} />
        </div>
        <div className="auth-guest">
          <div>{isAuthenticated ? authUser : guest}</div>
          <div className="cart-order">
            <FontAwesomeIcon
              onClick={() => {
                navigate("/carts");
              }}
              icon={faShoppingBag}
            />
            <p
              onClick={() => {
                navigate("/carts");
              }}
            >
              {carts.carts.length}
            </p>
          </div>
        </div>
        <div
          onClick={() => {
            setToggle((prev) => (prev = !prev));
          }}
          className="menu-bar"
        >
          {toggle ? (
            <FontAwesomeIcon icon={faTimes} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
