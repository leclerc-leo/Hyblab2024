import React, { useEffect, useState } from 'react';
import './Frame2.css';
import top1_b_Svg from '/img/top1_b.svg';
import top1_w_Svg from '/img/top1_w.svg';
import frSvg from '/img/fr.svg';
import top2_b_Svg from '/img/top2_b.svg';
import top2_w_Svg from '/img/top2_w.svg';
import allemagneSvg from '/img/allemagne.svg';
import top3_b_Svg from '/img/top3_b.svg';
import top3_w_Svg from '/img/top3_w.svg';
import AngleterreSvg from '/img/Angleterre.svg';
import DanemarkSvg from '/img/Danemark.svg';
import Pays_BasSvg from '/img/Pays-Bas.svg';
import usSvg from '/img/USA.svg';
import SuedeSvg from '/img/Suede.svg';
import { Podium } from '../components/type';

  
  export const Frame2: React.FC<{athlete:string, rang: number,resultat : string,  podium: Podium[] }> = ({ athlete,rang,resultat, podium }) => {
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
            case 'Etat-Unis': return usSvg;
            case 'Angleterre': return AngleterreSvg;
            case 'Danemark': return DanemarkSvg;
            case 'Pays-Bas': return Pays_BasSvg;
            case 'Suede': return SuedeSvg;
            // Ajoutez d'autres pays et leurs drapeaux ici
            default: return ''; // Drapeau par défault
          }
    };

    const getPlace = (Place: string, Nom:string) => {
        if (Nom == athlete){
          switch (Place) {
            case '1': return top1_b_Svg;
            case '2': return top2_b_Svg;
            case '3': return top3_b_Svg;
            default: return '';
          }
        }
        else{
        switch (Place) {
            case '1': return top1_w_Svg;
            case '2': return top2_w_Svg;
            case '3': return top3_w_Svg;
            default: return '';
          }
        }
    };

    const getScoreLabel = (Score : string) => {
      const isTime = /h|'|''|s/.test(Score);
      return isTime ? "Temps : " : "Score : ";
    };

    const getResultatLabel = (resultat: string) => {
      const isTime = /h|'|''|\ds/.test(resultat);
      const isPoints = /point(s)?/.test(resultat);
      if (isTime) {
        return "en " + resultat;
      } else if (isPoints) {
        return "avec " + resultat;
      } else {
        return resultat;
      }
    };

    return (
      <div className="frame2Container">
        <div className="titreFrame2">{athlete} termine {rang}e {getResultatLabel(resultat)}</div>
        {podium.slice(0, 3).map((entry: Podium, index: number) => {
          const rectangleClass = index === 0 ? "rectangleYellowFrame2" : index === 1 ? "rectangleBlueFrame2" : "rectangleRedFrame2";
          const infoFrameClass = index === 0 ? "infoFrame2" : index === 1 ? "infoFrame2_2" : "infoFrame3_2";
          const numberCircleFrameClass = index === 0 ? "numberCircleFrame2" : index === 1 ? "numberCircleFrame_2_2" : "numberCircle_3_Frame2";
          const flagFrameClass = index === 0 ? "flagFrame2" : index === 1 ? "flag_2_Frame2" : "flag_3_Frame2";
          const nameFrameClass = index === 0 ? "nameFrame2" : index === 1 ? "name_2_Frame2" : "name_3_Frame2";
          const timeFrameClass = index === 0 ? "timeFrame2" : index === 1 ? "time_2_Frame2" : "time_3_Frame2";
          const countryFrameClass = index === 0 ? "countryFrame2" : index === 1 ? "country_2_Frame2" : "country_3_Frame2";
          const highlightClass = athlete === entry.Nom ? "highlight_" : "";
          const colorClass = athlete === entry.Nom ? "color_" : "";
          const FlagClass = entry.Pays === "France" ? "adaptflag_" : "";
          return (
              <div key={index} className={`${rectangleClass} ${highlightClass}`}>
                <div className="containerFrame2">
                  <img src={getPlace(entry.Place,entry.Nom)} alt={`Top ${index + 1}`} className={numberCircleFrameClass} />
                  <div className={`${infoFrameClass} ${colorClass}`}>
                    <span className={nameFrameClass}>{entry.Nom}</span>
                    <span className={timeFrameClass}>{getScoreLabel(entry.Score)}{entry.Score}</span>
                    <div className={`flagFrame2 ${FlagClass}`}>
                      <img src={getFlagSrc(entry.Pays)} alt={entry.Pays} className={flagFrameClass} />
                      <span className={countryFrameClass}>{entry.Pays}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  