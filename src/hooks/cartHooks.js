import { useContext, useState } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { OrderedContext } from "../context/OrderedContext";
import { AuthContext } from "../context/AuthContext";
import { tokenConfig } from "../actions/authFunc";
import { createMessage, returnError } from "../actions/messages";
import { MessageContext } from "../context/MessageContext";
import { ErrorContext } from "../context/ErrorContext";
import {
  GET_CARTS,
  ADD_CART,
  DELETE_CART,
  UPDATE_CART,
  GET_ORDERED,
} from "../actions/types";

function useCartState() {
  const [total, setTotal] = useState(0);
  const { dispatchMessage } = useContext(MessageContext);
  const { dispatchError } = useContext(ErrorContext);
  const { carts, dispatchCarts } = useContext(CartContext);
  const { ordered, dispatchOrdered } = useContext(OrderedContext);

  const { auth } = useContext(AuthContext);

  const getCarts = async () => {
    await axios
      .get("http://localhost:8000/api/carts/", tokenConfig(auth))
      .then((res) => {
        const cart = res.data.filter((data) => !data.paid);
        const ordered = res.data.filter((data) => data.paid);
        dispatchOrdered({ type: GET_ORDERED, payload: ordered });
        dispatchCarts({ type: GET_CARTS, payload: cart });
      })
      .catch((err) => console.log(err));
  };
  const addCart = async (cart) => {
    await axios
      .post("http://localhost:8000/api/carts/", cart, tokenConfig(auth))
      .then((res) => {
        dispatchCarts({ type: ADD_CART, payload: res.data });
        dispatchMessage(createMessage({ addToCart: "Added to cart" }));
      })
      .catch((err) => console.log(err));
  };
  const deleteCart = async (id) => {
    await axios
      .delete(`http://localhost:8000/api/carts/${id}/`, tokenConfig(auth))
      .then((res) => {
        dispatchCarts({ type: DELETE_CART, payload: id });
        dispatchMessage(
          createMessage({ deleteCart: "item has been deleted from  cart" })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateCart = async (id, cart) => {
    await axios
      .patch(`http://localhost:8000/api/carts/${id}/`, cart, tokenConfig(auth))
      .then((res) => {
        dispatchCarts({ type: UPDATE_CART, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getTotal = (carts) => {
    const res = carts.reduce((prev, cart) => {
      return prev + cart.price * cart.count;
    }, 0);
    setTotal(res);
  };

  const sendBillForm = async (form) => {
    await axios
      .post("http://localhost:8000/api/billingform/", form)
      .then((res) => {});
  };

  return {
    carts,
    getCarts,
    addCart,
    deleteCart,
    updateCart,
    getTotal,
    total,
    sendBillForm,
    ordered,
  };
}
export default useCartState;
