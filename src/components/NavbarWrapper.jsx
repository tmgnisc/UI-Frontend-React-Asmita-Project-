import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const NavbarWrapper = () => {
  const location = useLocation();

  // Do not render Navbar on splash screen
  if (location.pathname === "/") {
    return null;
  }

  return <Navbar />;
};

export default NavbarWrapper;
