import React from 'react';
import './Frame2.css';

export const Frame2: React.FC = () => {
    return (
        <div className="frameContainer">
            <div className="titre">Julie Bresset, arrive 1ère avec 1min d’avance !</div>
            <div className="rectangleYellow">
                <div className="info">
                    <span className="name">Julie Bresset</span>
                    <span className="time">Tps : 1 h 30 min 52 s</span>
                    <div className="flag">
                        <svg
                            width="23"
                            height="23"
                            viewBox="0 0 23 23"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="11.3336" cy="11.3336" r="11.3336" fill="#F5F8FB" />
                            <rect x="4.17554" y="5.36853" width="4.64967" height="11.6242" fill="#5F64FA" />
                            <rect x="8.8252" y="5.36853" width="4.64967" height="11.6242" fill="white" />
                            <rect x="13.4749" y="5.36853" width="4.64967" height="11.6242" fill="#FA5F5F" />
                        </svg>
                        <span className="country">France</span>
                    </div>
                </div>
            </div>
            <div className="rectangleBlue"></div>
            <div className="rectangleRed"></div>
        </div>
    );
};