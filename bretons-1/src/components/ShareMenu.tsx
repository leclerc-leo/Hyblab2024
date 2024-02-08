import React, { useState } from 'react';
import './ShareMenu.css';

interface ShareButtonProps {
  onShareClick: () => void;
}

const ShareButton: React.FC<ShareButtonProps> = ({ onShareClick }) => (
  <img
    className="ShareLogo"
    src="/bretons-1/img/Share_logo.svg" 
    alt="Share"
    onClick={onShareClick}
  />
);

const ShareMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="burgershare-menu">
      <ShareButton onShareClick={toggleMenu} />
      {isOpen && (
        <div className="menushare">
          <a href="https://twitter.com/intent/tweet?url=https://hyblab.polytech.univ-nantes.fr/bretons-1/&text=Test">Twitter </a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=https://hyblab.polytech.univ-nantes.fr/bretons-1/">Facebook</a>
        </div>
      )}
    </div>
  );
};

export default ShareMenu;
