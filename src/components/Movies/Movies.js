import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import cards from '../../utils/cards';
import './Movies.css'

const Movies = () => {
    return (
        <main className='movies'>
            <SearchForm/>
            <MoviesCardList cards={cards}/>
            <button className='movies__button' aria-label='Загрузить ещё' type='button'>Ещё</button>
        </main>
    );
}

export default Movies;