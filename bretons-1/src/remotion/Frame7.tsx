import React, { useEffect, useState } from 'react';
import './Frame7.css';
import frSvg from '/img/fr.svg';
import allemagneSvg from '/img/allemagne.svg';
import AngleterreSvg from '/img/Angleterre.svg';
import DanemarkSvg from '/img/Danemark.svg';
import Pays_BasSvg from '/img/Pays-Bas.svg';
import usSvg from '/img/us.svg';
import SuèdeSvg from '/img/Suède.svg';
import { Podium } from '../components/type';


export const Frame7: React.FC<{ athlete: string, podium: Podium[] }> = ({ athlete, podium }) => {
    // Fonction pour obtenir le src de l'image du drapeau basé sur le pays
    const [_, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(false);
        setTimeout(function () {
            let div1 = document.querySelector(".rectangle1Frame7") as HTMLElement
            div1.classList.add('appear');
        }, 250);
        setTimeout(function () {
            let div2 = document.querySelector(".rectangle2Frame7") as HTMLElement
            div2.classList.add('appear');
        }, 500);
        setTimeout(function () {
            let div3 = document.querySelector(".rectangle3Frame7") as HTMLElement
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
            default: return '';
        }
    };


    const getScoreLabel = (Score: string) => {
        const isTime = /h|'|''|s/.test(Score);
        return isTime ? "Temps : " : "Score : ";
    };

    return (
        <div className="frame7Container">
            <div className="titreFrame7">Elle gagne avec 1 minute d'avance</div>
            <div className='GroupeRectangle'>
                {podium.slice(0, 4).map((entry: Podium, index: number) => {
                    const rectangleClass = index === 0 ? "rectangle1Frame7" : index === 1 ? "rectangle2Frame7" :  index === 2 ?"rectangle3Frame7" : "rectangle4Frame7" ;
                    const infoFrameClass = index === 0 ? "infoFrame7" : index === 1 ? "infoFrame7_2" : index === 2 ? "infoFrame3_7" : "infoFrame4_7";
                    const flagFrameClass = index === 0 ? "flagFrame7" : index === 1 ? "flag_2_Frame7" : index === 2 ? "flag_3_Frame7" : "flag_4_Frame7";
                    const nameFrameClass = index === 0 ? "nameFrame7" : index === 1 ? "name_2_Frame7" : index === 2 ? "name_3_Frame7" : "name_4_Frame7";
                    const timeFrameClass = index === 0 ? "timeFrame7" : index === 1 ? "time_2_Frame7" : index === 2 ? "time_3_Frame7": "time_4_Frame7";
                    const countryFrameClass = index === 0 ? "countryFrame7" : index === 1 ? "country_2_Frame7" : index === 2 ? "country_3_Frame7" : "country_4_Frame7";
                    const highlightClass = athlete === entry.Nom ? "highlight" : "";

                    return (
                        <div key={index} className={`${rectangleClass} ${highlightClass}`}>
                            <div className={infoFrameClass}>
                                <span className={nameFrameClass}>{entry.Nom}</span>
                                <div className='middletext'>
                                    <span className={timeFrameClass}>{getScoreLabel(entry.Score)}{entry.Score}</span>
                                    <div className={flagFrameClass}>
                                        <img src={getFlagSrc(entry.Pays)} alt={entry.Pays} className={flagFrameClass} />
                                        <span className={countryFrameClass}>{entry.Pays}</span>
                                    </div>
                                </div>
                                <img className='QualifieBW' src='/bretons-1/img/QualifieBW.svg'></img>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div >
    );

};