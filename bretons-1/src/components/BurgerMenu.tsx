import { useState } from 'react';
import './BurgerMenu.css';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="burger-menu">
      <div className={`burger-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {isOpen && (
        <div className="menu">
          <a href="/bretons-1">Accueil </a>
          <a href="/bretons-1/MySave">Ma Sélection<img className="LogoFav"src="/bretons-1/img/Save_Yellow.svg"/></a>
          <a href="/bretons-1/Credits">Crédits</a>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
