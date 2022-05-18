export const BASE_URL = "https://localhost:3000";

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
      Accept: "application/json",
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
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: identifier,
    }),
  }).then(checkResponse);
}

export function logout() {
  return fetch(`${BASE_URL}/logout`, {
    method: "post",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
}

export function getContent() {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
}
