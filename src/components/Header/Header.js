import React from "react";
import './Header.css';
import { Link } from 'react-router-dom';

import headerLogo from '../../images/headerLogo.svg'

function Header({loggedIn}) {

    return (

        <header className='header'>
          <Link to="/">
            <img className='header__logo button' src={headerLogo} alt='Логотип' />
          </Link>
            <nav className="header__menu">
                <Link className="header__register button" to='/signup'>Регистрация</Link>
                <Link className="header__login button" to='/signin'>Войти</Link>
            </nav>
        </header>
    )
}

export default Header;