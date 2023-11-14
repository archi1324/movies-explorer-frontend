import React from 'react';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import headerLogo from '../../images/headerLogo.svg';

function Login(props) {
  const [values, errors, isValid, handleChange] = useFormWithValidation();

function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin(values)
}

    return (
      <main>
        <section className="login">
      <Link to={"/"}>
        <img className="login__icon button" src={headerLogo} alt="Лого"/>
      </Link>
      <form className="login__form"  name="login" onSubmit={handleSubmit}>
        <h1 className="login__title">Рады видеть!</h1>
        <span className="login__plaseholder">E-mail</span>
        <input className={ errors.email ? 'login__input login__input-active' : 'login__input'} 
        type="email" name="email"
        id="login-email" 
        minLength={8} maxLength={100} 
        placeholder="Email" value={values.email || ''}
        onChange={handleChange}
        pattern='^.+@.+\..+$'
        required/>
        <span className="login__error-active">{errors.email}</span>
        <span className="login__plaseholder">Пароль</span>
        <input className={ errors.password ? "login__input login__input-active" : "login__input"} 
        type="password" name="password"
        id="login-password"
        minLength={8} maxLength={20} 
        placeholder="Пароль" value={values.password || ''} 
        onChange={handleChange}
        required/>
        <span className="login__error-active">{errors.password}</span>
        <button disabled={!isValid ? true : false}
        className={!isValid  ? "login__button login__buttons login__button_disabled" 
        : "login__button button login__buttons"}
        type="submit">Войти</button>
      </form>
      <p className="login__link">Еще не зарегистрированы?
      <Link to={"/signup"} className="login__link-src button" href="#">Регистрация</Link></p>
    </section>
    </main>
    )
}

export default Login;