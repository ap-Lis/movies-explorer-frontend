import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css'

import { useFormWithValidation } from '../../utils/validator'

import logo from '../../images/icons/logo.svg'

function Login({onLogin, onError, setOnError}) {

    const {values, handleChange, errors, isValid} = useFormWithValidation();

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(values);
    }

    React.useEffect(()=>{setOnError('')},[setOnError])

    return (
        <main className="login">
            <Link className="login__logo" to="/"><img src={logo} alt = "лого" /></Link>
            <h1 className="login__title">Рады видеть!</h1>
            <form name="login" className="login__form" onSubmit={handleSubmit}>
                <label className = "login__field">E-mail
                    <input className={`login__input`} value={values.email || ''} onChange={handleChange} type="email" name="email" minLength="2" maxLength="30" id="email-input" placeholder='petk@mail.ru' required pattern="([A-Za-z0-9][._]?)+[A-Za-z0-9]@[A-Za-z0-9]+(\.?[A-Za-z0-9])+([A-Za-z0-9])?"/>
                    <span className="login__error">{errors.email}</span>
                </label>
                <label className = "login__field">Пароль
                    <input className={`login__input`} value={values.password || ''} onChange={handleChange} type="password" name="password" id="password-input" placeholder='**********' required minLength="2" maxLength="30"/>
                    <span className="login__error">{errors.password}</span>
                </label>
                <span className="login__error login__error_type_server">{onError}</span>
                <input className='login__submit-button' type="submit" value="Войти" disabled={!isValid}/>
                <p className='login__question'>Ещё не зарегистрированы? <Link className='login__redirect' to="/signup">Регистрация</Link></p>
            </form>
        </main>
    );
  }
  
export default Login;