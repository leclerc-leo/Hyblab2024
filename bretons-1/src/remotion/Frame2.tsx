import React from 'react';
import './Frame2.css';
import top1Svg from '/img/top1.svg';
import frSvg from '/img/fr.svg';
import top2Svg from '/img/top2.svg';
import allemagneSvg from '/img/allemagne.svg';
import top3Svg from '/img/top3.svg';
import usSvg from '/img/us.svg';

export const Frame2: React.FC = () => {
    return (
        <div className="frameContainer">
            <div className="titreFrame2">Elle gagne avec 1 minute d'avance</div>
            <div className="rectangleYellowFrame2">
            <img src={top1Svg} alt="Top 1" className="numberCircleFrame2" />
                <div className="infoFrame2">
                    <span className="nameFrame2">Julie Bresset</span>
                    <span className="timeFrame2">Tps : 1 h 30 min 52 s</span>
                    <div className="flagFrame2">
                        <img src={frSvg} alt="France" className="flagFrame2" />
                        <span className="countryFrame2">France</span>
                    </div>
                </div>
            </div>
            <div className="rectangleBlueFrame2">
            <img src={top2Svg} alt="Top 2" className="numberCircleFrame2" />
                <div className="infoFrame2_2">
                    <span className="nameFrame2">Sabine Splitz</span>
                    <span className="timeFrame2">Tps : 1 h 31 min 54 s</span>
                    <div className="flagFrame2">
                        <img src={allemagneSvg} alt="Allemagne" className="flagFrame2" />
                        <span className="countryFrame2">Allemand</span>
                    </div>
                </div>
            </div>
            <div className="rectangleRedFrame2">
            <img src={top3Svg} alt="Top 3" className="numberCircle_3_Frame2" />
                <div className="infoFrame3_2">
                    <span className="name_3_Frame2">Georgia Gould</span>
                    <span className="time_3_Frame2">Tps : 1 h 32 min 0 s</span>
                    <div className="flag_3_Frame2">
                        <img src={usSvg} alt="US" className="flag_3_Frame2" />
                        <span className="country_3_Frame2">État-Unis</span>
                    </div>
                </div>
            </div>
        </div>
    );
};