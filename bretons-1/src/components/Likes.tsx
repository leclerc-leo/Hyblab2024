import React from 'react';
import { useState } from 'react';
import './Likes.css';

type LikeButtonProps = { 
  isLiked: boolean; 
  onClick: () => void;
};

const LikeButton: React.FC<LikeButtonProps> = ({ isLiked, onClick }) => {
 return (
    <button className="like-button" onClick={onClick}>
      <div className={`heart-icon ${isLiked ? 'liked' : ''}`}></div>
    </button>
  );
};

type LikedArticlesManagerProps = { 
  articleId: string;
};

const LikedArticlesManager: React.FC<LikedArticlesManagerProps> = ({ articleId }) => { 
  const [likedArticles, setLikedArticles] = useState<string[]>([]); 

  const handleLikeClick = () => { 
    if (likedArticles.includes(articleId)) {
      setLikedArticles(likedArticles.filter(id => id !== articleId));
    } else {
      setLikedArticles([...likedArticles, articleId]);
    }
  };

  return (
    <LikeButton
      isLiked={likedArticles.includes(articleId)} 
      onClick={handleLikeClick} 
    />
  );
};

export { LikedArticlesManager, LikeButton }; 
