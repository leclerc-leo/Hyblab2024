import React from 'react';
import './Frame2.css';

export const Frame2: React.FC = () => {
    return (
        <div className="frameContainer">
            <div className="header">Tableau des temps</div>
            <div className="rectangleRed"></div>
            <div className="rectangleBlue"></div>
            <div className="rectangleYellow"></div>
        </div>
    );
};
