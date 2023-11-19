import React from 'react';
import './Techs.css';

function Techs() {
    return (
        <section className='techs'>
            <h2 className='techs__section-tittle'>Технологии</h2>
            <div className='techs__section-line'></div>

            <h3 className='techs__tittle'>7 технологий</h3>
            <p className='techs__subtittle'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>

            <ul className='techs__components'>
                <li className='techs__component'>
                    <p className='techs__description'>HTML</p>
                </li>
                <li className='techs__component'>
                    <p className='techs__description'>CSS</p>
                </li>
                <li className='techs__component'>
                    <p className='techs__description'>JS</p>
                </li>
                <li className='techs__component'>
                    <p className='techs__description'>React</p>
                </li>
                <li className='techs__component'>
                    <p className='techs__description'>Git</p>
                </li>
                <li className='techs__component'>
                    <p className='techs__description'>Express.js</p>
                </li>
                <li className='techs__component'>
                    <p className='techs__description'>mongoDB</p>
                </li>
            </ul>
        </section>)

}

export default Techs;
