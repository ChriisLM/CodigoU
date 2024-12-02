import { useState } from "react";
import { MoonIcon, SearchIcon, SunIcon } from "../utils/Icons";
import "../assets/css/Header.css";

export function Header() {
  const [themeMode, setThemeMode] = useState(true);

  const handleThemeMode = () => {
    setThemeMode(!themeMode);
  };

  return (
    <header className="header">
      <div className="header__branding">
        <h1 className="header__title">
          Codigo
          <span className="header__title--highlight"> U</span>
        </h1>
      </div>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item item--active">Inicio</li>
          <li className="header__nav-item">Materias</li>
          <li className="header__nav-item">Contacto</li>
        </ul>
      </nav>
      <div className="header__actions">
        <div className="header__search">
          <SearchIcon className="header__search-icon"/>
          <input type="text" className="header__search-input" placeholder="Buscar Proyecto..."/>
        </div>
        <div className="header__theme-toggle">
          {themeMode ? (
            <SunIcon onClick={() => handleThemeMode()} className="header__theme-icon"/>
          ) : (
            <MoonIcon onClick={() => handleThemeMode()} className="header__theme-icon"/>
          )}
        </div>
      </div>
    </header>
  );
}
