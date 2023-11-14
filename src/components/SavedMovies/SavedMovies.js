import React from 'react'

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css'
import Preloader from '../Preloader/Preloader'

function SavedMovies({ savedMovies, onCardDelete }) {
  const [filteredMovies, setFilteredMovies] = React.useState(savedMovies);
  const [isShortMovies, setIsShortMovies] = React.useState(false);
  const [isNotFound, setIsNotFound] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

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

  function filterDuration(movies) {
    return movies.filter((movie) => movie.duration < 40);
  }

  function onSearchMovies(query) {
    setSearchQuery(query);
  }

  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
  }

  React.useEffect(() => {
    const moviesList = filterMovies(savedMovies, searchQuery);
    setFilteredMovies(isShortMovies ? filterDuration(moviesList) : moviesList);
  }, [savedMovies, isShortMovies, searchQuery]);

  React.useEffect(() => {
    if (filteredMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [filteredMovies]);

    return (
        <main className='savedMovies'>
            <SearchForm 
             onSearchMovies={onSearchMovies}
             onFilter={handleShortMovies}/>
            <MoviesCardList 
            cards={filteredMovies}
          isSavedFilms={true}
          isNotFound={isNotFound}
          savedMovies={savedMovies}
          onCardDelete={onCardDelete}/>
        </main>
    )
}

export default SavedMovies;