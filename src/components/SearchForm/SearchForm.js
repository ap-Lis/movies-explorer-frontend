import React from 'react';
import './SearchForm.css'

function SearchForm() {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <form name="search-form" className="search-form" onSubmit={handleSubmit} noValidate>
                <input className="search-form__input" type="query" name="query" id="query-input" placeholder="Фильм" required />
                <input className="search-form__submit-button" type="submit" value=""/>
                <div className='search-form__switch-container'>
                    <label className="search-form__switch">
                        <input name="search-checkbox" className="search-form__checkbox" type="checkbox" />
                        <span className="search-form__slider round"></span>
                    </label>
                    <span className="search-form__checkbox-label">Короткометражки</span>
                </div>
            </form>
        </>
    );
  }
  
export default SearchForm;