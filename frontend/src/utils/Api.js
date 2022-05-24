class Api {
  constructor({ adress, token }) {
    this._adress = adress;
    this._token = token;
  }

  _getResponseData(response) {
    if (response.ok) {
      return response.json();
    }
    return response.json().then((data) => {
      throw data;
    });
  }

  getUserInfo(token) {
    return fetch(`${this._adress}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }

  getCards(token) {
    return fetch(`${this._adress}/cards`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }

  editInfo(name, description, token) {
    return fetch(`${this._adress}/users/me`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    if (isLiked) {
      return fetch(`${this._adress}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then(this._getResponseData);
    } else {
      return fetch(`${this._adress}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then(this._getResponseData);
    }
  }

  changeAvatar(link, token) {
    return fetch(`${this._adress}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._getResponseData);
  }
}

const api = new Api({
  adress: "https://api.mine-mesto.nomoredomains.xyz",
});

export default api;
