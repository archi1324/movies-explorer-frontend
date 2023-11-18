import './Profile.css';
import { useEffect, useState, useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import useFormWithValidation from "../../hooks/useFormWithValidation";
import Navigation from '../Navigation/Navigation';

export default function Profile({ handleSignOut, handleProfile, profileMessage }) {
  const { values, handleChange, isValid, resetForm, errors } = useFormWithValidation();
  const [profileMessageText, setProfileMessageText] = useState('');
  const currentUser = useContext(CurrentUserContext); // подписка на контекст

  function handleSubmit(e) {
    e.preventDefault();
    handleProfile(values);
  }

  useEffect(() => {
    setProfileMessageText(profileMessage);
  }, [profileMessage]);


  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  const requirementValidity = (!isValid || (currentUser.name === values.name && currentUser.email === values.email));

  return (
    <div className="app">
      <Navigation />
      <form className="profile" name="profile" noValidate onSubmit={handleSubmit}>

        <h1 className="profile__title">{`Привет, ${currentUser.name || ''}!`}</h1>
        <div className="profile__list">

          <div className="profile__container">
            <span className="profile__item profile__span">Имя</span>
            <input
              name="name"
              className={`profile__item ${errors.name && 'profile__item_error'}`}
              onChange={handleChange}
              value={values.name || ''}
              type="text"
              required
              minLength="2"
              maxLength="30"
              pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
            />
          </div>
          <span className="profile__error">{errors.name || ''}</span>

          <div className="profile__container">
            <span className="profile__item profile__span">E-mail</span>
            <input
              name="email"
              className={`profile__input ${errors.email && 'profile__input_error'}`}
              onChange={handleChange}
              value={values.email || ''}
              pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$"
              type="email"
              required
            />
          </div>
          <span className='profile__error'>{errors.email || ''}</span>
          <span className="profile__error-text">{profileMessageText}</span>
        </div>
        <div className="profile__buttons">
          <button
            type="submit"
            className={`profile__button button ${requirementValidity ? 'profile__button-disabled' : ''}`}
            disabled={requirementValidity ? true : false}
          >
            Редактировать
          </button>
          <div className="profile__button-container" onClick={handleSignOut}>
            <div className="profile__button profile__button-ex button" >Выйти из аккаунта</div>
          </div>
        </div>
      </form>
    </div>
  );
}
