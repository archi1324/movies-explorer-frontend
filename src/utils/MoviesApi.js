function checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      Promise.reject(`Ошибка: ${res.status}/${res.statusText}`);
    }
  }
  
  export function getMovies() {
    return fetch("http://api.nomoreparties.co/beatfilm-movies")
    .then((res) => checkResponse(res))
  }