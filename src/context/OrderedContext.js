import React, { createContext, useReducer } from "react";
import orderedReducer from "../reducers/orderedReducer";

const OrderedContext = createContext();

const { Provider } = OrderedContext;

const initialState = {
  ordered: [],
};

const OrderedProvider = ({ children }) => {
  const [ordered, dispatchOrdered] = useReducer(orderedReducer, initialState);
  return <Provider value={{ ordered, dispatchOrdered }}>{children}</Provider>;
};

export { OrderedContext, OrderedProvider };
