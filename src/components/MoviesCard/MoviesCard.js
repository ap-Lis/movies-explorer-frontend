import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css'

function MoviesCard({card, onCardLike, savedCards, onCardDelete }) {

    const location = useLocation();
    const isMovies = location.pathname === '/movies';

    const isLiked = savedCards ? savedCards.some((movie) => movie.movieId === card.movieId) : false;

    const handleCardLike = () => {
        onCardLike(card);
    }

    const handleCardDelete = () => {
        onCardDelete(card);
    }

    return (
        <div className="movies-card">
            <img className="movies-card__img" alt={card.nameRU} src={card.image}/>
            <div className='movies-card__container'>
                <h2 className='movies-card__caption'>{card.nameRU}</h2>
                {
                    isMovies ?
                        <button className={`movies-card__like-button ${isLiked && `movies-card__like-button_color_green`}`} type="button" aria-label="Лайк" onClick={handleCardLike} />
                        :
                        <button className="movies-card__delete-button" type="button" aria-label="Удалить" onClick={handleCardDelete} />
                }
                
            </div>
            <p className='movies-card__duration'>{Math.trunc(card.duration/60)+`ч`+(card.duration%60)+`м`}</p>
        </div>
    );
  }
  
export default MoviesCard;