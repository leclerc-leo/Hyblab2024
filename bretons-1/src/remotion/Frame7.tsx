import React, { useEffect, useState } from 'react';
import './Frame7.css';
import { Podium } from '../components/type';


export const Frame7: React.FC<{ athlete: string,Sexe:string,epreuve:string, podium: Podium[], gain: string, resultat:string,performance:string }> = ({ athlete, Sexe, epreuve, podium, gain, resultat, performance }) => {
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
    const getTitleText = (gain: string, Sexe: string, epreuve:string, resultat:string, performance:string): string => {
        const PronomGenre = (Sexe === 'F') ? 'Elle' : 'Il';
        switch (gain) {
          case 'Qualifie':
            return `${athlete} se qualifie pour la ${epreuve} avec un score de ${resultat}`;
          default:
            return `${PronomGenre} était à ${performance} de se qualifier avec un score de ${resultat}`;
        }
      };
    const getFlagSrc = (pays: string) => {
        switch (pays) {
            case 'France': return '/bretons-1/img/fr.svg';
            case 'Allemand': return '/bretons-1/img/allemagne.svg';
            case 'Etat-Unis': return '/bretons-1/img/USA.svg';
            case 'Angleterre': return '/bretons-1/img/Angleterre.svg';
            case 'Danemark': return '/bretons-1/img/Danemark.svg';
            case 'Pays-Bas': return '/bretons-1/img/Pays-Bas.svg';
            case 'Suede': return '/bretons-1/img/Suede.svg';
            case 'Nouvelle-Zélande': return '/bretons-1/img/Nouvelle-zélande.svg';
            default: return '';
        }
    };


    const getScoreLabel = (Score: string) => {
        const isTime = /h|'|''|s/.test(Score);
        return isTime ? "Temps : " : "Score : ";
    };

    return (
        <div className="frame7Container">
            <div className="titreFrame7">{getTitleText(gain, Sexe, epreuve, resultat, performance)}</div>
            <div className='GroupeRectangle'>
                {podium.slice(0, 4).map((entry: Podium, index: number) => {
                    const rectangleClass = index === 0 ? "rectangle1Frame7" : index === 1 ? "rectangle2Frame7" : index === 2 ? "rectangle3Frame7" : "rectangle4Frame7";
                    const infoFrameClass = index === 0 ? "infoFrame7" : index === 1 ? "infoFrame7_2" : index === 2 ? "infoFrame3_7" : "infoFrame4_7";
                    const flagFrameClass = index === 0 ? "flagFrame7" : index === 1 ? "flag_2_Frame7" : index === 2 ? "flag_3_Frame7" : "flag_4_Frame7";
                    const nameFrameClass = index === 0 ? "nameFrame7" : index === 1 ? "name_2_Frame7" : index === 2 ? "name_3_Frame7" : "name_4_Frame7";
                    const timeFrameClass = index === 0 ? "timeFrame7" : index === 1 ? "time_2_Frame7" : index === 2 ? "time_3_Frame7" : "time_4_Frame7";
                    const countryFrameClass = index === 0 ? "countryFrame7" : index === 1 ? "country_2_Frame7" : index === 2 ? "country_3_Frame7" : "country_4_Frame7";
                    const highlightClass = athlete === entry.Nom ? "highlight" : "";

                    return (
                        <>
                            <div
                                key={index}
                                className={`${rectangleClass} ${highlightClass} ${gain === "" && entry.Nom === athlete ? 'RecEliminate' : ''}`}
                            >
                                <div className={infoFrameClass}>
                                    <span className={nameFrameClass}>{entry.Nom}</span>
                                    <div className='middletext'>
                                        <span className={timeFrameClass}>{getScoreLabel(entry.Score)}{entry.Score}</span>
                                        <div className={flagFrameClass}>
                                            <img src={getFlagSrc(entry.Pays)} alt={entry.Pays} className={flagFrameClass} />
                                            <span className={countryFrameClass}>{entry.Pays}</span>
                                        </div>
                                    </div>
                                    {gain === "" && entry.Nom === athlete && (
                                        <img className='QualifieBW' src={`/bretons-1/img/EliminateBW.svg`} alt='Eliminate' />
                                    )}
                                    {gain === "Qualifie" && entry.Nom === athlete && (
                                        <img className='QualifieBW' src={`/bretons-1/img/QualifieBW.svg`} alt='Qualifie' />
                                    )}
                                    {entry.Nom !== athlete && (
                                        <img className='QualifieBW' src='/bretons-1/img/QualifieBW.svg' alt='Qualification' />
                                    )}
                                </div>
                            </div>
                        </>
                    );
                })};
            </div >
        </div >
    );

};