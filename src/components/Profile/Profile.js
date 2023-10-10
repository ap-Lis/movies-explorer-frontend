import React from 'react';
import './Profile.css'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import {useFormWithValidation} from '../../utils/validator';

function Profile({onLogout, onUpdateUser, message, setMessage, isEdit, onEdit, isGreeting }) {
    const currentUser = React.useContext(CurrentUserContext);
    const {values, handleChange, errors, isValid, setValues} = useFormWithValidation();

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser({
              name: values.name,
              email: values.email,
        });
    }

    function handleLogout() {
        onLogout();
    }

    React.useEffect(()=>{setMessage('')},[setMessage])

    function handleOriginValues() {
        return (currentUser.name === values.name && currentUser.email === values.email)
    }

    React.useEffect(() => {
        setValues(currentUser);
    }, [currentUser, setValues]);

    return (
        <main>
            <section className="profile">
                <h1 className='profile__caption'>Привет, {currentUser.name}!</h1>
                <form name="edit" className="profile__form" onSubmit={handleSubmit}>
                    <label className = "profile__field">Имя
                        <input className='profile__input' type="text" name="name" id="name-input" value={values.name || ''} disabled={!isEdit} placeholder='Терентий' onChange={handleChange} onBlur={handleOriginValues} required minLength="2" maxLength="30"/>
                        <span className="profile__error" >{errors.name}</span>
                    </label>
                    <label className = "profile__field">E-mail
                        <input className='profile__input' type="email" name="email" id="email-input" value={values.email || ''} disabled={!isEdit} placeholder='tereha@mail.ru' onChange={handleChange} required pattern="^.+@.+\..+$" minLength="2" maxLength="30"/>
                        <span className="profile__error" >{errors.email}</span>
                    </label>
                    <span className={`profile__error profile__error_type_server ${isGreeting ? `profile__error_type_greeting`:``}`}>{message}</span>
                    <input className= {`profile__submit-button ${isEdit ? `profile__submit-button_type_visible` : ``}`} type="submit" value="Сохранить" disabled={handleOriginValues() || !isValid}/>
                    <button className={`profile__edit-button ${isEdit ? `profile__edit-button_type_hidden` : ``}`} type="button" aria-label="Редактировать" onClick={onEdit}>Редактировать</button>
                    <button className={`profile__logout-button ${isEdit ? `profile__logout-button_type_hidden` : ``}`} type="button" onClick={handleLogout} aria-label="Выйти">Выйти из аккаунта</button>
                </form>
            </section>
        </main>
    );
  }
  
export default Profile;