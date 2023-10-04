import React from 'react';
import './SearchForm.css'

import { useInput } from '../../utils/validator';

function SearchForm() {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const search = useInput('', {isEmpty: true, minLength: 3, maxLength: 80});

    function handleSearchValidation() {
        return (search.isEmpty || search.minLengthError || search.maxLengthError);
    }

    return (
        <section className='search' aria-label='поиск'>
            <form name="search-form" className="search-form" onSubmit={handleSubmit} noValidate>
                <input className={`search-form__input ${handleSearchValidation() ? `search-form__input_color_red` : ``}`} type="text" name="query" id="query-input" placeholder="Фильм" onChange={e => search.onChange(e)} onBlur={e => search.onBlur(e)} />
                <input className={`search-form__submit-button ${handleSearchValidation() ? `search-form__submit-button_type_disabled` : ``}`} type="submit" value="" disabled={handleSearchValidation()}/>
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