export const BASE_URL = "api.mine-mesto.nomoredomains.xyz";

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return response.json().then((data) => {
    throw data;
  });
}

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then(checkResponse);
}

export function login(identifier, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      password: password,
      email: identifier,
    }),
  }).then(checkResponse);
}

export const logout = () => {
  return fetch(`${BASE_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then(checkResponse);
};

export function getContent() {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then(checkResponse);
}
