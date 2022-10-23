import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { GET_PRODUCTS } from "../actions/types";
import axios from "axios";

const useProductState = () => {
  const { products, dispatchProducts } = useContext(ProductContext);

  const getProducts = async () => {
    await axios.get("http://localhost:8000/api/products/").then((res) => {
      dispatchProducts({ type: GET_PRODUCTS, payload: res.data });
    });
  };
  return {
    products,
    getProducts,
  };
};
export default useProductState;
