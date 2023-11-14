import React from 'react';
import { Link } from "react-router-dom";

import accountLogo from '../../images/profile.svg';

import './Popup.css'

function Popup({ onClick, isOpen, onClose }) {

    const PopupButton = `navigation__popup-visible ${isOpen ? 'navigation__popup-hidden' : 'navigation__popup-visible'}`;

    const PopupActive = `navigation__popup-open ${isOpen ? 'navigation__popup-open_active' : ' '}`;

    return (
        <>
            <button className={PopupButton}
                onClick={onClick}
            />
            <div className={PopupActive}>
                <button className="navigation__popup-close" onClick={onClose} />
                <nav className="navigation__popup-links">
                    <Link className={({ isActive }) =>
                        isActive ? "navigation__popup-link_active" : "navigation__popup-link"
                    } to="/">Главная</Link>
                    <Link className={({ isActive }) =>
                        isActive ? "navigation__popup-link_active" : "navigation__popup-link"
                    } to="/movies">Фильмы</Link>
                    <Link className={({ isActive }) =>
                        isActive ? "navigation__popup-link_active" : "navigation__popup-link"
                    } to="/saved-movies">Сохранённые фильмы</Link>
                </nav>
                <nav className='navigation__popup-footer'>
                    <Link className="navigation__popup-login" to="/profile">Аккаунт</Link>
                    <Link className="navigation__popup-acc" to="/profile" href={accountLogo} ></Link>
                </nav>
            </div>
            
        </>
    )
}

export default Popup;