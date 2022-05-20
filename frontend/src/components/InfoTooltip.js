import React from "react";

function InfoTooltip({ isOpen, isSuccessMessageTog, onClose }) {
  const popupClassName = `popup ${isOpen ? "popup_opened" : ""}`;

  const iconClassName = `form__info-icon form__info-icon${
    isSuccessMessageTog ? "_success" : `_fail`
  }`;

  const subtitleClassName = isSuccessMessageTog
    ? "Вы успешно зарегистрировались!"
    : "Что-то пошло не так! Попробуйте ещё раз.";

  return (
    <div className={popupClassName}>
      <div className="popup__content">
        <div className="popup__info-tooltip">
          <button
            className="popup__close-button opacity"
            onClick={onClose}
            type="button"
          />
          <form className="form">
            <div className={iconClassName} />
            <h2 className="form__title">{subtitleClassName}</h2>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
