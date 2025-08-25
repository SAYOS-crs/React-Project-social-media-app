import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="container mx-auto  text-center">
      <Outlet />
    </div>
  );
}
