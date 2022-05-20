import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function NavPopup({ isOpen, onClose, handleLogout }) {
  const currentUser = React.useContext(CurrentUserContext);
  function logOut() {
    handleLogout();
    onClose();
  }

  return (
    <div className={isOpen ? `nav-popup nav-popup_opened` : `nav-popup`}>
      <div className="menu__item menu__item_email">
        {currentUser.data.email}
      </div>
      <div className="menu__item menu__item_exit opacity" onClick={logOut}>
        Выйти
      </div>
    </div>
  );
}

export default NavPopup;
