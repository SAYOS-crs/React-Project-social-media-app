import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { TokenContext } from "../context/AuthContextComponent";

export default function ProtectedRoute({ children }) {
  const { isloggedin } = useContext(TokenContext);

  if (isloggedin) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
