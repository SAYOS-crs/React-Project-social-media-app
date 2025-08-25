import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { TokenContext } from "../context/AuthContextComponent";

export default function ProtectedAuth({ children }) {
  const { isloggedin } = useContext(TokenContext);

  if (isloggedin) {
    return <Navigate to={"/"} />;
  } else {
    return children;
  }
}
