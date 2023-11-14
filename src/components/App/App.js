import React from 'react';
import { Route, Routes} from 'react-router-dom';
import {useNavigate, useLocation, Navigate} from 'react-router-dom'
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Navigation from '../Navigation/Navigation';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import * as apiAuth from '../../utils/ApiAuth'
import api from '../../utils/Api'


function App() {
  
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState({text: ''});
  const [savedMovies, setSavedMovies] = React.useState([]);

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      apiAuth.checkToken(jwt)
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
      })
      .then(() => {navigate(location.pathname)})
      .catch((err) => { console.log(err)});
    }
  }

  React.useEffect(() => {handleTokenCheck()}, [])

  function handleRegister({email, password, name}) {
    setError(false);
    return apiAuth
       .register(email, password, name)
       .then((res) => {
         if (res) {
          console.log(res);
          setErrorMessage({text:''})
          handleLogin({email, password})
          navigate('/movies')}
       })
       .catch((err) => {
        console.log(err);
        setErrorMessage({text:''});
        setError(true);
        if (err === 'Статус ошибки: 400') {
          setErrorMessage('При регистрации произошла ошибка');
        }
        if (err === 'Статус ошибки: 409') {
          setErrorMessage('Пользователь с таким email уже существует');
        }
        if (err === 'Статус ошибки: 500') {
          setErrorMessage('На сервере что-то не так');
        }
      });
  }

  function handleLogin({email, password}) {
    setError(false);
    apiAuth.authorise(email, password)
      .then((data) => {
        if (data) {
          setLoggedIn(true);
          localStorage.setItem('jwt', data.token);
          navigate('/movies');
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage({text:''});
        setError(true);
        if (err === 'Статус ошибки: 401') {
          setErrorMessage('Ошибка при входе');
        }
        if (err === 'Статус ошибки: 500') {
          setErrorMessage('На сервере что-то не так');
        }
      });
  }

  function exit() {
    localStorage.clear();
    setCurrentUser({});
    setLoggedIn(false);
    navigate('/');
  }

  React.useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {console.log(err)});

      api.getSavedMovies()
        .then((movies) => {
          setSavedMovies(movies)
        })
        .catch((err) => {console.log(err)});
    }
  }, [loggedIn]);

  function handleLike(movie) {
    const isSaved = savedMovies.some(c => c.movieId === movie.id);
    if (!isSaved) {
      api.saveMovie(movie)
        .then((newMovie) => {
          setSavedMovies([...savedMovies, newMovie]);
        })
    } else {
      const id = savedMovies.find(c => c.movieId === movie.id)._id;
      api.deleteSavedMovie(id)
        .then(() => {
          setSavedMovies(res => res.filter(c => c.movieId !== movie.id))
        })
        .catch((err) => console.log(err));
    }
  };

  function deleteLike(movie) {
    api.deleteSavedMovie(movie._id)
      .then(() => {
        setSavedMovies(res => res.filter(c => c._id !== movie._id))
      })
      .catch((err) => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="App">
        <Routes>
        <Route>
          <Route exact path={'/'} element={<>
            <Header loggedIn={loggedIn} />
            <Main />
            <Footer />
          </>}>
          </Route>

          <Route exact path={'/movies'} element={
          <ProtectedRoute loggedIn={loggedIn}>
            <Navigation/>
            <Movies  
            loggedIn={loggedIn}
            isLogged={loggedIn}  
            savedMovies={savedMovies}
            onCardSave={handleLike}/>
            <Footer />
          </ProtectedRoute>}>
          </Route>

          <Route exact path={'/saved-movies'} element={
          <ProtectedRoute loggedIn={loggedIn} >
          <>
            <Navigation loggedIn={loggedIn}/>
            <SavedMovies 
            loggedIn={loggedIn}
            savedMovies={savedMovies}
            onCardDelete={deleteLike}
            />
            <Footer />
          </>
          </ProtectedRoute>}>
          </Route>
          </Route>
          
          <Route exact path={'/signup'} element={ loggedIn 
                ? <Register onRegister={handleRegister} error={error} text={errorMessage.text}/> 
                : <Navigate to="/movies" />} /> 

          <Route exact path="/signin" element={ loggedIn 
                ? <Login onLogin={handleLogin} error={error} text={errorMessage.text}/> 
                : <Navigate to="/movies" />} />

          <Route exact path={'/profile'} element={
          <ProtectedRoute
          loggedIn={loggedIn}>
          <>
            <Profile 
            loggedIn={loggedIn}
            currentUser = {currentUser}
            onExit={exit}
            />
          </>
          </ProtectedRoute>}>
          </Route>

          <Route exact path={'*'} element={
            <>
              < PageNotFound />
            </>}>
          </Route> 

        </Routes>

    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
