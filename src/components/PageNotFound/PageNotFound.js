import { useHistory} from 'react-router-dom';

import './PageNotFound.css';

function PageNotFound() {

const history = useHistory();

function goBack() {
    history.goBack();
  }

    return (
        <main>
        <section className='pageNotFound'>
            <div className='pageNotFound__container'>
                <h1 className='pageNotFound__title'>404</h1>
                <p className='pageNotFound__subtitle'>Страница не найдена</p>
                <p className='pageNotFound__link' onClick={goBack}>Назад</p>
            </div>
        </section>
        </main>
    )
}

export default PageNotFound;
