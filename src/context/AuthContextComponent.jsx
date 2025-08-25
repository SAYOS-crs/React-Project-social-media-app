import React, { createContext, useEffect, useState } from "react";
import GetUserData from "../services/GetUserData";

export const TokenContext = createContext();

export default function AuthContextComponentProvider({ children }) {
  const [isloggedin, setIsloggedin] = useState(
    Boolean(localStorage.getItem("token"))
  );
  const [userData, setuserData] = useState("");

  async function CallUserData() {
    const userData = await GetUserData();
    setuserData(userData);
  }

  useEffect(() => {
    if (isloggedin) {
      CallUserData();
    } else {
      setuserData("");
    }
  }, [isloggedin]);

  return (
    <TokenContext.Provider
      value={{ isloggedin, setIsloggedin, userData, setuserData }}
    >
      {children}
    </TokenContext.Provider>
  );
}
