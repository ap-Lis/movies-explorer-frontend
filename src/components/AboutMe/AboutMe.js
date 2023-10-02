import React from 'react';
import './AboutMe.css';

import Caption from '../Caption/Caption';

import photo from '../../images/photo.png'

function AboutMe() {

    return (
        <section id='about-me' className='about-me'>
            <Caption text='Студент' />
            <div className='about-me__info'>
                <div className='about-me__text-info'>
                    <h2 className='about-me__caption'>
                        Виталий
                    </h2>
                    <h3 className='about-me__about'>
                        Фронтенд-разработчик, 30 лет
                    </h3>
                    <p className='about-me__description'>
                        Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                    </p>
                    <a className='about-me__link' href="https://github.com/ap-Lis" target="blank">Github</a>
                </div>
                <div className='about-me__photo-info'>
                    <img className='about-me__photo' src={photo} alt='автопортрет'/>
                </div>
            </div>
        </section>
    );
  }
    
  export default AboutMe;