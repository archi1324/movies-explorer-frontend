import React from 'react';
import Tumb from '../../images/smalltumb.svg'

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
                    <img className="checkbox__container" src={Tumb}/>
                    <span className='checkbox__text'>Короткометражки</span>
                </div>
            </div>
        </section>
    )
}

export default SearchForm;