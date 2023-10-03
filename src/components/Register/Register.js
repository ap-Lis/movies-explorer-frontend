import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css'

import { useInput } from '../../utils/validator';

import logo from '../../images/icons/logo.svg'

function Register() {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const name = useInput('', {isEmpty: true, minLength: 2, maxLength: 40 });
    const email = useInput('', {isEmpty: true, minLength: 2, maxLength: 40, isEmail: true});
    const password = useInput('', {isEmpty: true, minLength: 2, maxLength: 40});

    function handleNameValidation() {
        return (name.isEmpty || name.minLengthError || name.maxLengthError);
    }

    function handleEmailValidation() {
        return (email.isEmpty || email.minLengthError || email.emailError || email.maxLengthError);
    }

    function handlePasswordValidation() {
        return (password.isEmpty || password.minLengthError || password.maxLengthError );
    }

    function handleButtonValidation() {
        return (handleEmailValidation() || handlePasswordValidation() || handleNameValidation());
    }

    return (
        <main className="register">
            <Link className="register__logo" to="/"><img src={logo} alt = "лого" /></Link>
            <h1 className="register__title">Добро пожаловать!</h1>
            <form name="register" className="register__form" onSubmit={handleSubmit} noValidate>
                <label className = "register__field">Имя
                    <input className={`register__input ${handleNameValidation() ? `register__input_color_red` : ``}`} onChange={e => name.onChange(e)} onBlur={e => name.onBlur(e)} type="text" name="name" id="name-input" placeholder='Ефим Лазаревич Скоробогатько'/>
                </label>
                <label className = "register__field">E-mail
                    <input className={`register__input ${handleEmailValidation() ? `register__input_color_red` : ``}`} onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)} type="email" name="email" id="email-input" placeholder='efim@mail.ru'/>
                </label>
                <label className = "register__field">Пароль
                    <input className={`register__input ${handlePasswordValidation() ? `register__input_color_red` : ``}`} onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)} type="password" name="password" id="password-input" placeholder='**********'/>
                    <span className="register__error" id="register-password-input-error">Что-то пошло не так...</span>
                </label>
                <input className={`register__submit-button ${handleButtonValidation() ? `register__submit-button_type_disabled` : ``}`} type="submit" value="Зарегистрироваться" disabled={handleButtonValidation()}/>
                <p className='register__question'>Уже зарегистрированы? <Link className='register__redirect' to="/signin" >Войти</Link></p>
            </form>
        </main>
    );
  }
  
export default Register;