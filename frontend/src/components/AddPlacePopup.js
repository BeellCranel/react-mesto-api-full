import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [place, setPlace] = useState("");
  const [url, setUrl] = useState("");

  function handleChangePlace(e) {
    setPlace(e.target.value);
  }

  function handleChangeUrl(e) {
    setUrl(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace(place, url);
  }

  useEffect(() => {
    setPlace("");
    setUrl("");
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="add"
      title="Новое место"
      subBtnText="Создать"
    >
      <fieldset className="form__fieldset">
        <label className="form__field">
          <input
            className="form__input form__input_type_place-name"
            onChange={handleChangePlace}
            value={place}
            id="place-name"
            type="text"
            name="name"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="form__error" id="place-name-error"></span>
        </label>
        <label className="form__field">
          <input
            className="form__input form__input_type_image-url"
            onChange={handleChangeUrl}
            value={url}
            id="image-url"
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="form__error" id="image-url-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
