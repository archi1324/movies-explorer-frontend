import { useHistory} from 'react-router-dom';

import './PageNotFound.css';

function PageNotFound() {

const history = useHistory();
	const goBack = () => {
		history(-1);
	}

    return (
        <main>
        <section className='pageNotFound'>
            <div className='pageNotFound__container'>
                <h1 className='pageNotFound__title'>404</h1>
                <p className='pageNotFound__subtitle'>Страница не найдена</p>
                <p onClick={goBack} className='pageNotFound__link' onclick="history.back()">Назад</p>
            </div>
        </section>
        </main>
    )
}

export default PageNotFound;
