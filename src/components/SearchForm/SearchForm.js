import React from 'react';

import './SearchForm.css'
import find from '../../images/search.svg'

function SearchForm() {
    return (
        <div className="searchForm">
            <div className="search">

                <form className="search__container">
                <div class="search__container-input">
                    <img className="search__find" src={find} alt='лупа'/>
                    <input className="search__input" type="text" name="search" placeholder="Фильм" required />
                    <button className="search__button" type="button" aria-label="найти"></button>
                </div>        
                        <div className='search__checkbox'>
                          <label className="search__checkbox-container">
                            <input className="search__checkbox-input" type="checkbox" name='checkbox' defaultChecked />
                            <span className="search__checkbox-slider"></span>
                          </label>
                        <span className='search__checkbox-text'>Короткометражки</span>
                         </div>
                </form>
            </div>
        </div>
    )
}

export default SearchForm;