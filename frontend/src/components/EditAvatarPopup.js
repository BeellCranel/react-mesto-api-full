import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="avatar"
      title="Обновить аватар"
      subBtnText="Сохранить"
    >
      <fieldset className="form__fieldset form__fieldset_avatar">
        <label className="form__field">
          <input
            ref={avatarRef}
            className="form__input form__input_type_avatar-url"
            id="avatar-url"
            type="url"
            name="link"
            placeholder="Ссылка на аватар"
            required
          />
          <span className="form__error" id="avatar-url-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
