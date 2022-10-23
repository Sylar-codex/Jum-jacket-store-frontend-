import React, { createContext, useReducer } from "react";
import cartReducer from "../reducers/cartReducer";

const CartContext = createContext();
const { Provider } = CartContext;
const initialState = {
  carts: [],
};

const CartProvider = ({ children }) => {
  const [carts, dispatchCarts] = useReducer(cartReducer, initialState);
  return <Provider value={{ carts, dispatchCarts }}>{children}</Provider>;
};

export { CartContext, CartProvider };
