import {NavLink} from "react-router-dom";
import React from "react";

export default function MenuHeader() {
  const getClassName = isActive => {
    return isActive ? `nav-link active` : 'nav-link'
  };

  return (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink
          className={({isActive}) => getClassName(isActive)}
          to="/"
        >Главная</NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className={({isActive}) => getClassName(isActive)}
          to="/catalog.html"
          end
        >Каталог</NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className={({isActive}) => getClassName(isActive)}
          to="/about.html"
        >О магазине</NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className={({isActive}) => getClassName(isActive)}
          to="/contacts.html"
        >Контакты</NavLink>
      </li>
    </ul>
  );
}