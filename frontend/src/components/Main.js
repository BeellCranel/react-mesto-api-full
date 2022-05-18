import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({
  cards,
  onCardsLike,
  onCardClick,
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onConfirmDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  const cardElements = cards.map((card) => {
    return (
      <Card
        onCardClick={onCardClick}
        onConfirmDelete={onConfirmDelete}
        onCardLike={onCardsLike}
        card={card}
        key={card._id}
      />
    );
  });

  return (
    <main className="content">
      <section className="profile">
        <div onClick={onEditAvatar} className="profile__image-hover">
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt="Изображение профиля"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__user-name">{currentUser.name}</h1>
          <button
            onClick={onEditProfile}
            className="profile__edit-button opacity"
            type="button"
          ></button>
          <p className="profile__user-description">{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__add-button opacity"
          type="button"
        ></button>
      </section>

      <section className="grid-cards">{cardElements}</section>
    </main>
  );
}

export default Main;
