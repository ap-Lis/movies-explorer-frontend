import React from 'react';
import './Portfolio.css';

import PortfolioLink from '../PortfolioLink/PortfolioLink';

import { portfolioLinks } from '../../utils/constants';

function Portfolio() {

    return (
        <section className='portfolio'>
            <h3 className='portfolio__caption'>Портфолио</h3>
            <ul className='portfolio__links'>
                {portfolioLinks.map((item) => <PortfolioLink key = {item.id} text = {item.text} link={item.link} />)}
            </ul>
        </section>
    );
  }
    
  export default Portfolio;