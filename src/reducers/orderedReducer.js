import { GET_ORDERED } from "../actions/types";

function orderedReducer(state, action) {
  switch (action.type) {
    case GET_ORDERED:
      return {
        ...state,
        ordered: action.payload,
      };
    default:
      return state;
  }
}

export default orderedReducer;
