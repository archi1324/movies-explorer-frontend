import React from 'react';
import './Promo.css'
import mainImage from '../../images/mainImage.svg';

function Promo(props) {
    return (
        <section className='promo'>
            <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
            <img className='promo__image' alt='главное изображение' src={mainImage} />
        </section>
    )
}

export default Promo;
