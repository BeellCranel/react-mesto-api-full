import React from "react";

function NavPopup({ isOpen, onClose, handleLogout, userData }) {
  function logOut() {
    handleLogout();
    onClose();
  }

  return (
    <div className={isOpen ? `nav-popup nav-popup_opened` : `nav-popup`}>
      <div className="menu__item menu__item_email">{userData.userEmail}</div>
      <div className="menu__item menu__item_exit opacity" onClick={logOut}>
        Выйти
      </div>
    </div>
  );
}

export default NavPopup;
