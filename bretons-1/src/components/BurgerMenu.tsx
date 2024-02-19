import { useState } from 'react';
import './BurgerMenu.css';
import { useNavigate } from 'react-router-dom';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/')
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
          <div onClick={() => handleLogoClick()}>Accueil </div>
          <a href="MySave">Ma Sélection<img className="LogoFav"src="img/Save_Yellow.svg"/></a>
          <a href="Credits">Crédits</a>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
