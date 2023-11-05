import React from 'react';
import './AboutProject.css';

function AboutProject() {
    return (
        <section className='aboutProject'>
            <h2 className='aboutProject__tittle'>О проекте</h2>
            <div className='aboutProject__line'></div>

            <ul className='aboutProject__components'>
                <li className='aboutProject__component'>
                    <h3 className='aboutProject__tittle'>Дипломный проект включал 5 этапов</h3>
                    <p className='aboutProject__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </li>
                <li className='aboutProject__component'>
                    <h3 className='aboutProject__tittle'>На выполнение диплома ушло 5 недель</h3>
                    <p className='aboutProject__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </li>
            </ul>

            <ul className='aboutProject__week'>
                <li className='aboutProject__week_component'>
                    <div className='aboutProject__week_backend'>1 неделя</div>
                    <p className='aboutProject__week_text'>Back-end</p>
                </li>
                <li className='aboutProject__week_component'>
                    <div className='aboutProject__week_frontend'>4 недели</div>
                    <p className='aboutProject__week_text'>Front-end</p>
                </li>
            </ul>
        </section>)
}

export default AboutProject;