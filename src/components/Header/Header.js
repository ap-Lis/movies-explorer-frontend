import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css'

import logo from '../../images/icons/logo.svg'

function Header({isLoggedIn , isWhite, onBurgerClick}) {
  const navigate = useNavigate();
  const location = useLocation();
  const isMovies = location.pathname === '/movies';
  const isSavedMovies = location.pathname === '/saved-movies'

  return (
      <header className={`header ${isWhite ? `header_color_white` : ``}`}>
        <div className="header__container">
        <Link className="header__logo" to="/"><img src={logo} alt = "лого" /></Link>
            { isLoggedIn ?
              <>
                  <nav className="header__links-container">
                      <Link className={`header__link ${isWhite ? `header__link_color_black` : ``} ${isMovies ? `header__link_type_highlighted` : ``}`} to="/movies">Фильмы</Link>
                      <Link className={`header__link ${isWhite ? `header__link_color_black`: ``} ${isSavedMovies ? `header__link_type_highlighted` : ``}`} to="/saved-movies">Сохраненные фильмы</Link>
                  </nav>
                  <button className="header__account-button" type="button" aria-label="Аккаунт" onClick={() => navigate("/profile")}>Аккаунт</button>
                  <button className={`header__burger-button ${isWhite ? `header__burger-button_color_black`: ``}`} type="button" aria-label="Меню" onClick={onBurgerClick}></button>
              </>
              :
              <>
                <nav className="header__links-container header__links-container_type_right">
                  <Link className='header__auth-link' to="/signup">Регистрация</Link>
                  <Link className='header__auth-link header__auth-link_type_highlighted' to="/signin">Войти</Link>
                </nav>
              </>
            }
        </div>
      </header>
  );
}
  
export default Header;