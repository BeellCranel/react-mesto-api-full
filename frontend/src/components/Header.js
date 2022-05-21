import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

function Header({
  isOpen,
  onClose,
  isNavPopupOpen,
  userData,
  handleLogout,
}) {
  return (
    <header className="header">
      <Link className="logo opacity" to="/" />
      <NavBar
        isOpen={isOpen}
        onClose={onClose}
        isNavPopupOpen={isNavPopupOpen}
        userData={userData}
        handleLogout={handleLogout}
      />
    </header>
  );
}

export default Header;
