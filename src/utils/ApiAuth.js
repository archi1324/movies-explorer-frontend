export const BASE_URL = 'http://api.movies.sayahov.nomoredomainsrocks.ru';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Статус ошибки: ${res.status}`)
}

export const register = (email, password, name) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password, name }),
  })
  .then(checkResponse)
}

export const authorise = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
  })
  .then(checkResponse)
  
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    }
  })
  .then(checkResponse)
}
