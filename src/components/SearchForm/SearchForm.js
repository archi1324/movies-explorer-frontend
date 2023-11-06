import React from 'react';

import './SearchForm.css'
import find from '../../images/search.svg'

function SearchForm() {
    return (
        <section className="searchForm">
            <div className="search">

                <form className="search__container">
                    <img className="search__find" src={find} alt='лупа'/>
                    <input className="search__input" type="text" name="search" placeholder="Фильм" required />
                    <button className="search__button" type="button" aria-label="найти"></button>
                </form>
                < div className='search__checkbox'>
                    <label className="checkbox__container">
                        <input type="checkbox" name='checkbox' defaultChecked />
                        <span className="checkbox__slider"></span>
                    </label>
                    <span className='checkbox__text'>Короткометражки</span>
                </div>
            </div>
        </section>
    )
}

export default SearchForm;