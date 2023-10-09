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

export const postMovie = (info) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
        "Authorization" : setToken(),
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(info)
})
.then(getOkOrNot);
}

export const getSavedMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
        "Authorization" : setToken(),
        'Content-Type': 'application/json'
    }
  })
  .then(getOkOrNot);
}

export const deleteMovie = (info) => {
  return fetch(`${BASE_URL}/movies/${info}`, {
      method: 'DELETE',
      headers: {
          "Authorization" : setToken(),
          'Content-Type': 'application/json'
      },
  })
  .then(getOkOrNot);
}