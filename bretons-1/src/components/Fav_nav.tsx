import React from 'react';

type FavoriteButtonProps = {
  isFavorited: boolean;
  onClick: () => void;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorited, onClick }) => {
  return (
    <button onClick={onClick} style={{ border: 'none', background: 'none', padding: 0 }}>
      {isFavorited ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="33" viewBox="0 0 20 33" fill="none">
          {/* Full */}
          <path d="M2 29.5714V3C2 2.44772 2.44772 2 3 2H17C17.5523 2 18 2.44772 18 3V29.5714C18 30.4644 16.9187 30.9096 16.2899 30.2756L10.7101 24.6488C10.3189 24.2543 9.68113 24.2543 9.28994 24.6488L3.71006 30.2756C3.08131 30.9096 2 30.4644 2 29.5714Z" fill="#545454" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="33" viewBox="0 0 20 33" fill="none">
          {/* Empty */}
          <path d="M2 29.5714V3C2 2.44772 2.44772 2 3 2H17C17.5523 2 18 2.44772 18 3V29.5714C18 30.4644 16.9187 30.9096 16.2899 30.2756L10.7101 24.6488C10.3189 24.2543 9.68113 24.2543 9.28994 24.6488L3.71006 30.2756C3.08131 30.9096 2 30.4644 2 29.5714Z" stroke="#545454" strokeWidth="3"/>
        </svg>
      )}
    </button>
  );
};

export default FavoriteButton;

