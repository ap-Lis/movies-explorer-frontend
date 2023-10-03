import React from 'react';
import './TechsCards.css';

function TechsCards({title}) {

    return (
        <li className='techs-card'>
            <p className='techs-card__text'>{title}</p>
        </li>
    );
  }
    
  export default TechsCards;