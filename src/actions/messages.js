import { CREATE_MESSAGE, GET_ERROR } from "./types";

const createMessage = (msg) => {
  return {
    type: CREATE_MESSAGE,
    payload: msg,
  };
};
const returnError = (msg, status) => {
  return {
    type: GET_ERROR,
    payload: { msg, status },
  };
};
export { createMessage, returnError };
