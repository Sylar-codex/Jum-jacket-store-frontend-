import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuthState from "../../hooks/authHook";

const PrivateRoutes = () => {
  const { auth } = useAuthState();
  if (auth.isLoading) {
    return <h2>Loading...</h2>;
  } else if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoutes;
