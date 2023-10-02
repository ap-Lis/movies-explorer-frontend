import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'

import { useInput } from '../../utils/validator';

import logo from '../../images/icons/logo.svg'

function Login({onLogin}) {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        onLogin();
        e.preventDefault();
        navigate("/");
    }

    const email = useInput('', {isEmpty: true, minLength: 2, maxLength: 40, isEmail: true});
    const password = useInput('', {isEmpty: true, minLength: 2, maxLength: 40});

    function handleEmailValidation() {
        return (email.isEmpty || email.minLengthError || email.emailError || email.maxLengthError);
    }

    function handlePasswordValidation() {
        return (password.isEmpty || password.minLengthError || password.maxLengthError );
    }

    function handleButtonValidation() {
        return (handleEmailValidation() || handlePasswordValidation());
    }

    return (
        <main className="login">
            <Link className="login__logo" to="/"><img src={logo} alt = "лого" /></Link>
            <h2 className="login__title">Рады видеть!</h2>
            <form name="login" className="login__form" onSubmit={handleSubmit} noValidate>
                <label className = "login__field">E-mail
                    <input className={`login__input ${handleEmailValidation() && `login__input_color_red`}`} value={email.value} onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)} type="email" name="email" id="email-input" />
                </label>
                <label className = "login__field">Пароль
                    <input className={`login__input ${handlePasswordValidation() && `login__input_color_red`}`} value={password.value} onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)} type="password" name="password" id="password-input"/>
                    <span className="login__error" id="login-password-input-error">Что-то пошло не так...</span>
                </label>
                <input className={`login__submit-button ${handleButtonValidation() && `login__submit-button_type_disabled`}`} type="submit" value="Войти" disabled={email.inputValid}/>
                <p className='login__question'>Ещё не зарегистрированы? <Link className='login__redirect' to="/signup">Регистрация</Link></p>
            </form>
        </main>
    );
  }
  
export default Login;