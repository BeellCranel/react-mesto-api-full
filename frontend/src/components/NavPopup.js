import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function NavPopup({ isOpen, onClose, handleLogout, userData }) {
  const currentUser = useContext(CurrentUserContext);
  const userEmail = currentUser.email;

  const navClassName = `nav-popup${isOpen ? '_opened' : ''}`;

  function logOut() {
    handleLogout();
    onClose();
  }

  return (
    <div className={navClassName}>
      <div className="menu__item menu__item_email">{userEmail}</div>
      <div className="menu__item menu__item_exit opacity" onClick={logOut}>
        Выйти
      </div>
    </div>
  );
}

export default NavPopup;
