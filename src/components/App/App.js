import './App.css';
import api from '../../utils/Api.js';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../PageNotFound/PageNotFound';
import Preloader from '../Preloader/Preloader';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Footer from '../Footer/Footer';

export default function App() {
  const history = useHistory();
  const location = useLocation();
  const [load, setLoad] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [profileMessage, setProfileMessage] = useState('');
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [setError] = useState(false);
  const [setErrorMessage] = useState({ text: '' });

  useEffect(() => {
    setProfileMessage('');
  }, [location]);

  function handleRegister({ name, email, password }) {
    setIsLoader(true);
    api
      .createUser(name, email, password)
      .then((res) => {
        if (res) {
          handleLoginUser({ email, password });
          setErrorMessage({ text: '' })
          history.push('/movies');
        }
      })
      .catch((err) => {
        setErrorMessage({ text: '' });
        setError(true);
        if (err === 'Статус ошибки: 400') {
          setErrorMessage({ text: "Ошибка при регистрации" });
        }
        if (err === 'Статус ошибки: 409') {
          setErrorMessage({ text: "Пользователь уже существет" });
        }
        if (err === 'Статус ошибки: 500') {
          setErrorMessage({ text: "Что-то с сервером" });
        }
      })
      .finally(() => setIsLoader(false));
  }

  function handleLoginUser({ email, password }) {
    setIsLoader(true);
    api
      .login(email, password)
      .then(jwt => {
        if (jwt.token) {
          localStorage.setItem('jwt', jwt.token);
          setLoggedIn(true);
          history.push('/movies');
        }
      })
      .catch((err) => {
        setErrorMessage({ text: '' });
        setError(true);
        if (err === 'Статус ошибки: 401') {
          setErrorMessage({ text: "При входе произошла ошибка" });
        }
        if (err === 'Статус ошибки: 500') {
          setErrorMessage({ text: "Что-то с сервером" });
        }
      })
      .finally(() => setIsLoader(false));
  }

  function handleExit() {
    setCurrentUser({});
    setLoggedIn(false);
    localStorage.clear();
    history.push('/');
  }

  function handleProfile({ name, email }) {
    setIsLoader(true);
    api
      .changeUserInfo(name, email)
      .then(newUserData => {
        setCurrentUser(newUserData);
        setProfileMessage('Профиль успешно обновлен!');
      })
      .catch(err => {
        setErrorMessage('');
        setProfileMessage('');
        setError(true);
        if (err === 400) { setErrorMessage('Ошибка при обновлении пользователя') }
        if (err === 409) { setErrorMessage('Пользователь уже существует') }
        if (err === 500) { setErrorMessage('Ошибка на сервере') }
      }
      )
      .finally(() => setIsLoader(false));
  }

  function handleSaveMovie(movie) {
    api
      .createMovie(movie)
      .then(newMovie => setSavedMoviesList([newMovie, ...savedMoviesList]))
      .catch((err) => console.log(err));
  }

  function handleDeleteMovie(movie) {
    const savedMovie = savedMoviesList.find(
      (item) => item.movieId === movie.id || item.movieId === movie.movieId
    );
    api
      .deleteMovie(savedMovie._id)
      .then(() => {
        const newMoviesList = savedMoviesList.filter(m => {
          if (movie.id === m.movieId || movie.movieId === m.movieId) {
            return false;
          } else {
            return true;
          }
        });
        setSavedMoviesList(newMoviesList);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    const path = location.pathname;
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setIsLoader(true);
      api
        .getUserInfo()
        .then(data => {
          if (data) {
            setLoggedIn(true);
            setCurrentUser(data);
            history.push(path);
          }
        })
        .catch((err) => { console.log(err) })
        .finally(() => {
          setIsLoader(false);
          setLoad(true);
        });
    } else {
      setLoad(true);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      setIsLoader(true);
      api
        .getUserInfo()
        .then((user) => setCurrentUser(user))
        .catch((err) => { console.log(err) })
        .finally(() => setIsLoader(false));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn && currentUser) {
  api
  .getSavedMovies()
  .then(data => {
    const UserMoviesList = data.filter(m => m.owner === currentUser._id);
    setSavedMoviesList(UserMoviesList);
  })
  .catch((err) => { console.log(err) })
  .finally(() => setIsLoader(false));
  }
  }, [currentUser, loggedIn]);

  return (
    <div className="app">
      {!load ? (
        <Preloader isOpen={isLoader} />
      ) : (
        <CurrentUserContext.Provider value={currentUser}>
          <Switch>
            <Route exact path='/'>
              <Header  loggedIn={loggedIn}/>
              <Main />
              <Footer/>
            </Route>
            <Route exact path='/signup'>
              {!loggedIn ? (
                <Register handleRegister={handleRegister} />
              ) : (
                <Redirect to='/' />
              )}
            </Route>
            <Route exact path='/signin'>
              {!loggedIn ? (
                <Login handleLoginUser={handleLoginUser} />
              ) : (
                <Redirect to='/' />
              )}
            </Route>

            <ProtectedRoute
              path='/movies'
              component={Movies}
              loggedIn={loggedIn}
              setIsLoader={setIsLoader}
              savedMoviesList={savedMoviesList}
              onLikeClick={handleSaveMovie}
              onDeleteClick={handleDeleteMovie}
            />

            <ProtectedRoute
              path='/saved-movies'
              component={SavedMovies}
              loggedIn={loggedIn}
              savedMoviesList={savedMoviesList}
              onDeleteClick={handleDeleteMovie}
            />
            <ProtectedRoute
              path='/profile'
              component={Profile}
              loggedIn={loggedIn}
              profileMessage={profileMessage}
              handleProfile={handleProfile}
              handleSignOut={handleExit}
            />
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
          <Preloader isOpen={isLoader} />
        </CurrentUserContext.Provider>
      )}
    </div>
  );
}
