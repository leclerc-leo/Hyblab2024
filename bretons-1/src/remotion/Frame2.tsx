import React, { useEffect, useState } from 'react';
import './Frame2.css';
import top1Svg from '/img/top1.svg';
import frSvg from '/img/fr.svg';
import top2Svg from '/img/top2.svg';
import allemagneSvg from '/img/allemagne.svg';
import top3Svg from '/img/top3.svg';
import AngleterreSvg from '/img/Angleterre.svg';
import DanemarkSvg from '/img/Danemark.svg';
import Pays_BasSvg from '/img/Pays-Bas.svg';
import usSvg from '/img/USA.svg';
import SuèdeSvg from '/img/Suède.svg';
import { Podium } from '../components/type';

  
  export const Frame2: React.FC<{athlete:string, podium: Podium[] }> = ({ athlete, podium }) => {
    // Fonction pour obtenir le src de l'image du drapeau basé sur le pays
    const [_, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(false);
        setTimeout(function () {
          let div1 = document.querySelector(".rectangleYellowFrame2") as HTMLElement
          div1.classList.add('appear');
        }, 250);
        setTimeout(function () {
          let div2 = document.querySelector(".rectangleBlueFrame2") as HTMLElement
          div2.classList.add('appear');
        }, 500);
        setTimeout(function () {
          let div3 = document.querySelector(".rectangleRedFrame2") as HTMLElement
          div3.classList.add('appear');
        }, 750);
    }, []);
    const getFlagSrc = (pays: string) => {
        switch (pays) {
            case 'France': return frSvg;
            case 'Allemand': return allemagneSvg;
            case 'État-Unis': return usSvg;
            case 'Angleterre': return AngleterreSvg;
            case 'Danemark': return DanemarkSvg;
            case 'Pays-Bas': return Pays_BasSvg;
            case 'Suède': return SuèdeSvg;
            // Ajoutez d'autres pays et leurs drapeaux ici
            default: return ''; // Drapeau par défault
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

    const getScoreLabel = (Score : string) => {
      const isTime = /h|'|''|s/.test(Score);
      return isTime ? "Temps : " : "Score : ";
    };
  
    return (
      <div className="frame2Container">
        <div className="titreFrame2">Elle gagne avec 1 minute d'avance</div>
        {podium.slice(0, 3).map((entry: Podium, index: number) => {
          const rectangleClass = index === 0 ? "rectangleYellowFrame2" : index === 1 ? "rectangleBlueFrame2" : "rectangleRedFrame2";
          const infoFrameClass = index === 0 ? "infoFrame2" : index === 1 ? "infoFrame2_2" : "infoFrame3_2";
          const numberCircleFrameClass = index === 0 ? "numberCircleFrame2" : index === 1 ? "numberCircleFrame_2_2" : "numberCircle_3_Frame2";
          const flagFrameClass = index === 0 ? "flagFrame2" : index === 1 ? "flag_2_Frame2" : "flag_3_Frame2";
          const nameFrameClass = index === 0 ? "nameFrame2" : index === 1 ? "name_2_Frame2" : "name_3_Frame2";
          const timeFrameClass = index === 0 ? "timeFrame2" : index === 1 ? "time_2_Frame2" : "time_3_Frame2";
          const countryFrameClass = index === 0 ? "countryFrame2" : index === 1 ? "country_2_Frame2" : "country_3_Frame2";
          const highlightClass = athlete === entry.Nom ? "highlight" : "";

          return (
              <div key={index} className={`${rectangleClass} ${highlightClass}`}>
              <img src={getPlace(entry.Place)} alt={`Top ${index + 1}`} className={numberCircleFrameClass} />
              <div className={infoFrameClass}>
                <span className={nameFrameClass}>{entry.Nom}</span>
                <span className={timeFrameClass}>{getScoreLabel(entry.Score)}{entry.Score}</span>
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
  