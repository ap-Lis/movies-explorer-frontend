import React from 'react';
import './NavTab.css';
import { HashLink } from 'react-router-hash-link';

function NavTab() {

    return (
        <section className='navtab' aria-label="навигация">
            <nav>
                <ul className="navtab__links">
                    <li><HashLink smooth className='navtab__link' to="#about-project">О проекте</HashLink></li>
                    <li><HashLink smooth className='navtab__link' to="#techs">Технологии</HashLink></li>
                    <li><HashLink smooth className='navtab__link' to="#about-me">Студент</HashLink></li>
                </ul>
            </nav>
        </section>
    );
  }
    
  export default NavTab;