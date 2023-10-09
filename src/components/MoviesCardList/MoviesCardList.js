import React from 'react';
import './MoviesCardList.css'
import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({cards, onCardLike, savedMovies, onCardDelete, isLoading}) {

    return (
        <section className="movies-card-list">
            { isLoading ? <Preloader /> :
            <ul className="movies-card-list__grid">
                {
                    cards.map((card) => <MoviesCard key={card.movieId} card={card} onCardLike={onCardLike} savedMovies={savedMovies} onCardDelete={onCardDelete}/>)
                }
            </ul>}
        </section>
    );
  }
  
export default MoviesCardList;