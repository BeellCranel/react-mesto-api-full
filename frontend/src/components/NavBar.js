import React from "react";
import { Route, Link } from "react-router-dom";

function NavBar({
  isOpen,
  onClose,
  isNavPopupOpen,
  userData,
  handleLogout,
}) {
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
            {userData.userEmail}
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
