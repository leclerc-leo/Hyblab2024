import React, { useState } from 'react';
import SaveLogo from '../assets/Save_logo.svg';
import SaveYellow from '../assets/Save_Yellow.svg';

type FavoriteButtonProps = {
  isFavorited: boolean;
  onClick: () => void;
  buttonId: string;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ onClick}) => {
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setButtonClicked(!buttonClicked);
    onClick();
  };

  const buttonStyle = {
    border: 'none',
    padding: 0,
    background:'none',
    cursor: 'pointer',
  };

  return (
    <button onClick={handleButtonClick} style={buttonStyle}>
      <img 
        src={buttonClicked ? SaveYellow : SaveLogo} 
        alt="Save"
      />
    </button>
  );
};

type FavoriteArticlesManagerProps = {
  articleId: string;
};

const FavoriteArticlesManager: React.FC<FavoriteArticlesManagerProps> = ({ articleId }) => {
  const [favoriteArticles, setFavoriteArticles] = useState<string[]>([]);

  const handleFavoriteClick = (id: string) => {
    if (favoriteArticles.includes(id)) {
      setFavoriteArticles(favoriteArticles.filter(favId => favId !== id));
    } else {
      setFavoriteArticles([...favoriteArticles, id]);
    }
  };

  return (
    <FavoriteButton 
      isFavorited={favoriteArticles.includes(articleId)}
      onClick={() => handleFavoriteClick(articleId)}
      buttonId={articleId}
    />
  );
};

export { FavoriteArticlesManager, FavoriteButton };
