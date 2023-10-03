import './Navigation.css'
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navigation({isOpen, onClose}) {
    const navigate = useNavigate();
    const location = useLocation();

    const isMain = location.pathname === '/';
    const isMovies = location.pathname === '/movies';
    const isSavedMovies = location.pathname === '/saved-movies'

    function handleAccountNavigation() {
        navigate("/profile");
        onClose();
    }

    return (
        <div className={`navigation ${isOpen ? `navigation_is-opened`:``}`}>
            <div className='navigation__menu'>
                <button className="navigation__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
                <div className="navigation__links-container">
                    <Link className={`navigation__link ${isMain ? `navigation__link_type_highlighted`:``}`} to="/" onClick={onClose}>Главная</Link>
                    <Link className={`navigation__link ${isMovies ? `navigation__link_type_highlighted`:``}`} to="/movies" onClick={onClose}>Фильмы</Link>
                    <Link className={`navigation__link ${isSavedMovies ? `navigation__link_type_highlighted`:``}`} to="/saved-movies" onClick={onClose}>Сохраненные фильмы</Link>
                </div>
                <button className="navigation__account-button" type="button" aria-label="Аккаунт" onClick={handleAccountNavigation}>Аккаунт</button>
            </div>
        </div>
    );
  }
  
export default Navigation;