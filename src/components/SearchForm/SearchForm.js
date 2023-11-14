import React from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css'
import find from '../../images/search.svg'

function SearchForm({handleSearch, filter, shorts}) {
    const location = useLocation();
    const [input, setInput] = React.useState('');
    const { pathname } = useLocation();
    const [error, setError] = React.useState(false);
  
    React.useEffect(() => {
      const movie = localStorage.getItem('searched');
      if (pathname === '/movies' && movie) { setInput(movie) }
    }, []);
  
    function handleSubmit(evt) {
      evt.preventDefault();
      if (!input) {
        setError(true);
        evt.target.elements['search'].focus();
        return;
      }
      setError(false);
      handleSearch(input);
    }
    
    function handleInput(evt) {
      setInput(evt.target.value);
    }
  

    return (
        <div className="searchForm">
            <div className="search">

                <form className="search__container" onSubmit={handleSubmit} noValidate>
                <div class="search__container-input">
                    <img className="search__find" src={find} alt='лупа'/>
                    <input className="search__input" type="text" name="search" placeholder="Фильм" onChange={handleInput} value={input || ''} required />
                    <button className="search__button" type="button" aria-label="найти"></button>
                </div>        
                        <div className='search__checkbox'>
                          <label className="search__checkbox-container">
                            <input className="search__checkbox-input" type="checkbox" name='checkbox'
                    onChange={filter} checked={shorts}/>
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