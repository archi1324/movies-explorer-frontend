import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/headerLogo.svg';
import useFormWithValidation from "../../hooks/useFormWithValidation";
import '../Register/Register'
import Preloader from '../Preloader/Preloader';

export default function Login({ handleLoginUser }) {

  const { values, handleChange, isValid, errors, resetForm } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    handleLoginUser(values);
  }

  useEffect(() => {
    resetForm({}, {}, false);
  }, [resetForm]);

  return (
    <main>
      <section className="login">
        <Link to={"/"}>
          <img className="login__icon button" src={headerLogo} alt="Лого" />
        </Link>
        <Preloader />
        <form
          className="login__form"
          name="login"
          noValidate
          onSubmit={handleSubmit}
        >

          <h1 className="login__title">Рады видеть!</h1>
          <span className="login__plaseholder">E-mail</span>
          <input
            name="email"
            className={`login__input ${errors.email && 'login__input_error'}`}
            onChange={handleChange}
            value={values.email || ''}
            type="email"
            pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$"
            maxLength={200}
            required
          />
          <span className="login__error-activ">{errors.email || ''}</span>

          <span className="login__plaseholder">Пароль</span>
          <input
            name="password"
            className={`login__input ${errors.password && 'login__input_error'
              }`}
            onChange={handleChange}
            value={values.password || ''}
            type="password"
            minLength={8}
            maxLength={200}
            required
          />
          <span className="login__error-activ">{errors.password || ''}</span>

          <button
            type="submit"
            className={`login__button button login__buttons ${!isValid && 'login__button_disabled'}`}
            disabled={isValid ? false : true}
          >
            Войти
          </button>
          <p className="login__link">Еще не зарегистрированы?
            <Link to={"/signup"} className="login__link-src button" href="#">Регистрация</Link></p>
        </form>
        <Preloader />
      </section>
    </main>
  );
}
