import { GET_ERROR } from "../actions/types";

function errorReducer(state, action) {
  switch (action.type) {
    case GET_ERROR:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
      };
    default:
      return state;
  }
}
export default errorReducer;
