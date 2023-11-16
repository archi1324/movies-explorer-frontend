import './Register.css';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/headerLogo.svg'
import useFormWithValidation  from "../../hooks/useFormWithValidation";

export default function Register({ handleRegister }) {
  const { values, handleChange, isValid, errors } = useFormWithValidation();


  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(values);
  }

  return (
    <main >
    <section className="login Registr">
    <Link to="/">
          <img src={headerLogo} alt="Логотип" className="login__icon button" />
    </Link>
      <form className="login__form" name="register" noValidate onSubmit={handleSubmit}>

        <h1 className="login__title">Добро пожаловать!</h1>
            <span className="login__plaseholder">Имя</span>
            <input
              name="name"
              className={`login__input ${errors.name && 'login__input_error'}`}
              onChange={handleChange}
              value={values.name || ''}
              type="text"
              required
              minLength="2"
              maxLength="30"
              pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
            />
            <span className="login__error">{errors.name || ''}</span>

\
            <span className="login__plaseholder">E-mail</span>
            <input
              name="email"
              className={`login__input ${errors.email && 'login__input_error'}`}
              onChange={handleChange}
              value={values.email || ''}
              type="email"
              required
            />
            <span className="login__error login__error-activ">{errors.email || ''}</span>

            <span className="login__plaseholder">Пароль</span>
            <input
              name="password"
              className={`login__input ${errors.password && 'login__input_error'}`}
              onChange={handleChange}
              value={values.password || ''}
              type="password"
              required
            />
            <span className="login__error-activ">{errors.password || ''}</span>

        <button
          type="submit"
          className={`login__button button ${!isValid && 'login__button_disabled'}`}
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
        <p className="login__link">Уже зарегистрированы?
        <Link to={"/signin"} className="login__link-src button" href="#">Войти</Link></p>
      </form>
      </section>
    </main>
  )
}
