import React from 'react';
import Navigation from '../Navigation/Navigation';
import { Link} from 'react-router-dom';

function Profile() {

  return (
    <div className="app">
    <Navigation />
    <section className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
        <div className="profile__list">
        <div className="profile__container">
            <p className="profile__item">Имя</p>
            <p className="profile__item">Виталий</p>
        </div>
        <div className="profile__container">
            <p className="profile__item">E-mail</p>
            <p className="profile__item">pochta@yandex.ru</p>
        </div>
      </div>
      <div className="profile__buttons">
        <button className="profile__button button" type="submit">Редактировать</button>
        <Link to="/signin">
        <button className="profile__button profile__button-ex button" type="submit">Выйти из аккаунта</button>
        </Link>
      </div>
      <div className="profile__save profile__save_none">
        <span className="profile__span">При обновлении произошла ошибка</span>
        <button className="profile__button-save_none profile__button-save button" type="submit">Сохранить</button>
      </div>
    </section>
    </div>
  );
}

export default Profile;