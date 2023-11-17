class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
}

getUserInfo() {
  return fetch(`${this._baseUrl}/users/me`, {
    mode: 'no-cors',
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  }).then(res => this._checkResponse(res));
}

  createUser(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      mode: 'no-cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then(res => this._checkResponse(res));
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      mode: 'no-cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then(res => this._checkResponse(res));
  }

  changeUserInfo(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      mode: 'no-cors',
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    }).then(res => this._checkResponse(res));
  }

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      mode: 'no-cors',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(res => this._checkResponse(res));
  }

  createMovie(data) {
    return fetch(`${this._baseUrl}/movies`, {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnail,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    }).then(res => this._checkResponse(res));
  }

  deleteMovie(data) {
    return fetch(`${this._baseUrl}/movies/${data}`, {
      mode: 'no-cors',
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(res => this._checkResponse(res));
  }
}

const api = new Api({

  baseUrl: 'https://api.movies.sayahov.nomoredomainsrocks.ru',
});

export default api;
