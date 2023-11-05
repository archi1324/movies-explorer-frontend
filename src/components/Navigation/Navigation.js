import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import Popup from '../Popup/Popup';
import headerLogo from '../../images/headerLogo.svg';

import accountLogo from '../../images/profile.svg';
import './Navigation.css'

function Navigation() {

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    }

    const closePopup = () => {
        setIsPopupOpen(false);
    }

    return (
        <section className='navigation'>
            <div className='navigation__menu'>
                <div className='navigation__popup'>
                <Link to="/">
                  <img className='header__logo' src={headerLogo} alt='Логотип' />
                </Link>
                    <Popup
                        isOpen={isPopupOpen}
                        onClick={openPopup}
                        onClose={closePopup}
                    />
                </div>
                <div className='navigation__links'>
                    <Link className='navigation__link navigation__link_active' to='/movies'>Фильмы</Link>
                    <Link className='navigation__link' to='/saved-movies'>Сохранённые фильмы</Link>
                    <nav className='navigation__account-data'>
                        <Link className="navigation__login" to="/profile">Аккаунт</Link>
                        <Link className="navigation__account" to="/profile"  src={accountLogo} alt='изображение человечка'></Link>
                    </nav>
                </div>
            </div>
        </section>
    )
}

export default Navigation;