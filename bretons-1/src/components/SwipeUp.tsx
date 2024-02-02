import React, { useState, MouseEvent, SyntheticEvent   } from 'react';
import './SwipeUp.css';

interface SwipeUpProps {
    onSwipeUp: (event: SyntheticEvent<HTMLDivElement, MouseEvent | TouchEvent>) => void;
}

const SwipeUp: React.FC<SwipeUpProps> = ({ onSwipeUp }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [startFadeOut, setStartFadeOut] = useState(false);

  const handleTouchStart = (event: SyntheticEvent<HTMLDivElement, MouseEvent | TouchEvent>) => {
    setShowMessage(true);
    setStartFadeOut(true);
    onSwipeUp(event);
  };
  return (
    <div className="swipe-up-container" onTouchStart={handleTouchStart}>
      <div className={`swipe-up-message ${showMessage ? 'visible' : ''} ${startFadeOut ? 'fade-out' : ''}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="16" viewBox="0 0 25 16" fill="none">
            <path d="M2 2L12.5 13L23 2" stroke="white" strokeWidth="3"/>
        </svg>
      </div>
    </div>
  );
};

export default SwipeUp;
