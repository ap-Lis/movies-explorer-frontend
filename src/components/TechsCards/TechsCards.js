import React from 'react';
import './TechsCards.css';

function TechsCards({title}) {

    return (
        <div className='techs-card'>
            <p className='techs-card__text'>{title}</p>
        </div>
    );
  }
    
  export default TechsCards;