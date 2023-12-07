import React from 'react'
import "./Navbar.css";
import { NavLink } from 'react-router-dom';
//para cerrar el menu hamburguesa cuando se haga click en un elemento
const closeMenu = () => {
  const menuCheckbox = document.getElementById('menu');
  if (menuCheckbox.checked) {
    menuCheckbox.checked = false;
  }
}
function Navbar() {
  return (
    <header>
      <div className="logo">
        <img src="/logo.png" alt="weather4kids" />
      </div>
      <nav>
        <input className="hamburguer" type="checkbox" id="menu" />
        <label htmlFor="menu">☰</label>
        <ul>
          <li> <NavLink to="" className="navItems" onClick={closeMenu}>Today</NavLink></li>
          <li> <NavLink to="nextdays" className="navItems" onClick={closeMenu}>Next Days</NavLink></li>
          <li> <NavLink to="cities" className="navItems" onClick={closeMenu}>Other Cities</NavLink></li>
        </ul>
      </nav>

    </header>
  )
}
export default Navbar