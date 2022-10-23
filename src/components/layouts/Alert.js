import React, { useEffect, Fragment, useContext } from "react";
import { toast } from "react-toastify";
import { ErrorContext } from "../../context/ErrorContext";
import { MessageContext } from "../../context/MessageContext";

function Alert() {
  const { message } = useContext(MessageContext);
  const { error } = useContext(ErrorContext);
  const notifyMessage = () => {
    if (message.addToCart) toast.success(message.addToCart);
    if (message.deleteCart) toast.success(message.deleteCart);
    if (message.passwordNotMatch) toast.error(message.passwordNotMatch);
  };
  const notifyError = () => {
    if (error.msg.name) {
      toast.error(`Name: ${error.msg.name.join()}`);
    }
    if (error.msg.email) {
      toast.error(`Email: ${error.msg.email.join()}`);
    }
    if (error.msg.message) {
      toast.error(`Message: ${error.msg.message.join()}`);
    }
    if (error.msg.non_field_errors) {
      toast.error(error.msg.non_field_errors.join());
    }
    if (error.msg.username) {
      toast.error(error.msg.username.join());
    }
  };

  useEffect(() => {
    notifyError();
  }, [error]);
  useEffect(() => {
    notifyMessage();
  }, [message]);
  return <Fragment />;
}

export default Alert;
