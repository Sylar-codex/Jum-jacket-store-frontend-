import React, { createContext, useReducer } from "react";
import authReducer from "../reducers/authReducer";

const AuthContext = createContext();

const { Provider } = AuthContext;

const initialState = {
  token: localStorage.getItem("token"),
  isLoading: false,
  user: null,
  isAuthenticated: null,
};

const AuthProvider = ({ children }) => {
  const [auth, dispatchAuth] = useReducer(authReducer, initialState);
  return <Provider value={{ auth, dispatchAuth }}>{children}</Provider>;
};

export { AuthContext, AuthProvider };
