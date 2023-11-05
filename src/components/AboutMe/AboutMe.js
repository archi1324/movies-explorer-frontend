import React from 'react';
import './AboutMe.css';

import photo from '../../images/my photo.jpeg';

function AboutMe(props) {
    return (
        <section className='aboutMe'>
            <h2 className='aboutMe__tittle'>Студент</h2>
            <div className='aboutMe__line'></div>
            <div className='aboutMe__components'>
                <div className='aboutMe__info'>
                    <h3 className='aboutMe__name'>Артур</h3>
                    <p className='aboutMe__description'>Фронтенд-разработчик, 23 года</p>
                    <p className='aboutMe__text'>Я родился и живу в Уфе, закончил факультет информатики и робототехники 
                    УГАТУ.Я люблю слушать музыку, кататься на сноуборде а ещё увлекаюсь плаванием. 
                    После того, как пройду курс по веб-разработке, планирую и дальше развиваться в этой сфере</p>
                    <a className='aboutMe__git' href='https://github.com/archi1324' rel="noreferrer" >Github</a>
                </div>
                <img className='aboutMe__photo' src={photo} alt='Фотографиz vtyz' />
            </div>
        </section>)
}

export default AboutMe;