import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { tokenConfig } from "../actions/authFunc";
import { ErrorContext } from "../context/ErrorContext";
import { returnError } from "../actions/messages";
import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  USER_LOADING,
} from "../actions/types";

const useAuthState = () => {
  const { auth, dispatchAuth } = useContext(AuthContext);
  const { dispatchError } = useContext(ErrorContext);

  const loadUser = async () => {
    //user loading
    dispatchAuth({ type: USER_LOADING });
    await axios
      .get("http://localhost:8000/api/auth/user", tokenConfig(auth))
      .then((res) => {
        dispatchAuth({ type: USER_LOADED, payload: res.data });
      })
      .catch((err) => {
        dispatchAuth({ type: AUTH_ERROR });
      });
  };

  const login = async (username, password) => {
    const config = {
      headers: {
        "content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ username, password });
    await axios
      .post("http://localhost:8000/api/auth/login", body, config)
      .then((res) => {
        dispatchAuth({ type: LOGIN_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatchAuth({ type: LOGIN_FAIL });

        dispatchError(returnError(err.response.data, err.response.status));
      });
  };
  const register = async ({
    username,
    first_name,
    last_name,
    password,
    email,
  }) => {
    const config = {
      headers: {
        "content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      username,
      first_name,
      last_name,
      password,
      email,
    });
    await axios
      .post("http://localhost:8000/api/auth/register", body, config)
      .then((res) => {
        dispatchAuth({ type: REGISTER_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatchAuth({ type: REGISTER_FAIL });
        dispatchError(returnError(err.response.data, err.response.status));
      });
  };
  const logout = async () => {
    await axios
      .post("http://localhost:8000/api/auth/logout", null, tokenConfig(auth))
      .then(() => {
        dispatchAuth({ type: LOGOUT_SUCCESS });
      })
      .catch((err) => {
        dispatchError(returnError(err.response.data, err.response.status));
      });
  };
  return {
    loadUser,
    login,
    register,
    logout,
    auth,
  };
};

export default useAuthState;
