import { baseUrl } from "./mestoAuth";

class Api {
  constructor({ adress }) {
    this._adress = adress;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(res.status);
    }
    return res.json();
  }

  getUserInfo(token) {
    return fetch(`${this._adress}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this._getResponseData);
  }

  getCards(token) {
    return fetch(`${this._adress}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this._getResponseData);
  }

  editInfo(name, description, token) {
    return fetch(`${this._adress}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: description,
      }),
    }).then(this._getResponseData);
  }

  uploadCard(cardName, cardLink, token) {
    return fetch(`${this._adress}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    }).then(this._getResponseData);
  }

  deleteCard(cardId, token) {
    return fetch(`${this._adress}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this._getResponseData);
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    if (isLiked) {
      return fetch(`${this._adress}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then(this._getResponseData);
    } else {
      return fetch(`${this._adress}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then(this._getResponseData);
    }
  }

  changeAvatar(link, token) {
    return fetch(`${this._adress}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._getResponseData);
  }
}

const api = new Api({
  adress: baseUrl,
});

export default api;
