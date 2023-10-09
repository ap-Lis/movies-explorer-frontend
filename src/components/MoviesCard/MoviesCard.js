import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css'

function MoviesCard({card, onCardLike, savedMovies, onCardDelete }) {

    const location = useLocation();
    const isMovies = location.pathname === '/movies';

    const isLiked = savedMovies ? savedMovies.some((movie) => movie.movieId === card.movieId) : false;

    const handleCardLike = () => {
        onCardLike(card);
    }

    const handleCardDelete = () => {
        onCardDelete(card);
    }

    return (
        <li className="movies-card">
            <a href={card.trailerLink} target='blank'><img className="movies-card__img" alt={card.nameRU} src={card.image}/></a>
            <div className='movies-card__container'>
                <h2 className='movies-card__caption'>{card.nameRU}</h2>
                {
                    isMovies ?
                        <button className={`movies-card__like-button ${isLiked ? `movies-card__like-button_color_green`:``}`} type="button" aria-label="Лайк" onClick={handleCardLike} />
                        :
                        <button className="movies-card__delete-button" type="button" aria-label="Удалить" onClick={handleCardDelete} />
                }
            </div>
            <p className='movies-card__duration'>{Math.trunc(card.duration/60)+`ч`+(card.duration%60)+`м`}</p>
        </li>
    );
  }
  
export default MoviesCard;