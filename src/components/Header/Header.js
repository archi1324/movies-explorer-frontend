import React from "react";
import './Header.css';
import { Link } from 'react-router-dom';

import headerLogo from '../../images/headerLogo.svg'
function Header() {

  return (
    <header className='header'>
        <Link to='/' className='header__link'>
          <img src={headerLogo} alt="Логотип" />
        </Link>
        <nav className="header__menu">
            <Link className="header__register button" to='/signup'>Регистрация</Link>
            <Link className="header__login button" to='/signin'>Войти</Link>
        </nav>
    </header>
  );
}

export default Header;
