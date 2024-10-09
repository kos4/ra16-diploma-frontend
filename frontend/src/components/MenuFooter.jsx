import React from "react";
import {Link} from "react-router-dom";

export default function MenuFooter() {
  return (
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link className="nav-link" to="/about.html">О магазине</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/catalog.html">Каталог</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/contacts.html">Контакты</Link>
      </li>
    </ul>
  );
}