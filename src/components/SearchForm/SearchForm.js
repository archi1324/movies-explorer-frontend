import React from 'react';

import './SearchForm.css'
import find from '../../images/search.svg'
import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import useFormWithValidation  from "../../hooks/useFormWithValidation";
import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function SearchForm({ handleSearchSubmit, handleShortFilms, shortMovies }) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const { values, handleChange, isValid, setIsValid } = useFormWithValidation();

  const [errorQuery, setErrorQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    isValid ? handleSearchSubmit(values.search) : setErrorQuery('Нужно ввести ключевое слово.');
  };

  useEffect(() => {
    if (location.pathname === '/movies' && localStorage.getItem(`${currentUser.email} - movieSearch`)) {
      const searchValue = localStorage.getItem(`${currentUser.email} - movieSearch`);
      values.search = searchValue;
      setIsValid(true);
    }
  }, [currentUser]);

  return (
    <div className="searchForm">
    <section className="search">
      <form className="search__container" name="search" noValidate onSubmit={handleSubmit}>
      <div class="search__container-input">
      <img className="search__find" src={find} alt='лупа'/>
        <input
          className="search__input"
          name="search"
          type="text"
          placeholder="Фильм"
          value={values.search || ''}
          onChange={handleChange}
          required
        />
        <button className="search__button" type="submit" aria-label="найти"></button>
        </div>
      </form>

      <div className='search__checkbox'>
      <label className="search__checkbox-container">
      <input
        className="search__checkbox-input"
        type="checkbox"
        onChange={handleShortFilms}
        checked={shortMovies ? true : false}
      />
      <span className="search__checkbox-slider"></span>
      </label>
      <span className="search__checkbox-text">Короткометражки</span>
    </div>
    </section>
    </div>
  )
}
