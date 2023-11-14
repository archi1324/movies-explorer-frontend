import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/headerLogo.svg'
import './Register.css';
import {useFormWithValidation} from '../../hooks/useFormWithValidation';


function Register(props) {

  const [values, errors, isValid, handleChange] = useFormWithValidation();

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onRegister(values)
    }

    return (
      <main>
        <section className="login Registr">
        <Link to={"/"}>
          <img className="login__icon button" src={headerLogo} alt="Лого"/>
        </Link>
        <form className="login__form" onSubmit={handleSubmit} name="register">
          <h1 className="login__title">Добро пожаловать!</h1>
          <span className="login__plaseholder">Имя</span>
          <input className={ errors.name ? 'login__input login__input-active' : 'login__input'}
          type="text" name="name"
          id="register-name" placeholder="Имя" 
          onChange={handleChange} value={values.name || ''} minLength={4} maxLength={16} required />
          <span className="login__error-active">{errors.name}</span>
          <span className="login__plaseholder">E-mail</span>
          <input className={ errors.email ? 'login__input login__input-active' : 'login__input'}
          type="email" name="email"
          id="register-email" required value={values.email || ''} onChange={handleChange} minLength={6} maxLength={30} placeholder="Email" />
          <span className="login__error-active">{errors.email}</span>
          <span className="login__plaseholder">Пароль</span>
          <input  className={ errors.password ? "login__input login__input-active" : "login__input"}  
          type="password" name="password"
          id="register-password" minLength={8} maxLength={100} required onChange={handleChange}
           value={values.password || ''} placeholder="Пароль"/>
          <span className="login__error-active">{errors.password}</span>
          <button disabled={!isValid ? true : false}
        className={!isValid  ? "login__button login__buttons login__button_disabled" 
        : "login__button button login__buttons"} type="submit">Зарегистрироваться</button>
        </form>
        <p className="login__link">Уже зарегистрированы?
        <Link to={"/signin"} className="login__link-src button" href="#">Войти</Link></p>
      </section>
      </main>
    );
}

export default Register;