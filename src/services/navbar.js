import React from "react";
import { NavLink } from "react-router-dom";
import '../styles/Navbar.css'
const Navbar = () => {
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
      <NavLink to="/" className="center-links">
        Создать свои
      </NavLink>
      <NavLink to="/help" className="center-links">
        Топ-100 рецептов
      </NavLink>
      <NavLink to="/profile">
        <img  src ='/assets/user-profile_icon.svg' alt="sorry"/>
      </NavLink>
    </nav>
  );
};
export default Navbar;