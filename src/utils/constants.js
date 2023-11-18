const BASE_URL = 'https://api.movies.sayahov.nomoredomainsrocks.ru';
const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';
const SHORTMOVIES_DURATION = 40;
const SCREEN_PARAMS= {
  desktop: {
    width: 1024,
    cards: {
      total: 12,
      more: 4,
    },
  },
  tablet: {
    width: 768,
    cards: {
      total: 8,
      more: 2,
    },
  },
  mobile: {
    width: 400,
    cards: {
      total: 8,
      more: 2,
    },
  },
};

export { BASE_URL, MOVIES_URL, SHORTMOVIES_DURATION, SCREEN_PARAMS };