import React from 'react';
import SaveLogo from '../assets/Save_logo.svg';
import { useState } from 'react';

type FavoriteButtonProps = {
  isFavorited: boolean;
  onClick: () => void;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorited, onClick }) => {
  const buttonStyle = {
    border: 'none',
    background: isFavorited ? 'yellow' : 'none',
    padding: 0,
    cursor: 'pointer',
  };

  return (
    <button onClick={onClick} style={buttonStyle}>
      <img 
        src={SaveLogo} 
        alt="Save"
        style={{ 
          filter: isFavorited ? 'none' : 'grayscale(100%)',
        }}
      />
    </button>
  );
};

type FavoriteArticlesManagerProps = {
  articleId: string;
};

const FavoriteArticlesManager: React.FC<FavoriteArticlesManagerProps> = ({ articleId }) => {
  const [favoriteArticles, setFavoriteArticles] = useState<string[]>([]);

  const handleFavoriteClick = () => {
    if (favoriteArticles.includes(articleId)) {
      setFavoriteArticles(favoriteArticles.filter(id => id !== articleId));
    } else {
      setFavoriteArticles([...favoriteArticles, articleId]);
    }
  };

  return (
    <FavoriteButton 
      isFavorited={favoriteArticles.includes(articleId)}
      onClick={handleFavoriteClick}
    />
  );
};

export { FavoriteArticlesManager, FavoriteButton };


