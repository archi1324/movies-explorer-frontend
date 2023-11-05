import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import cards from '../../utils/cards';

const Movies = () => {
    return (
        <main className='movies'>
            <SearchForm/>
            <MoviesCardList cards={cards}/>
        </main>
    );
}

export default Movies;