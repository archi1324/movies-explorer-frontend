import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCard.css';
import deleteFilm from '../../images/deleteFilm.svg';
import saveFilm from '../../images/likeFilm.svg';
import disLiked from '../../images/disLiked.svg';

function MoviesCard ({  card,
    saved,
    isSavedFilms,
    handleLikeClick,
    onCardDelete,
    savedMovies,
    pathname,}){
        
console.log(card);

        const location = useLocation();

        function onCardClick() {
            if (saved) {
              console.log("Not");
              onCardDelete(savedMovies.filter((m) => m.movieId === card.id)[0]);
            } else {
              handleLikeClick(card);
              console.log("Saved");
            }
          }
        
          function onDelete() {
            onCardDelete(card);
          }

          const cardSaveButtonClass = `${
            saved
              ? "moviesCard__add moviesCard__click"
              : "moviesCard__add"
          }`;

    return (
        <li className='moviesCard'>
        <a href={card.trailerLink} target="_blank">

            <img className='moviesCard__image' src={
            isSavedFilms
              ? card.image
              : `https://api.nomoreparties.co/${card.image.url}`
          } alt='картинка фильма' />
        </a>
            <div className='moviesCard__container'>
                <h2 className='moviesCard__title'>{card.nameRU}</h2>
                {location.pathname === '/saved-movies' ?(
                    <button type='button' aria-label='удалить фильм' onClick={onDelete} className='moviesCard__button'>
                        <img className='moviesCard__click' alt='удалить' />
                    </button>) : (
                        <>
                        {saved ? (
                            <button
                            className="moviesCard__button"
                            onClick={onCardClick}
                          >
                          <img className='moviesCard__add' alt='лайк' src={disLiked} />
                          </button>
                        ) : (
                          <button
                            className={"moviesCard__button"}
                            onClick={onCardClick}
                          >
                          <img className='moviesCard__click' alt='добавлено' src={saveFilm} />
                          </button>
                        )}
                        </>
                    )}
                    </div>
            <p className='moviesCard__time'>{card.duration}</p>
        </li>
    );
}

export default MoviesCard;