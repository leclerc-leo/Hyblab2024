import React from 'react';
import './Frame2.css';
import top1Svg from '/img/top1.svg';
import frSvg from '/img/fr.svg';
import top2Svg from '/img/top2.svg';
import allemagneSvg from '/img/allemagne.svg';
import top3Svg from '/img/top3.svg';
import usSvg from '/img/us.svg';
import { Podium } from '../components/type';

  
  export const Frame2: React.FC<{ podium: Podium[] }> = ({ podium }) => {
    // Fonction pour obtenir le src de l'image du drapeau basé sur le pays
    const getFlagSrc = (pays: string) => {
        switch (pays) {
            case 'France': return frSvg;
            case 'Allemand': return allemagneSvg;
            case 'État-Unis': return usSvg;
            // Ajoutez d'autres pays et leurs drapeaux ici
            default: return ''; // Image de drapeau par défaut ou gestion des cas non trouvés
          }
    };

    const getPlace = (Place: string) => {
        switch (Place) {
            case '1': return top1Svg;
            case '2': return top2Svg;
            case '3': return top3Svg;
            default: return '';
          }
    };
  
    return (
      <div className="frame2Container">
        <div className="titreFrame2">Elle gagne avec 1 minute d'avance</div>
        {podium.slice(0, 3).map((entry: Podium, index: number) => {
          const rectangleClass = index === 0 ? "rectangleYellowFrame2" : index === 1 ? "rectangleBlueFrame2" : "rectangleRedFrame2";
          const infoFrameClass = index === 0 ? "infoFrame2" : index === 1 ? "infoFrame2_2" : "infoFrame3_2";
          const numberCircleFrameClass = index === 2 ? "numberCircle_3_Frame2" : "numberCircleFrame2";
          const flagFrameClass = index === 2 ? "flag_3_Frame2" : "flagFrame2";
          const nameFrameClass = index === 2 ? "name_3_Frame2" : "nameFrame2";
          const timeFrameClass = index === 2 ? "time_3_Frame2" : "timeFrame2";
          const countryFrameClass = index === 2 ? "country_3_Frame2" : "countryFrame2";
  
          return (
            <div key={index} className={rectangleClass}>
              <img src={getPlace(entry.Place)} alt={`Top ${index + 1}`} className={numberCircleFrameClass} />
              <div className={infoFrameClass}>
                <span className={nameFrameClass}>{entry.Nom}</span>
                <span className={timeFrameClass}>Tps : {entry.Score}</span>
                <div className={flagFrameClass}>
                  <img src={getFlagSrc(entry.Pays)} alt={entry.Pays} className={flagFrameClass} />
                  <span className={countryFrameClass}>{entry.Pays}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  