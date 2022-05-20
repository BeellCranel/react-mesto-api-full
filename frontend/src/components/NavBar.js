import React from "react";
import { Route, Link } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function NavBar({ isOpen, onClose, isNavPopupOpen, handleLogout }) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleTogglePopup() {
    if (!isNavPopupOpen) {
      isOpen();
    } else {
      onClose();
    }
  }

  const menuBtnClassName = `menu__nav-button${
    !isNavPopupOpen ? "" : "_close"
  }  opacity`;

  return (
    <nav className="menu">
      <Route path="/main">
        <>
          <div className="menu__item menu__item_email menu__item_disabled">
            {currentUser.data.email}
          </div>
          <div
            className="menu__item menu__item_exit menu__item_disabled opacity"
            onClick={handleLogout}
          >
            Выйти
          </div>
          <button
            className={menuBtnClassName}
            onClick={handleTogglePopup}
            type="button"
          />
        </>
      </Route>
      <Route path="/sign-in">
        <Link className="menu__item opacity" to="/sign-up">
          Регистрация
        </Link>
      </Route>
      <Route path="/sign-up">
        <Link className="menu__item opacity" to="/sign-in">
          Войти
        </Link>
      </Route>
    </nav>
  );
}

export default NavBar;
