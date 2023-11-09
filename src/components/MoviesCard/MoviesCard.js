import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCard.css';
import deleteFilm from '../../images/deleteFilm.svg';
import saveFilm from '../../images/likeFilm.svg';
import disLiked from '../../images/disLiked.svg';

const MoviesCard = ({ card }) => {
    const location = useLocation();
    const [isSaved, setIsSaved] = useState(false);

    function handleClick() {
        setIsSaved(!isSaved);
    }

    return (
        <li className='moviesCard'>
            <img className='moviesCard__image' src={card.image} alt='картинка фильма' />

            <div className='moviesCard__container'>
                <h2 className='moviesCard__title'>{card.name}</h2>
                {location.pathname === '/saved-movies' &&
                    <button type='button' aria-label='удалить фильм' className='moviesCard__button' onClick={handleClick}>
                        <img className='moviesCard__click' alt='удалить' src={deleteFilm} />
                    </button>}

                {location.pathname === '/movies' &&
                    <button type='button' aria-label='сохранить' className={isSaved ? 'moviesCard__button' : 'moviesCard__button'}
                        onClick={handleClick}>
                        {isSaved ? <img className='moviesCard__click' alt='добавлено' src={saveFilm} /> :
                            <img className='moviesCard__add' alt='лайк' src={disLiked} />}</button>}
            </div>
            <p className='moviesCard__time'>{card.time}</p>
        </li>
    );
};

export default MoviesCard;