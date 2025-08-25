import {
  Navbar as Heronavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";
import { useContext, useState } from "react";
import { Links, NavLink, useNavigate } from "react-router-dom";

import { TokenContext } from "../context/AuthContextComponent";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function Navbar() {
  const { isloggedin, setIsloggedin } = useContext(TokenContext);

  const navigat = useNavigate();
  function Logout() {
    localStorage.removeItem("token");
    setIsloggedin(false);
    navigat("/login");
  }

  return (
    <Heronavbar position="sticky">
      <NavbarBrand>
        <AcmeLogo />

        <NavLink to={"/"} className="font-bold text-inherit cursor-pointer">
          ACME
        </NavLink>
      </NavbarBrand>

      <NavbarContent justify="end">
        {isloggedin ? (
          <NavbarItem>
            <Button onPress={Logout} color="danger" variant="flat">
              {" "}
              Log out{" "}
            </Button>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex bg-blue-500 py-2 px-4 text-white rounded-2xl">
              <NavLink to={"/Login"}>Login</NavLink>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex bg-gray-500  py-2 px-4 text-white rounded-2xl">
              <NavLink to={"/register"}>Log up</NavLink>
            </NavbarItem>{" "}
          </>
        )}
      </NavbarContent>
    </Heronavbar>
  );
}
