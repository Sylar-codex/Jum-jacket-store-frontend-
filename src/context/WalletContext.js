import React, { createContext, useReducer } from "react";
import walletReducer from "../reducers/walletReducer";

const WalletContext = createContext();

const { Provider } = WalletContext;

const initialState = {
  deposit: null,
  isPaid: false,
};

const WalletProvider = ({ children }) => {
  const [wallet, dispatchWallet] = useReducer(walletReducer, initialState);
  return <Provider value={{ wallet, dispatchWallet }}>{children}</Provider>;
};

export { WalletContext, WalletProvider };
