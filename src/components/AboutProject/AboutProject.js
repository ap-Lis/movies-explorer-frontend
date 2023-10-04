import './AboutProject.css';

import Caption from '../Caption/Caption'

function AboutProject() {

    return (
        <section id='about-project' className='about-project'>
            <Caption text = 'О проекте'/>
            <div className='about-project__description'>
                <div className='about-project__description-container'>
                    <h3 className='about-project__description-caption'>Дипломный проект включал 5 этапов</h3>
                    <p className='about-project__description-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className='about-project__description-container'>
                    <h3 className='about-project__description-caption'>На выполнение диплома ушло 5 недель</h3>
                    <p className='about-project__description-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className='progress'>
                <div className='progress__backend'>
                    <p className='progress__period progress__period_type_highlighted'>1 неделя</p>
                    <p className='progress__name'>Back-end</p>
                </div>
                <div className='progress__frontend'>
                    <p className='progress__period'>4 недели</p>
                    <p className='progress__name'>Front-end</p>
                </div>
            </div>
        </section>
    );
  }
    
  export default AboutProject;