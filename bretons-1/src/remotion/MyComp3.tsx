import React from 'react';
import './MyComp3.css';

export const MyComp3: React.FC = () => {
    return (
        <div className="frameContainer">
            <div className="header">Tableau des temps</div>
            <div className="rectangleRed"></div>
            <div className="rectangleBlue"></div>
            <div className="rectangleYellow"></div>
        </div>
    );
};
