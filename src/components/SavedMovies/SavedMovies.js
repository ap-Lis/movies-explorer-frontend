import React from 'react';
import './SavedMovies.css'

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({cards, onCardLike, onCardDelete}) {

    return (
        <main className="saved-movies">
            <SearchForm />
            <MoviesCardList cards={cards} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
        </main>
    );
  }
  
export default SavedMovies;