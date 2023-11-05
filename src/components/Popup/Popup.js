import React from 'react';
import { Link } from "react-router-dom";

import accountLogo from '../../images/profile.svg';

import './Popup.css'

function Popup({ onClick, isOpen, onClose }) {

    const PopupButton = `popup__visible ${isOpen ? 'popup__hidden' : 'popup__visible'}`;

    const PopupActive = `popup__open ${isOpen ? 'popup__open_active' : ' '}`;

    return (
        <>
            <button className={PopupButton}
                onClick={onClick}
            />
            <div className={PopupActive}>
                <button className="popup__close" onClick={onClose} />
                <nav className="popup__links">
                    <Link className="popup__link" to="/">Главная</Link>
                    <Link className="popup__link popup__link_active" to="/movies">Фильмы</Link>
                    <Link className="popup__link" to="/saved-movies">Сохранённые фильмы</Link>
                </nav>
                <nav className='popup__footer'>
                    <Link className="popup__login" to="/profile">Аккаунт</Link>
                    <Link className="popup__acc" to="/profile" src={accountLogo} alt='изображение профиля'></Link>
                </nav>
            </div>
            
        </>
    )
}

export default Popup;