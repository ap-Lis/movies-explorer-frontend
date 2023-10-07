import React from 'react';
import './SearchForm.css'

function SearchForm() {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <section className='search' aria-label='поиск'>
            <form name="search-form" className="search-form" onSubmit={handleSubmit} noValidate>
                <input className={`search-form__input`} type="text" name="query" id="query-input" placeholder="Фильм" />
                <input className={`search-form__submit-button`} type="submit" value="" />
                <div className='search-form__switch-container'>
                    <label className="search-form__switch">
                        <input name="search-checkbox" className="search-form__checkbox" type="checkbox" />
                        <span className="search-form__slider round"></span>
                    </label>
                    <span className="search-form__checkbox-label">Короткометражки</span>
                </div>
            </form>
        </section>
    );
  }
  
export default SearchForm;