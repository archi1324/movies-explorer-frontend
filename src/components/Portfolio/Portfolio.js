import React from 'react'
import './Portfolio.css'

import link from '../../images/linkItem.svg';

function Portfolio() {
    return (
        <section className='portfolio'>
            <h3 className='portfolio__title'>Портфолио</h3>
            <ul className='portfolio__components'>
                <li className='portfolio__component'>
                    <a className='portfolio__link' href='https://github.com/archi1324/how-to-learn' target="_blank" rel='noreferrer'>
                    <img src={link} className='portfolio__link-img' alt='линк' />Статичный сайт</a></li>
                <li className='portfolio__component'>
                    <a className='portfolio__link' href='https://github.com/archi1324/travel' target="_blank" rel='noreferrer'>
                    <img src={link} className='portfolio__link-img' alt='линк' />Адаптивный сайт</a></li>
                <li className='portfolio__component'>
                    <a className='portfolio__link' href='https://github.com/archi1324/react-mesto-auth' target="_blank" rel='noreferrer'>
                    <img src={link} className='portfolio__link-img' alt='линк' />Одностраничное приложение</a></li>
            </ul>
        </section>
    )
}

export default Portfolio;