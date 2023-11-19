import './Movies.css';
import { useState, useContext, useEffect } from 'react';
import moviesApi from '../../utils/MoviesApi';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Navigation from '../Navigation/Navigation'
import Footer from  '../Footer/Footer'

export default function Movies({ setIsLoader, savedMoviesList, onLikeClick, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);

  const [shorts, setShorts] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [allMovies, setAllMovies] = useState([]);

  function filterShortMovies(movies) {
    return movies.filter(movie => movie.duration < 40);
  }

  function checkImage(movies) {
    movies.forEach(movie => {
      if (!movie.image) {
        movie.image = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1940&q=80';
        movie.thumbnail = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1940&q=80';
      } else {
        movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
        movie.image = `https://api.nomoreparties.co${movie.image.url}`
      }
    });
    return movies
  }

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

  function setFiltered(movies, userQuery, shortMoviesCheckbox) {
    const moviesList = filterMovies(movies, userQuery, shortMoviesCheckbox);
    if (moviesList.length === 0){
    setNotFound(true);
    } else {
      setNotFound(false);
    }
    setInitialMovies(moviesList);
    setFilteredMovies(
      shortMoviesCheckbox ? filterShortMovies(moviesList) : moviesList
    );
    localStorage.setItem(
      `${currentUser.email} - movies`,
      JSON.stringify(moviesList)
    );
  }

  function searchSubmit(inputValue) {
    localStorage.setItem(`${currentUser.email} - movieSearch`, inputValue);
    localStorage.setItem(`${currentUser.email} - shortMovies`, shorts);
    if (allMovies.length === 0) {
      setIsLoader(true);
      moviesApi
        .getMovies()
        .then(movies => {
          setAllMovies(movies);
          setFiltered(
            checkImage(movies),
            inputValue,
            shorts
          );
        })
        .catch(() => { setError("Ошибка соединения") })
        .finally(() => setIsLoader(false));
    } else {
      setFiltered(allMovies, inputValue, shorts);
    }
  }

  function statusCheckbox() {
    setShorts(!shorts);
    if (!shorts) {
      setFilteredMovies(filterShortMovies(initialMovies));
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem(`${currentUser.email} - shortMovies`, !shorts);
  }

  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - shortMovies`) === 'true') {
      setShorts(true);
    } else {
      setShorts(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - movies`)) {
      const movies = JSON.parse(
        localStorage.getItem(`${currentUser.email} - movies`)
      );
      setInitialMovies(movies);
      if (
        localStorage.getItem(`${currentUser.email} - shortMovies`) === 'true'
      ) {
        setFilteredMovies(filterShortMovies(movies));
      } 
      
      else {
        setFilteredMovies(movies);
      }
    }
  }, [currentUser]);

  return (
    <main className="movies">
      <Navigation/>
      <SearchForm
        handleSearchSubmit={searchSubmit}
        handleShortFilms={statusCheckbox}
        shortMovies={shorts}
      />
      {!notFound && (<MoviesCardList
          error={error}
          moviesList={filteredMovies}
          savedMoviesList={savedMoviesList}
          onLikeClick={onLikeClick}
          onDeleteClick={onDeleteClick}
        />
        )}
      <Footer/>
    </main>
  );
}
