import React from 'react';
import './PortfolioLink.css';

import arrow from '../../images/icons/arrow.svg';

function PortfolioLink({text, link}) {

    return (
        <li className='portfolio__link-container'> 
            <a className='portfolio__link' href={link} target="blank">
                {text}
                <img className='portfolio__image'src={arrow} alt="стрелочка"/>
            </a>
        </li>
    );
  }
    
  export default PortfolioLink;