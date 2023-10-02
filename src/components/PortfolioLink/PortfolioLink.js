import React from 'react';
import './PortfolioLink.css';

import arrow from '../../images/icons/arrow.svg';

function PortfolioLink({text, link}) {

    return (
        <a className='portfolio-link__link' href={link} target="blank">
            {text}
            <img className='portfolio-link__image'src={arrow} alt="стрелочка"/>
        </a>
    );
  }
    
  export default PortfolioLink;