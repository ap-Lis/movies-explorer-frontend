import React, { useCallback } from 'react';
import './SavedMovies.css'

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({cards, onCardLike, onCardDelete, searchQuery, setSearchQuery, searchInput, setSearchInput, isShort, setIsShort, length}) {

    const handleSubmit = useCallback((inputValue) => {
        setSearchQuery(inputValue)
    }, [setSearchQuery]);

    return (
        <main className="saved-movies">
            <SearchForm onSubmit={handleSubmit} searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchInput={searchInput} setSearchInput={setSearchInput} isShort={isShort} setIsShort={setIsShort} length={length}/>
            {cards.length !== 0 ?
                <MoviesCardList cards={cards} onCardLike={onCardLike} onCardDelete={onCardDelete} />
                : 
                <span className='saved-movies__error'>Нет сохранённых фильмов.</span>
            }
        </main>
    );
  }
  
export default SavedMovies;