import React from 'react';
import './Footer.css'

function Footer() {
    return (
        <footer className='footer'>
            <h3 className='footer__tittle'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
            <div className='footer__content'>
                <p className='footer__copyright'>&copy; 2023</p>
                <ul className='footer__links'>
                    <li><a className='footer__link' href='https://practicum.yandex.ru' rel='noopener noreferrer'>Яндекс.Практикум</a></li>
                    <li><a className='footer__link' href='https://github.com/archi1324'rel='noopener noreferrer'>Github</a></li>
                </ul>
            </div>
        </footer>
    )
}
export default Footer;