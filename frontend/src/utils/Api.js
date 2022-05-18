import { BASE_URL } from "./mestoAuth";

class Api {
  constructor({ adress, headers }) {
    this._adress = adress;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(res.status);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this._adress}/users/me`, {
      credentials: "include",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  getCards() {
    return fetch(`${this._adress}/cards`, {
      credentials: "include",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  editInfo(name, description) {
    return fetch(`${this._adress}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: description,
      }),
    }).then(this._getResponseData);
  }

  uploadCard(cardName, cardLink) {
    return fetch(`${this._adress}/cards`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    }).then(this._getResponseData);
  }

  deleteCard(cardId) {
    return fetch(`${this._adress}/cards/${cardId}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._adress}/cards/${cardId}/likes`, {
        method: "PUT",
        credentials: "include",
        headers: this._headers,
      }).then(this._getResponseData);
    } else {
      return fetch(`${this._adress}/cards/${cardId}/likes`, {
        method: "DELETE",
        credentials: "include",
        headers: this._headers,
      }).then(this._getResponseData);
    }
  }

  changeAvatar(link) {
    return fetch(`${this._adress}/users/me/avatar`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._getResponseData);
  }
}

const api = new Api({
  adress: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
