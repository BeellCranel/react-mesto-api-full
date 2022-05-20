import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDiscription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDiscription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDiscriptionChange(e) {
    setDiscription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(name, description);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="edit"
      title="Редактировать профиль"
      subBtnText="Сохранить"
    >
      <fieldset className="form__fieldset">
        <label className="form__field">
          <input
            className="form__input form__input_type_user-name"
            onChange={handleNameChange}
            value={name || ""}
            id="user-name"
            type="text"
            name="name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="form__error" id="user-name-error"></span>
        </label>
        <label className="form__field">
          <input
            className="form__input form__input_type_user-description"
            onChange={handleDiscriptionChange}
            value={description || ""}
            id="user-description"
            type="text"
            name="description"
            placeholder="Профессиональная деятельность"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="form__error" id="user-description-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
