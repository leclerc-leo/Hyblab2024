import React from 'react';
import './Frame2.css';

export const Frame2: React.FC = () => {
    return (
        <div className="frameContainer">
            <div className="titre">Julie Bresset, arrive 1ère avec 1min d’avance !</div>
            <div className="rectangleYellow">
                <svg
                    width="76"
                    height="76"
                    viewBox="0 0 76 76"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="leftSVG"
                >
                    <path d="M37.6408 75.2815C58.4292 75.2815 75.2815 58.4292 75.2815 37.6408C75.2815 16.8524 58.4292 0 37.6408 0C16.8524 0 0 16.8524 0 37.6408C0 58.4292 16.8524 75.2815 37.6408 75.2815Z" fill="#25283D"/>
                    <path d="M37.6409 67.6505C54.215 67.6505 67.6509 54.2146 67.6509 37.6405C67.6509 21.0665 54.215 7.63056 37.6409 7.63056C21.0669 7.63056 7.63098 21.0665 7.63098 37.6405C7.63098 54.2146 21.0669 67.6505 37.6409 67.6505Z" fill="#FACD5F"/>
                    <path d="M27.4005 54.0508V48.9183H35.5434V25.7729L27.4005 31.5469V25.4274L35.7408 19.5053H41.4655V48.9183H48.1278V54.0508H27.4005Z" fill="#25283D"/>
                </svg>
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