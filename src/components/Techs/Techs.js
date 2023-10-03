import React from 'react';
import './Techs.css';

import Caption from '../Caption/Caption';
import TechsCards from '../TechsCards/TechsCards';

import { techList } from '../../utils/constants';

function Techs() {

    return (
        <section id='techs' className='techs'>
            <Caption text = 'Технологии'/>
            <h3 className='techs__caption'>7 технологий</h3>
            <p className='techs__description'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <ul className='techs__card-list'>
                {techList.map((tech)=> <TechsCards key = {tech} title = {tech} />)}
            </ul>
        </section>
    );
  }
    
  export default Techs;