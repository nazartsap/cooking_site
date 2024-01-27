import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import '../styles/Navbar.css'
const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  // Функция для получения значения куки
  const getCookie = (name) => {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(';');
  
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
  
    return null;
  };
  useEffect(() => {
    // Проверяем наличие токена в localStorage
    const token = getCookie('token');
    setIsAuthenticated(!!token); // Устанавливаем значение isAuthenticated в зависимости от наличия токена
  }, []); 
    return (
    <nav className="primary-nav">
      <NavLink to="/" className="nav-link">
      <img  src ='/assets/logo.svg' alt="sorry"/>
      </NavLink>
      <NavLink to="/" className="center-links">
        Главная страница
      </NavLink>
      <NavLink to="/recipe" className="center-links">
        Рецепты
      </NavLink>
      <NavLink to="/create_recipes" className="center-links">
        Создать свои
      </NavLink>
      <NavLink to="/top_recipes" className="center-links">
        Топ-100 рецептов
      </NavLink>
      <li className='primary-nav'>
          {isAuthenticated ? (
            <NavLink to="/profile">
              <img src="/assets/user-profile_icon.svg" alt="Profile" />
            </NavLink>
          ) : (
            <NavLink className="center-links" to="/login">Войти</NavLink>
          )}
        </li>
    </nav>
  );
};
export default Navbar;