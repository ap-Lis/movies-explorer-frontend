import React from 'react';
import './Movies.css'

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({cards, onCardLike, savedCards}) {

    return (
        <main className="movies">
            <SearchForm />
            <MoviesCardList cards={cards} onCardLike={onCardLike} savedCards={savedCards}/>
            <button className="movies__more-button" type="button" aria-label="Ещё">Ещё</button>
        </main>
    );
  }
  
export default Movies;