import React from "react";

function ImagePopup({ card, onClose }) {
  function handleOnClose(event) {
    if (event.target.classList.contains("popup_opened")) {
      onClose();
    }
  }

  const popupClassName = `popup popup_image ${card ? "popup_opened" : ""}`;

  return (
    <div className={popupClassName} onClick={handleOnClose}>
      <figure className="figure">
        <button
          className="popup__close-button opacity"
          onClick={onClose}
          type="button"
        ></button>
        <img
          className="figure__image"
          src={card ? card.link : "#"}
          alt={card ? card.name : "фотография отсутствует"}
        />
        <figcaption className="figure__figcaption">
          <p className="figure__image-caption">{card ? card.name : ""}</p>
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
