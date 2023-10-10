import React from 'react';
import './Movies.css'

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useCallback } from 'react';

function Movies({cards, savedMovies, searchQuery, setSearchQuery, searchInput, setSearchInput, isShort, setIsShort, onCardLike, isLoading, width }) {

    const [length, setLength] = React.useState(0);

    const handleActiveButton = () => {
        if (cards) {
            return length >= cards.length
        } else {
            return true;
        };
    }

    const handleCardsSlice = () => {
        if (width.width <= 768) {
            setLength(length + 2);
        } else {
            setLength(length + 4);
        }
    }

    React.useEffect(()=>{
        if(width.width >= 1280) {
            setLength(16);
        } else if (width.width >= 320 && width.width < 1280) {
            setLength(8);
        } else {
            setLength(5);
        }
        
    }, [searchQuery, isShort, width.width])


    const handleSubmit = useCallback((inputValue) => {
        setSearchQuery(inputValue)
    }, [setSearchQuery]);

    return (
        <main className="movies">
            <SearchForm onSubmit={handleSubmit} searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchInput={searchInput} setSearchInput={setSearchInput} isShort={isShort} setIsShort={setIsShort} length={length}/>
            {cards ? (
                cards.length === 0 ?
                <span className='movies__error'>Ничего не найдено.</span>
                :
                <MoviesCardList cards={cards.slice(0, length)} onCardLike={onCardLike} savedMovies={savedMovies} isLoading={isLoading}/>
            )
                :
                <span className='movies__error'>Воспользуйтесь поисковой строкой выше.</span>
            }
            <button className={`movies__more-button ${handleActiveButton() ? `movies__more-button_disabled`:``}`} type="button" aria-label="Ещё" onClick={handleCardsSlice}>Ещё</button>
        </main>
    );
  }
  
export default Movies;