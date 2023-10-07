import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css'

import { useFormWithValidation } from '../../utils/validator';

import logo from '../../images/icons/logo.svg'

function Register({onRegister, onError}) {

    const {values, handleChange, errors, isValid} = useFormWithValidation();

    const handleSubmit = (e) => {
        onRegister(values);
        e.preventDefault();
    }

    return (
        <main className="register">
            <Link className="register__logo" to="/"><img src={logo} alt = "лого" /></Link>
            <h1 className="register__title">Добро пожаловать!</h1>
            <form name="register" className="register__form" onSubmit={handleSubmit}>
                <label className = "register__field">Имя
                    <input className='register__input' onChange={handleChange} type="text" name="name" id="name-input" placeholder='Ефим Лазаревич Скоробогатько' value={values.name || ''} required minLength="2" maxLength="30"/>
                    <span className="register__error">{errors.name}</span>
                </label>
                <label className = "register__field">E-mail
                    <input className='register__input' onChange={handleChange} type="email" name="email" id="email-input" placeholder='efim@mail.ru' value={values.email || ''} required pattern="([A-Za-z0-9][._]?)+[A-Za-z0-9]@[A-Za-z0-9]+(\.?[A-Za-z0-9])+([A-Za-z0-9]{2,4})?" minLength="2" maxLength="30"/>
                    <span className="register__error">{errors.email}</span>
                </label>
                <label className = "register__field">Пароль
                    <input className='register__input' onChange={handleChange} type="password" name="password" id="password-input" placeholder='**********' value={values.password || ''} required minLength="2" maxLength="30"/>
                    <span className="register__error">{errors.password}</span>
                </label>
                <span className="register__error register__error_type_server">{onError}</span>
                <input className='register__submit-button' type="submit" value="Зарегистрироваться" disabled={!isValid}/>
                <p className='register__question'>Уже зарегистрированы? <Link className='register__redirect' to="/signin" >Войти</Link></p>
            </form>
        </main>
    );
  }
  
export default Register;