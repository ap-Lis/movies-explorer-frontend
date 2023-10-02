import React from 'react';
import { Route, Routes } from 'react-router-dom';

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

import { moviesTestStartArray, moviesTestSaved } from '../../utils/constants';
import Navigation from '../Navigation/Navigation';

function App() {

  const [likedMovies, setLikedMovies] = React.useState(moviesTestSaved);
  const [isNavigationOpen, setIsNavigationOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  function handleCardLike(card) {
    const likedMovie = likedMovies.find((movie) => movie.movieId === card.movieId);
    if (likedMovie) {
      const newlikedMovies = likedMovies.filter((movie) => movie.movieId !== likedMovie.movieId);
      setLikedMovies([...newlikedMovies]);
    } else {
      setLikedMovies([card, ...likedMovies]);
    };
  }

  function handleLogin() {
    setIsLoggedIn(!isLoggedIn);
  }

  function handleCardDelete(card) {
    const newlikedMovies = likedMovies.filter((movie) => movie.movieId !== card.movieId);
    setLikedMovies([...newlikedMovies]);
  }

  function handleNavigationClick() {
    setIsNavigationOpen(!isNavigationOpen);
  }

  return (
    <div className="page">
      <Routes>
        <Route path="/" element={
          <>
            <Header isLoggedIn={isLoggedIn} isWhite={false} onBurgerClick={handleNavigationClick} />
            <Main />
            <Footer/>
          </>
        } />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login onLogin={handleLogin}/>} />
        <Route path="/movies" element={
          <>
            <Header isLoggedIn={isLoggedIn} isWhite={true} onBurgerClick={handleNavigationClick} />
            <Movies cards={moviesTestStartArray} onCardLike={handleCardLike} savedCards={likedMovies}/>
            <Footer/>
          </>
        } />
        <Route path="/saved-movies" element={
          <>
            <Header isLoggedIn={isLoggedIn} isWhite={true} onBurgerClick={handleNavigationClick}/>
            <SavedMovies cards={likedMovies} onCardDelete={handleCardDelete} />
            <Footer/>
          </>
        } />
        <Route path="/profile" element={<> <Header isLoggedIn={isLoggedIn} isWhite={true} onBurgerClick={handleNavigationClick} /> <Profile onLogout={handleLogin} /> </>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Navigation isOpen={isNavigationOpen} onClose={handleNavigationClick} />
    </div>
  );
}

export default App;
