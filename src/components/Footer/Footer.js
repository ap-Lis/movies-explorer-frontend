import React from 'react';
import './Footer.css'

function Footer() {

  return (
    <footer className="footer">
        <p className='footer__caption'>
            Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className='footer__content'>
          <p className='footer__text'>
              &copy; {new Date().getFullYear()}
          </p>
          <ul className='footer__links'>
            <li><a className='footer__text' href='https://practicum.yandex.ru/' target='blank'>Яндекс.Практикум</a></li>
            <li><a className='footer__text' href='https://github.com/' target='blank'>Github</a></li>
          </ul>
        </div>
    </footer>
  );
}
  
export default Footer;