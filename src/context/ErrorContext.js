import React, { useReducer, createContext } from "react";
import errorReducer from "../reducers/errorReducer";

const ErrorContext = createContext();

const { Provider } = ErrorContext;

const initialState = {
  msg: {},
  status: null,
};

const ErrorProvider = ({ children }) => {
  const [error, dispatchError] = useReducer(errorReducer, initialState);
  return <Provider value={{ error, dispatchError }}>{children}</Provider>;
};

export { ErrorContext, ErrorProvider };
