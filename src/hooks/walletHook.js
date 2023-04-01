import React, { useContext } from "react";
import { WalletContext } from "../context/WalletContext";
import { AuthContext } from "../context/AuthContext";
import { tokenConfig } from "../actions/authFunc";
import axios from "axios";
import { MAKE_DEPOSIT } from "../actions/types";

const useWalletState = () => {
  const { wallet, dispatchWallet } = useContext(WalletContext);
  const { auth } = useContext(AuthContext);

  const make_deposit = async (depo) => {
    await axios
      .post(
        "https://jum-jacket-store-backend-production.up.railway.app/api/deposit",
        depo,
        tokenConfig(auth)
      )
      .then((res) => {
        dispatchWallet({ type: MAKE_DEPOSIT, payload: res.data.data });
      });
  };

  return {
    wallet,
    make_deposit,
  };
};

export default useWalletState;
