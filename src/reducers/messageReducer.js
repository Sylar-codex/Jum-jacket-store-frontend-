import { CREATE_MESSAGE } from "../actions/types";

function messageReducer(state, action) {
  switch (action.type) {
    case CREATE_MESSAGE:
      return (state = action.payload);
    default:
      return state;
  }
}
export default messageReducer;
