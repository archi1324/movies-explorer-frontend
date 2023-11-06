import React from 'react';
import { useNavigate } from 'react-router-dom';

import './PageNotFound.css';

function PageNotFound() {

const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	}

    return (
        <section className='pageNotFound'>
            <div className='pageNotFound__container'>
                <h2 className='pageNotFound__title'>404</h2>
                <p className='pageNotFound__subtitle'>Страница не найдена</p>
                <p onClick={goBack} className='pageNotFound__link' onclick="history.back()">Назад</p>
            </div>
        </section>
    )
}

export default PageNotFound;
