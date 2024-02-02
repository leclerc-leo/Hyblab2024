import React from 'react';
import { useState } from 'react';
import './Likes.css';

type LikeButtonProps = { 
  isLiked: boolean; 
  onClick: () => void;
  buttonId: string;
  className?: string;//for using different style
};

const LikeButton: React.FC<LikeButtonProps> = ({ isLiked, onClick, buttonId }) => {
 return (
    <button id={buttonId} className={'like-button ${className}'} onClick={onClick}>
      {/* according the status of isLiked to change the classname */}
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
      buttonId={articleId}
    />
  );
};

export { LikedArticlesManager, LikeButton }; 
