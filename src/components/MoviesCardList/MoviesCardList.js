import React from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';


function MoviesCardList({ cards }) {
    return (
        <section className='movieCardList'>
            <ul className='movieCardList__container'>
                {cards.map((card) => (
                    <MoviesCard key={card.id} card={card} />
                ))}
            </ul>
            <button className='movieCardList__button' aria-label='Загрузить ещё' type='button'>Ещё</button>
        </section>
    );
};

export default MoviesCardList;