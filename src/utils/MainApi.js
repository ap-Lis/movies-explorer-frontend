import { BASE_URL } from "./constants";

function getOkOrNot(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

function setToken() {
    return `Bearer ${localStorage.getItem('jwt')}`;
}

export const register = ({email, password, name}) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({email, password, name})
  }).then(getOkOrNot);
};

export const login = ({email, password}) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({email, password})
    }).then(getOkOrNot);
};

export const checkToken = () => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : setToken(),
      }
    }).then(getOkOrNot);
};

export const getUserInfo = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization" : setToken(),
        }
      }).then(getOkOrNot);
}

export const setUserInfo = (info) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : setToken(),
        },
        body: JSON.stringify({
            name: info.name, 
            email: info.email,
        })
    })
    .then(getOkOrNot);
}