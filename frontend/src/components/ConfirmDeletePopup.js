import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({ card, isOpen, onClose, onConfirmSubmit }) {
  function handleDeleteSubmit(e) {
    e.preventDefault();

    onConfirmSubmit(card);
    onClose();
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleDeleteSubmit}
      name="confirm"
      title="Вы уверены?"
      subBtnText="Да"
    >
      <div className="form__margin"></div>
    </PopupWithForm>
  );
}

export default ConfirmDeletePopup;
