import React from 'react';
import { getMovies } from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css'

function Movies({ savedMovies, handleLikeClick, onCardDelete }) {

  const [isLoading, setIsLoading] = React.useState(false);
  const [allMovies, setAllMovies] = React.useState([]);
  const [initialMovies, setInitialMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [isShortMovies, setIsShortMovies] = React.useState(false);
  const [isReqErr, setIsReqErr] = React.useState(false);
  const [isNotFound, setIsNotFound] = React.useState(false);
  const [searchClick, setSearchClick] = React.useState(false);

  function filterMovies(movies, query) {
    const moviesByQuery = movies.filter((movie) => {
      const movieRu = String(movie.nameRU).toLowerCase().trim();
      const movieEn = String(movie.nameEN).toLowerCase().trim();
      const userQuery = query.toLowerCase().trim();
      return (
        movieRu.indexOf(userQuery) !== -1 || movieEn.indexOf(userQuery) !== -1
      );
    });
    return moviesByQuery;
  }

  console.log(filteredMovies);

  function filterDuration(movies) {
    return movies.filter((movie) => movie.duration < 40);
  }

  function handleFilterMovies(movies, query, short) {
    const moviesList = filterMovies(movies, query, short);

    setInitialMovies(moviesList); //записываем в стейт
    setFilteredMovies(short ? filterDuration(moviesList) : moviesList);
    localStorage.setItem("movies", JSON.stringify(moviesList));
    localStorage.setItem("allMovies", JSON.stringify(movies));
  }

  function handleNoFilterMovies(movies, short) {
    const moviesList = movies;
    setInitialMovies(moviesList);
    setFilteredMovies(short ? filterDuration(moviesList) : moviesList);
    localStorage.setItem("movies", JSON.stringify(moviesList));
    localStorage.setItem("allMovies", JSON.stringify(movies));
  }

  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
    if (!isShortMovies) {
      if (filterDuration(initialMovies).length === 0) {
        setFilteredMovies(filterDuration(initialMovies));
        setIsNotFound(true);
      } else {
        setFilteredMovies(filterDuration(initialMovies));
        setIsNotFound(false);
      }
    } else {
      setFilteredMovies(initialMovies);
      setIsNotFound(initialMovies.length === 0 ? true : false);
    }
    localStorage.setItem("shortMovies", !isShortMovies);
  }

  function onSearchMovies(query) {
    localStorage.setItem("movieSearch", query);
    localStorage.setItem("shortMovies", isShortMovies);
    if (query == 0) {
      const movies = JSON.parse(localStorage.getItem("allMovies"));
      handleNoFilterMovies(movies, isShortMovies);
    }
    if (localStorage.getItem("allMovies")) {
      const movies = JSON.parse(localStorage.getItem("allMovies"));
      handleFilterMovies(movies, query, isShortMovies);
    } else {
      setIsLoading(true);
      getMovies()
        .then((data) => {
          handleFilterMovies(data, query, isShortMovies);
          setIsReqErr(false);
          setAllMovies(data);
        })
        .catch((err) => {
          setIsReqErr(true);
          console.log(`Возникла ошибка, ${err}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  React.useEffect(() => {
    if (localStorage.getItem("shortMovies") === "true") {
      setIsShortMovies(true);
    } else {
      setIsShortMovies(false);
    }
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"));
      setInitialMovies(movies);
      if (localStorage.getItem("shortMovies") === "true") {
        setFilteredMovies(filterDuration(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem("movieSearch")) {
      if (filteredMovies.length === 0) {
        setIsNotFound(true);
      } else {
        setIsNotFound(false);
      }
    } else {
      setIsNotFound(false);
    }
  }, [filteredMovies]);

   return (
        <main className='movies'>
            <SearchForm onSearchMovies={onSearchMovies}
            onFilter={handleShortMovies}
            isShortMovies={isShortMovies}
            setSearchClick={setSearchClick}/>

            <MoviesCardList cards={filteredMovies}
          savedMovies={savedMovies}
          isLoading={isLoading}
          isSavedFilms={false}
          isReqErr={isReqErr}
          isNotFound={isNotFound}
          handleLikeClick={handleLikeClick}
          onCardDelete={onCardDelete}
          searchClick={searchClick}
          setSearchClick={setSearchClick}/>
            <button className='movies__button' aria-label='Загрузить ещё' type='button'>Ещё</button>
        </main>
    );
}

export default Movies;