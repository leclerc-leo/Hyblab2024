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

interface ShareMenuProps {
  id: string;
  title: string;
}

const ShareMenu: React.FC<ShareMenuProps> = ({ id, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const shareText = `Vibrez avec ${title} aux JO ! 🏅🔥 #JO2024 #BretagneFière`;
  const encodedShareText = encodeURIComponent(shareText);
  const videoPlayerUrl = `https://hyblab.polytech.univ-nantes.fr/bretons-1/VideoPlayer/${id}`;
  const twitterShareLink = `https://twitter.com/intent/tweet?url=${videoPlayerUrl}&text=${encodedShareText}`;
  const facebookShareLink = `https://www.facebook.com/sharer/sharer.php?u=${videoPlayerUrl}`;

  return (
    <div className="burgershare-menu">
      <ShareButton onShareClick={toggleMenu} />
      {isOpen && (
        <div className="menushare">
          <a href={twitterShareLink} target="_blank" rel="noopener noreferrer">X(Twitter)</a>
          <a href={facebookShareLink} target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>
      )}
    </div>
  );
};

export default ShareMenu;
