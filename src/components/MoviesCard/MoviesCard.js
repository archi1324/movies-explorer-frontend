import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

export default function MoviesCard({ movie, saved, onLikeClick, onDeleteClick }) {
  const location = useLocation();

  function handleLike() {
    onLikeClick(movie);
  }

  function handleDelete() {
    onDeleteClick(movie);
  }

  function transformDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = Math.floor(duration % 60);
    return `${hours}ч ${minutes}м`;
  }

  return (
    <li className="moviesCard">
        <a target="_blank" rel="noreferrer" href={movie.trailerLink}>
          <img
            src={movie.image}
            alt={movie.nameRU}
            title={`Описание: ${movie.description}`}
            className="moviesCard__image"
          />
        </a>
        <div className="moviesCard__container">
          <h2 className="moviesCard__title">{movie.nameRU}</h2>
          {location.pathname === '/movies' && (
            <button
              type="button"
              className={`moviesCard__button moviesCard__button_type_${
                saved ? 'saved' : 'save'
              }`}
              onClick={saved ? handleDelete : handleLike}
            ></button>
          )}
          {location.pathname === '/saved-movies' && (
            <button
              type="button"
              className="moviesCard__button moviesCard__button_type_unsave"
              onClick={handleDelete}
              aria-label="Удалить фильм из сохранённых"
              title="Удалить фильм из сохранённых"
            ></button>
          )}
        </div>
        <span className="moviesCard__time">
          {transformDuration(movie.duration)}
        </span>
    </li>
  );
}
