import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

function Header({
  isOpen,
  onClose,
  isNavPopupOpen,
  handleLogout,
}) {
  return (
    <header className="header">
      <Link className="logo opacity" to="/main" />
      <NavBar
        isOpen={isOpen}
        onClose={onClose}
        isNavPopupOpen={isNavPopupOpen}
        handleLogout={handleLogout}
      />
    </header>
  );
}

export default Header;
