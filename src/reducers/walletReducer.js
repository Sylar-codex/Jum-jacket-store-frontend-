import { MAKE_DEPOSIT, PAYMENT_SUCCESS } from "../actions/types";

function walletReducer(state, action) {
  switch (action.type) {
    case MAKE_DEPOSIT:
      return {
        ...state,
        deposit: action.payload,
      };
    case PAYMENT_SUCCESS:
      return {
        ...state,
        isPaid: true,
        deposit: null,
      };
    default:
      return state;
  }
}
export default walletReducer;
