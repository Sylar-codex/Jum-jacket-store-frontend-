import React, { useEffect } from "react";
import useAuthState from "../../hooks/authHook";
import useCartState from "../../hooks/cartHooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import "../../css/header.css";
import logo from "../../images/cover.png";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const { auth, logout } = useAuthState();
  const { carts, getCarts } = useCartState();
  const { user, isAuthenticated } = auth;

  const navigate = useNavigate();

  useEffect(() => {
    getCarts();
  }, []);

  const guest = (
    <div className="guest">
      <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faUser} />
      <Link to="/login" className="guest-login">
        Login
      </Link>
      <div className="cart-order">
        <FontAwesomeIcon icon={faShoppingBag} />
        <p
          onClick={() => {
            navigate("/carts");
          }}
        >
          {carts.carts.length}
        </p>
      </div>
    </div>
  );

  const authUser = (
    <div>
      <div className="auth-user">
        <div className="profile-icon">
          <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faUser} />
          <ul>
            <li
              onClick={() => {
                navigate("/carts");
              }}
            >
              carts
            </li>
            <li
              onClick={() => {
                navigate("/orders");
              }}
            >
              orders
            </li>
          </ul>
        </div>
        <p>{user ? `Welcome, ${user.first_name}` : ""}</p>
        <button
          onClick={() => {
            logout();
          }}
        >
          Logout
        </button>
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
    </div>
  );
  return (
    <div className="header-div-main">
      <div className="header-div">
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
          className="logo"
        >
          <img src={logo} />
        </div>
        <div>{isAuthenticated ? authUser : guest}</div>
      </div>
    </div>
  );
}

export default Header;
