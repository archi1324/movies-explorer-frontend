import './SavedMovies.css';
import { useState, useContext, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Navigation from '../Navigation/Navigation';
import Footer from  '../Footer/Footer'

export default function SavedMovies({ onDeleteClick, savedMoviesList}) {
  const currentUser = useContext(CurrentUserContext);

  const [shortMovies, setShortMovies] = useState(false); // состояние чекбокса
  const [NotFound, setNotFound] = useState(false); // если по запросу ничего не найдено - скроем фильмы
  const [showedMovies, setShowedMovies] = useState(savedMoviesList); // показываемывые фильмы
  const [filteredMovies, setFilteredMovies] = useState(showedMovies); // отфильтрованные по запросу фильмы


  function filterMovies(movies, userQuery, shortMoviesCheckbox) {
    const moviesByUserQuery = movies.filter((movie) => {
      const movieRu = String(movie.nameRU).toLowerCase().trim();
      const movieEn = String(movie.nameEN).toLowerCase().trim();
      const userMovie = userQuery.toLowerCase().trim();
      return movieRu.indexOf(userMovie) !== -1 || movieEn.indexOf(userMovie) !== -1;
    });

    if (shortMoviesCheckbox) {
      return filterShortMovies(moviesByUserQuery);
    } else {
      return moviesByUserQuery;
    }
  }

  // фильтрация по длительности
  function filterShortMovies(movies) {
    return movies.filter(movie => movie.duration < 40);
  }

  // поиск по запросу
  function handleSearchSubmit(inputValue) {
    const moviesList = filterMovies(savedMoviesList, inputValue, shortMovies);
    if (moviesList.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
      setFilteredMovies(moviesList);
      setShowedMovies(moviesList);
    }
  }

  // состояние чекбокса
  function handleShortFilms() {
    if (!shortMovies) {
      setShortMovies(true);
      localStorage.setItem(`${currentUser.email} - shortSavedMovies`, true);
      setShowedMovies(filterShortMovies(filteredMovies));
      filterShortMovies(filteredMovies).length === 0 ? setNotFound(true) : setNotFound(false);
    } else {
      setShortMovies(false);
      localStorage.setItem(`${currentUser.email} - shortSavedMovies`, false);
      filteredMovies.length === 0 ? setNotFound(true) : setNotFound(false);
      setShowedMovies(filteredMovies);
    }
  }

  return (
    <main className="saved-movies">
      <Navigation/>
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        handleShortFilms={handleShortFilms}
        shortMovies={shortMovies}
      />
      {!NotFound && (
        <MoviesCardList
          moviesList={showedMovies}
          savedMoviesList={savedMoviesList}
          onDeleteClick={onDeleteClick}
        />
      )}
      <Footer/>
    </main>
  );
}
