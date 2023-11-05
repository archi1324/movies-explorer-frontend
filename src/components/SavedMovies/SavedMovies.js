import React from 'react'

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import savecards from '../../utils/save';

function SavedMovies() {
    return (
        <main className='savedMovies'>
            <SearchForm />
            <MoviesCardList cards={savecards}/>
        </main>
    )
}

export default SavedMovies;