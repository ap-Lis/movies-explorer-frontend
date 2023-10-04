import React from 'react';
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({cards, onCardLike, savedCards, onCardDelete}) {

    return (
        <section className="movies-card-list">
            <ul className="movies-card-list__grid">
                {
                    cards.map((card) => <MoviesCard key={card.movieId} card={card} onCardLike={onCardLike} savedCards={savedCards} onCardDelete={onCardDelete}/>)
                }
            </ul>
        </section>
    );
  }
  
export default MoviesCardList;