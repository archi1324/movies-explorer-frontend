import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/headerLogo.svg'
import './Register.css';

function Register() {
    return (
      <main>
        <section className="login">
        <Link to={"/"}>
          <img className="login__icon button" src={headerLogo} alt="Лого"/>
        </Link>
        <form className="login__form" name="register">
          <h1 className="login__title">Добро пожаловать!</h1>
          <span className="login__plaseholder">Имя</span>
          <input className="login__input" type="text" name="name"
          id="register-name" placeholder="Имя" minLength={4} maxLength={16} required />
          <span className="login__error">Что-то пошло не так</span>
          <span className="login__plaseholder">E-mail</span>
          <input className="login__input" type="email" name="email"
          id="register-email" required minLength={6} maxLength={30} placeholder="Email" />
          <span className="login__error">Что-то пошло не так</span>
          <span className="login__plaseholder">Пароль</span>
          <input className="login__input" type="password" name="password"
          id="register-password" minLength={8} maxLength={100} required placeholder="Пароль"/>
          <span className="login__error">Что-то пошло не так</span>
          <button className="login__button button" type="submit">Зарегистрироваться</button>
        </form>
        <p className="login__link">Уже зарегистрированы?
        <Link to={"/signin"} className="login__link-src button" href="#">Войти</Link></p>
      </section>
      </main>
    );
}

export default Register;