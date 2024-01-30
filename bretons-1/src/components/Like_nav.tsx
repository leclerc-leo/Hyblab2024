import React, { useState } from 'react';

type LikeButtonProps = {
  isLiked: boolean;
  onClick: () => void;
  buttonId: string;
};

const LikeButton: React.FC<LikeButtonProps> = ({ isLiked, onClick, buttonId }) => {
  const buttonStyle = {
    border: 'none',
    padding: 0,
    background: 'none',
    cursor: 'pointer',
  };
  const imgStyle = {
    width: '44px', 
    height: '33px', 
  };


  return (
    <button id={buttonId} onClick={onClick} style={buttonStyle}>
      <img 
        src={isLiked ? "/bretons-1/img/Red_heart.svg" : "/bretons-1/img/Like_logo.svg"} 
        alt="Like"
        style={imgStyle}
      />
    </button>
  );
};

type LikedItemsManagerProps = {
  itemId: string;
};

const LikedItemsManager: React.FC<LikedItemsManagerProps> = ({ itemId }) => {
  const [likedItems, setLikedItems] = useState<string[]>([]);

  const handleLikeClick = () => {
    if (likedItems.includes(itemId)) {
      setLikedItems(likedItems.filter(likedId => likedId !== itemId));
    } else {
      setLikedItems([...likedItems, itemId]);
    }
  };

  return (
    <LikeButton 
      isLiked={likedItems.includes(itemId)}
      onClick={handleLikeClick}
      buttonId={`like-button-${itemId}`}
    />
  );
};

export { LikedItemsManager, LikeButton };
