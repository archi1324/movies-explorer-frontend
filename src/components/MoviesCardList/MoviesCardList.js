import './MoviesCardList.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import { SCREEN_PARAMS } from '../../utils/constants.js';

export default function MoviesCardList({ moviesList, savedMoviesList, onLikeClick, onDeleteClick }) {

  const [isMount, setIsMount] = useState(true);
  const [showMovieList, setShowMovieList] = useState([]);
  const [cardsWidth, setCardsWidth] = useState({});
  const { desktop, tablet, mobile } = SCREEN_PARAMS;
  const location = useLocation();


  function checkSavedMovie(arr, movie) {
    return arr.find((item) => {
      return item.movieId === (movie.id || movie.movieId);
    });
  }

  useEffect(() => {
    const width = window.innerWidth;
      if (width > desktop.width) {
        setCardsWidth(desktop.cards);
      } else if (width < desktop.width) {
        setCardsWidth(tablet.cards);
      } else {
        setCardsWidth(mobile.cards);
      }
      return () => setIsMount(false);
    }
  ,[isMount,desktop, tablet, mobile]);

  useEffect(() => {
    if (moviesList.length) {
      const res = moviesList.filter((item, i) => i < cardsWidth.total);
      setShowMovieList(res);
    }
  }, [moviesList, cardsWidth.total]);


  function handleMore() {
    const length = moviesList.length - showMovieList.length;
    if (length > 0) {
      const newCards = moviesList.slice(showMovieList.length,showMovieList.length+cardsWidth.more);
      setShowMovieList([...showMovieList, ...newCards]);
    }
  }

  return (
    <section className="movieCardList">
      <ul className="movieCardList__container">
        {showMovieList.map(movie => (
          <MoviesCard
            key={movie.id || movie._id}
            saved={checkSavedMovie(savedMoviesList, movie)}
            onLikeClick={onLikeClick}
            onDeleteClick={onDeleteClick}
            movie={movie}
          />
        ))}
      </ul>
      {location.pathname === '/movies' && showMovieList.length >= 5 && showMovieList.length < moviesList.length && (
        <button
          className="movies__button"
          onClick={handleMore}
        >
          Ещё
        </button>
      )}
    </section>
  );
}
