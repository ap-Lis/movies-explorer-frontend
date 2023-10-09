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

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as mainApi from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi'

function App() {
  const token = localStorage.getItem('jwt');
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [isNavigationOpen, setIsNavigationOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEdit, setIsEdit] = React.useState(false);
  const [loginError, setLoginError] = React.useState('');
  const [registerError, setRegisterError] = React.useState('');
  const [profileMessage, setProfileMessage] = React.useState('');
  const [isGreeting, setIsGreeting] = React.useState(false);

  const [searchInput, setSearchInput] = React.useState(localStorage.getItem('searchQuery') ?? '');
  const [searchSavedInput, setSearchSavedInput] = React.useState('');
  const [filteredMovies, setFilteredMovies] = React.useState(JSON.parse(localStorage.getItem('filteredMovies')));
  const [beatMovies, setBeatMovies] = React.useState(JSON.parse(localStorage.getItem('beatMovies')));
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState(localStorage.getItem('searchQuery') ?? '');
  const [searchSavedQuery, setSearchSavedQuery] = React.useState('');
  const [isShort, setIsShort] = React.useState(JSON.parse(localStorage.getItem('isShort')) ?? false);
  const [isSavedShort, setIsSavedShort] = React.useState(false);
  const [screenWidth, setScreenWidth] = React.useState(getCurrentWidth());

  function getCurrentWidth(){
    return {
      	width: window.innerWidth
    }
  }

  React.useEffect(() => {
    const updateWidth = () => {
      setScreenWidth(getCurrentWidth());
    }
    window.addEventListener('resize', updateWidth);
    
    return(() => {
        window.removeEventListener('resize', updateWidth);
    })
  }, [screenWidth])

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
      setIsLoading(true);
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies(), moviesApi.getMovies()])
        .then(([info, savedMovies, movies])=>{
          setCurrentUser(info);
          setSavedMovies(savedMovies.data);
          setBeatMovies(movies);
        })
        .catch((err)=>{console.log(err);})
        .finally(() => {setIsLoading(false)});
    }
  }, [token])

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
    mainApi.register(userInfo).then((res)=>{
      setRegisterError('');
      handleLogin({email: res.email,
      password: userInfo.password});
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
      setProfileMessage('');
      setIsGreeting(true);
      setProfileMessage("Данные изменены!");
      setIsEdit(!isEdit);
    }).catch((err)=>{
      setIsGreeting(false);
      if(err==="Ошибка: 409") {
        setProfileMessage("Пользователь с таким e-mail уже зарегистрирован");
      } else if (err === "Ошибка: 500") {
        setProfileMessage("На сервере произошла ошибка");
      } else {
        setProfileMessage("Неизвестная ошибка");
      }
      console.log(err);
    });
  }

  function handleCardDelete(card) {
    mainApi.deleteMovie(card._id).then(()=>{
      const newlikedMovies = savedMovies.filter((movie) => movie.movieId !== card.movieId);
      setSavedMovies([...newlikedMovies]);
    })
    .catch((err)=>{console.log(err);})
  }

  function handleCardLike(card) {
    const likedMovie = savedMovies.find((movie) => movie.movieId === card.movieId);
    if (likedMovie) {
      handleCardDelete(likedMovie);
    } else {
      mainApi.postMovie(card).then((res)=>{
        setSavedMovies([...savedMovies, res.data]);
      })
      .catch((err)=>{console.log(err);});
    };
  }

  function handleNavigationClick() {
    setIsNavigationOpen(!isNavigationOpen);
  }

  function clearUserInfo() {
    setIsLoggedIn(false);
    localStorage.clear();
    clearStates();
    navigate('/');
  }

  function clearStates(){
    setFilteredMovies(null);
    setSearchQuery('');
    setSearchSavedQuery('');
    setSearchInput('');
    setSearchSavedInput('');
    setIsShort(false);
    setSearchQuery('');
    setIsLoggedIn(false);
  }

  const filterArray = (movies, searchValue, shortValue) => {
    if(movies) {
      const arr = movies.map((item) => {
        return {
          _id: item._id,
          movieId: item.id ? item.id : item.movieId,
          nameRU: item.nameRU,
          nameEN: item.nameEN,
          duration: item.duration,
          country: item.country,
          director: item.director,
          year: item.year,
          description: item.description,
          trailerLink: item.trailerLink, 
          thumbnail: item.thumbnail? item.thumbnail : `https://api.nomoreparties.co${item.image.formats.thumbnail.url}`,
          image: item.image.url ? `https://api.nomoreparties.co${item.image.url}` : item.image,
        }
      }
      ).filter(movie =>
        (shortValue ? movie.duration <= 40 : movie) && (movie.nameRU.trim().toLowerCase().includes(searchValue.trim().toLowerCase()) || movie.nameEN.trim().toLowerCase().includes(searchValue.trim().toLowerCase()))
      );
      return arr;
    }
    return null;
  }

  React.useEffect(()=>{
    if(isLoggedIn) {
      localStorage.setItem('isShort', isShort);
      localStorage.setItem('searchQuery', searchQuery);
      setFilteredMovies(filterArray(beatMovies, searchQuery, isShort));
    }
  }, [isLoggedIn, isShort, searchQuery, beatMovies]);

  React.useEffect(()=>{
    setFilteredSavedMovies(filterArray(savedMovies, searchSavedQuery, isSavedShort));
  }, [isLoggedIn, isSavedShort, searchSavedQuery, savedMovies]);

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
                <ProtectedRouteElement
                  element={Movies}
                  cards={filteredMovies}
                  onCardLike={handleCardLike}
                  savedMovies={savedMovies}                  
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                  isShort={isShort}
                  setIsShort={setIsShort}
                  width={getCurrentWidth()}
                  isLoading={isLoading}
                  isLoggedIn={isLoggedIn}/>
                <Footer/>
              </>
            }
          />
          <Route path="/saved-movies" element=
            {
              <>
                <Header isLoggedIn={isLoggedIn} isWhite={true} onBurgerClick={handleNavigationClick}/>
                <ProtectedRouteElement
                  element={SavedMovies}
                  cards={filteredSavedMovies}
                  onCardDelete={handleCardDelete}
                  searchQuery={searchSavedQuery}
                  setSearchQuery={setSearchSavedQuery}
                  searchInput={searchSavedInput}
                  setSearchInput={setSearchSavedInput}
                  isShort={isSavedShort}
                  setIsShort={setIsSavedShort}
                  length={SavedMovies.length}
                  isLoggedIn={isLoggedIn}/>
                <Footer/>
              </>
            }
          />
          <Route path="/profile" element=
            {
              <>
                <Header isLoggedIn={isLoggedIn} isWhite={true} isEdit={isEdit} onBurgerClick={handleNavigationClick} />
                <ProtectedRouteElement
                  element={Profile}
                  onLogout={clearUserInfo}
                  onUpdateUser={handleUpdateUser}
                  isLoggedIn={isLoggedIn}
                  message={profileMessage}
                  isEdit={isEdit}
                  setMessage={setProfileMessage}
                  isGreeting={isGreeting}
                  onEdit={()=>{setIsEdit(!isEdit)}}/>
              </>
            }
          />
          <Route path="/signup" element={<Register onRegister={handleRegister} onError={registerError} setOnError={setRegisterError} isLoggedIn={isLoggedIn}/>} />
          <Route path="/signin" element={<Login onLogin={handleLogin} onError={loginError} setOnError={setLoginError} />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Navigation isOpen={isNavigationOpen} onClose={handleNavigationClick} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
