import React, { createContext, useReducer } from "react";
import messageReducer from "../reducers/messageReducer";

const MessageContext = createContext();

const initialState = {
  message: {},
};

const { Provider } = MessageContext;

const MessageProvider = ({ children }) => {
  const [message, dispatchMessage] = useReducer(messageReducer, initialState);
  return <Provider value={{ message, dispatchMessage }}>{children}</Provider>;
};

export { MessageContext, MessageProvider };
