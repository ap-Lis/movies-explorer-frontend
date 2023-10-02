import React from 'react';
import './Profile.css'
import { useNavigate } from 'react-router-dom';

import { useInput } from '../../utils/validator';

function Profile({onLogout}) {
    const navigate = useNavigate();

    const [name, setName] = React.useState('Виталий');
    const [email, setEmail] = React.useState('pochta@yandex.ru');
    const [isEdit, setIsEdit] = React.useState(false);

    const nameCheck = useInput('Виталий', {isEmpty: true, minLength: 2, maxLength: 40 });
    const emailCheck = useInput('pochta@yandex.ru', {isEmpty: true, minLength: 2, maxLength: 40, isEmail: true});

    const handleSubmit = (e) => {
        e.preventDefault();
        toggleEditMode();
    }

    function handleLogout() {
        onLogout();
        navigate("/");
    }

    function handleNameChange(e) {
        nameCheck.onChange(e);
        setName(e.target.value);
    }

    function handleEmailChange(e) {
        emailCheck.onChange(e);
        setEmail(e.target.value);
    }

    function toggleEditMode() {
        setIsEdit(!isEdit);
    }

    function handleNameValidation() {
        return (nameCheck.isEmpty || nameCheck.minLengthError || nameCheck.maxLengthError);
    }

    function handleEmailValidation() {
        return (emailCheck.isEmpty || emailCheck.minLengthError || emailCheck.emailError || emailCheck.maxLengthError);
    }

    function handleButtonValidation() {
        return (handleEmailValidation() || handleNameValidation());
    }

    return (
        <main className="profile">
            <h2 className='profile__caption'>Привет, Виталий!</h2>
            <form name="edit" className="profile__form" onSubmit={handleSubmit} noValidate>
                <label className = "profile__field">Имя
                    <input className={`profile__input ${handleNameValidation() && `profile__input_color_red`}`} type="name" name="name" id="name-input" value={name} onBlur={e => nameCheck.onBlur(e)} onChange={handleNameChange} disabled={!isEdit}/>
                </label>
                <label className = "profile__field">E-mail
                    <input className={`profile__input ${handleEmailValidation() && `profile__input_color_red`}`} type="email" name="email" id="email-input" value={email} onBlur={e => emailCheck.onBlur(e)} onChange={handleEmailChange} disabled={!isEdit}/>
                </label>
                <input className= {`profile__submit-button ${isEdit && `profile__submit-button_type_visible`} ${handleButtonValidation() && `profile__submit-button_type_disabled`}`} type="submit" value="Сохранить" disabled={handleButtonValidation()} />
                <button className={`profile__edit-button ${isEdit && `profile__edit-button_type_hidden`}`} type="button" aria-label="Редактировать" onClick={toggleEditMode}>Редактировать</button>
                <button className={`profile__logout-button ${isEdit && `profile__logout-button_type_hidden`}`} type="button" onClick={handleLogout} aria-label="Выйти">Выйти из аккаунта</button>
            </form>
        </main>
    );
  }
  
export default Profile;