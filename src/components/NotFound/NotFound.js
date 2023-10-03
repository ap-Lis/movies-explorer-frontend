import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css'

function NotFound() {
    const navigate = useNavigate();

    return (
        <main className="not-found">
            <h1 className='not-found__caption'>404</h1>
            <p className='not-found__text'>Страница не найдена</p>
            <button type="button" className='not-found__return' onClick={() => navigate(-1)}>Назад</button>
        </main>
    );
  }
  
export default NotFound;