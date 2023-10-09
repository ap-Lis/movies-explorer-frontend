import React from 'react';
import './SearchForm.css'

function SearchForm({onSubmit, searchInput, setSearchInput, setIsShort, isShort }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(searchInput);
    }

    const handleTextChange = (e) => {
        setSearchInput(e.target.value);
    }

    const handleCheckChange = (e) => {
        setIsShort(!isShort);
    }

    const handleButtonCheck = () => {
       return searchInput.length === 0;
    }

    return (
        <section className='search' aria-label='поиск'>
            <form name="search-form" className="search-form" onSubmit={handleSubmit} >
                <input className='search-form__input' type="text" name="query" id="query-input" placeholder="Фильм" value={searchInput} onChange={handleTextChange} required/>
                <input className= 'search-form__submit-button' type="submit" value="" disabled={handleButtonCheck()}/>
                <div className='search-form__switch-container'>
                    <label className="search-form__switch">
                        <input name="search-checkbox" className="search-form__checkbox" type="checkbox" checked={isShort} onChange={handleCheckChange} />
                        <span className="search-form__slider round"></span>
                    </label>
                    <span className="search-form__checkbox-label">Короткометражки</span>
                </div>
            </form>
        </section>
    );
  }
  
export default SearchForm;