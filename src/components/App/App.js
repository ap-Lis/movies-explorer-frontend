import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main'
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Navigation from '../Navigation/Navigation';
import ProtectedRouteElement from '../ProtectedRoute/ProtecterRoute';

import { moviesTestStartArray, moviesTestSaved } from '../../utils/constants';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as mainApi from '../../utils/MainApi';

function App() {
  const token = localStorage.getItem('jwt');
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [likedMovies, setLikedMovies] = React.useState(moviesTestSaved);
  const [isNavigationOpen, setIsNavigationOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEdit, setIsEdit] = React.useState(false);
  const [loginError, setLoginError] = React.useState('');
  const [registerError, setRegisterError] = React.useState('');
  const [profileError, setProfileError] = React.useState('');

  React.useEffect(()=>{
    if (token) {
      mainApi.checkToken(token).then((res) => {
        if (res) {
          setIsLoggedIn(true);
        }
      }).catch((err)=>{console.log(err);});
    } else {
      setIsLoggedIn(false);
    }
  }, [token])

  React.useEffect(()=>{
    if(token){
      Promise.all([mainApi.getUserInfo()])
        .then(([info])=>{
          setCurrentUser(info);
        })
        .catch((err)=>{console.log(err);});
    }
  }, [token])

  function handleCardLike(card) {
    const likedMovie = likedMovies.find((movie) => movie.movieId === card.movieId);
    if (likedMovie) {
      const newlikedMovies = likedMovies.filter((movie) => movie.movieId !== likedMovie.movieId);
      setLikedMovies([...newlikedMovies]);
    } else {
      setLikedMovies([card, ...likedMovies]);
    };
  }

  function handleLogin(userInfo) {
    mainApi.login(userInfo).then((res)=>{
      localStorage.setItem('jwt', res.token);
      setIsLoggedIn(true);
      setLoginError('');
      navigate('/movies');
    }).catch((err)=>{
      if(err==="Ошибка: 401") {
        setLoginError("Вы ввели неправильный логин и/или пароль");
      } else if (err === "Ошибка: 500") {
        setLoginError("На сервере произошла ошибка");
      } else {
        setLoginError("Неизвестная ошибка");
      }
      console.log(err);
    });
  }

  function handleRegister(userInfo) {
    mainApi.register(userInfo).then(()=>{
      setRegisterError('');
      navigate("/signin");
    }).catch((err)=>{
      if(err==="Ошибка: 409") {
        setRegisterError("Пользователь с таким e-mail уже зарегистрирован");
      } else if (err === "Ошибка: 500") {
        setRegisterError("На сервере произошла ошибка");
      } else {
        setRegisterError("Неизвестная ошибка");
      }
      console.log(err);
    });
  }

  function handleUpdateUser(currentUser) {
    mainApi.setUserInfo(currentUser).then((res)=>{
      setCurrentUser(res);
      setProfileError('');
      setIsEdit(!isEdit);
    }).catch((err)=>{
      if(err==="Ошибка: 409") {
        setProfileError("Пользователь с таким e-mail уже зарегистрирован");
      } else if (err === "Ошибка: 500") {
        setProfileError("На сервере произошла ошибка");
      } else {
        setProfileError("Неизвестная ошибка");
      }
      console.log(err);
    });
  }

  function handleCardDelete(card) {
    const newlikedMovies = likedMovies.filter((movie) => movie.movieId !== card.movieId);
    setLikedMovies([...newlikedMovies]);
  }

  function handleNavigationClick() {
    setIsNavigationOpen(!isNavigationOpen);
  }

  function clearUserInfo() {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    navigate('/')
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={
            <>
              <Header isLoggedIn={isLoggedIn} isWhite={false} onBurgerClick={handleNavigationClick} />
              <Main />
              <Footer/>
            </>
          } />
          <Route path="/movies" element=
            {
              <>
                <Header isLoggedIn={isLoggedIn} isWhite={true} onBurgerClick={handleNavigationClick} />
                <ProtectedRouteElement element={Movies} cards={moviesTestStartArray} onCardLike={handleCardLike} savedCards={likedMovies} isLoggedIn={isLoggedIn}/>
                <Footer/>
              </>
            }
          />
          <Route path="/saved-movies" element=
            {
              <>
                <Header isLoggedIn={isLoggedIn} isWhite={true} onBurgerClick={handleNavigationClick}/>
                <ProtectedRouteElement element={SavedMovies} cards={likedMovies} onCardDelete={handleCardDelete} isLoggedIn={isLoggedIn}/>
                <Footer/>
              </>
            }
          />
          <Route path="/profile" element=
            {
              <>
                <Header isLoggedIn={isLoggedIn} isWhite={true} isEdit={isEdit} onBurgerClick={handleNavigationClick}/>
                <ProtectedRouteElement element={Profile} onLogout={clearUserInfo} onUpdateUser={handleUpdateUser} isLoggedIn={isLoggedIn} onError={profileError} isEdit={isEdit} onEdit={()=>{setIsEdit(!isEdit)}}/>
              </>
            }
          />
          <Route path="/signup" element={<Register onRegister={handleRegister} onError={registerError}/>} />
          <Route path="/signin" element={<Login onLogin={handleLogin} onError={loginError}/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Navigation isOpen={isNavigationOpen} onClose={handleNavigationClick} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
