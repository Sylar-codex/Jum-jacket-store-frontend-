import {
  ADD_CART,
  GET_CARTS,
  DELETE_CART,
  UPDATE_CART,
  GET_TOTAL,
} from "../actions/types";

function cartReducer(state, action) {
  switch (action.type) {
    case GET_CARTS:
      return {
        ...state,
        carts: action.payload,
      };
    case ADD_CART:
      return {
        ...state,
        carts: [...state.carts, action.payload],
      };
    case DELETE_CART:
      return {
        ...state,
        carts: state.carts.filter((cart) => cart.id !== action.payload),
      };
    case UPDATE_CART:
      return {
        ...state,
        carts: state.carts.map((cart) =>
          cart.id === action.payload.id ? { ...action.payload } : cart
        ),
      };

    default:
      return state;
  }
}
export default cartReducer;
