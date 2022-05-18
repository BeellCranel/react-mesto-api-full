import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ onCardClick, onConfirmDelete, onCardLike, card }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `grid-card__delete-button${
    isOwn ? "" : "_inactive"
  } opacity`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `grid-card__like-button${
    isLiked ? "_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleConfirmDelete() {
    onConfirmDelete(card);
  }

  function handleCardLike() {
    onCardLike(card, isLiked);
  }

  return (
    <article className="grid-card">
      <button
        className={cardDeleteButtonClassName}
        onClick={handleConfirmDelete}
        type="button"
      ></button>
      <img
        className="grid-card__image"
        onClick={handleClick}
        src={card.link}
        alt={card.name}
      />
      <div className="grid-card__caption">
        <h2 className="grid-card__title">{card.name}</h2>
        <div className="grid-card__like-section">
          <button
            className={cardLikeButtonClassName}
            onClick={handleCardLike}
            type="button"
          ></button>
          <p className="grid-card__likes-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
