import React, { useEffect, useState }  from 'react';
import Navigation from '../Navigation/Navigation';
import { Link , useLocation} from 'react-router-dom';
import api from '../../utils/Api'

function Profile({ exit, currentUser }) {

    const [name, setName] = React.useState(currentUser.name);
    const [lastName, setLastName] = React.useState(currentUser.name);
    const [email, setEmail] = React.useState(currentUser.email);
    const [lastEmail, setLastEmail] = React.useState(currentUser.email);
    const [isVisibleButton, setVisibleButton] = React.useState(false);
    const [isButton, setButton] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);
    const [isOk, setIsOk] = React.useState('');
  
    function handleSubmit(evt) {
      evt.preventDefault();
      api.changeUserInfo({name, email})
      .then(() => {
        setVisibleButton(false);
        setButton(false);
        setErrorMessage('')
        setLastName(name);
        setLastEmail(email);
        setIsOk('Данные успешно обновлены');
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage('');
        setError(true);
        if (err === 400) { setErrorMessage('Ошибка при обновлении пользователя')}
        if (err === 409) { setErrorMessage('Пользователь уже существует')}
        if (err === 500) { setErrorMessage('Ошибка на сервере')}
      });
    };
  
    function handleNameChange(evt) {
      const target = evt.target;
      const name = target.name;
      const value = target.value;
      setValues({ ...values, [name]: value });
      setErrors({ ...errors, [name]: target.validationMessage });
      setIsValid(target.closest('form').checkValidity());
      setName(value);
    }
  
    function handleEmailChange(evt) {
      const target = evt.target;
      const name = target.name;
      const value = target.value;
      setValues({ ...values, [name]: value });
      setErrors({ ...errors, [name]: target.validationMessage });
      setIsValid(target.closest('form').checkValidity());
      setEmail(value);
    }
  
    function showSaveBtn() {
      setIsOk('')
      setVisibleButton(true);
    }
    
    const isButtonAble = isValid && (values.name !== lastName || values.email !== lastEmail);
  

  return (
    <div className="app">
    <Navigation />
    <main> 
    <form onSubmit={handleSubmit} className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <div className="profile__list">
        <div className="profile__container">
            <p className="profile__item">Имя</p>
            <input className='profile__item_input'
                type='text'
                id='input-name'
                name='name'
                value={name}
                placeholder='Имя'
                onChange={handleNameChange}
                minLength="2"
                required />
        </div>
        <span className='profile__error'>{errors.name || ''}</span>
        <div className="profile__container">
            <p className="profile__item">E-mail</p>
            <input className='profile__item_input'
                type='email'
                name='email'
                id='edit-email'
                value={email}
                placeholder='E-mail'
                onChange={handleEmailChange}
                required />
        </div>
        <span className='profile__error'>{errors.email || ''}</span>
        <span className="profile__error-text">{errorMessage}</span>
      </div>
      <div className="profile__buttons">
        <button className="profile__button button" onClick={(evt) => showSaveBtn(evt)} type="submit">Редактировать</button>
        <Link className= "profile__button-container" onClick={exit} to="/signin">
          <div className="profile__button profile__button-ex button" >Выйти из аккаунта</div>
        </Link>
      </div>
      <div className="profile__save profile__save_none">
        <span className="profile__span">При обновлении произошла ошибка</span>
        <button className="profile__button-save_none profile__button-save button" disabled={!isValid} type="submit">Сохранить</button>
      </div>
    </form>
    </main>
    </div>
  );
}

export default Profile;