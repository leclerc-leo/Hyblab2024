import React from 'react';
import './Frame1.css';
import OrSVG from '../assets/img/Or.svg';
import ArgentSVG from '../assets/img/Argent.svg';
import BronzeSVG from '../assets/img/Bronze.svg';
import QualifieSVG from '../assets/img/Qualifie.svg';
import EliminateSVG from '../assets/img/Eliminate.svg'
import { useEffect, useState } from 'react';

const determinerTexteTitre = (sexe: string, gain: string, text: string) => {
  const suffixeGenre = (sexe === 'F') ? 'e' : '';
  switch (gain) {
    case "Or":
      return `${text} décroche l'or !`;
    case "Argent":
      return `${text} décroche l'argent !`;
    case "Bronze":
      return `${text} décroche le bronze !`;
    case "Qualifie":
      return `${text} \n est qualifié${suffixeGenre} en finale !`;
    case "":
      return `${text} non qualifié${suffixeGenre} en finale`;
  }
};



const determinerImageMedaille = (gain: string) => {
  switch (gain) {
    case "Or":
      return OrSVG;
    case "Argent":
      return ArgentSVG;
    case "Bronze":
      return BronzeSVG;
    case "Qualifie":
      return QualifieSVG;
    default:
      return EliminateSVG;
  }
};


export const Frame1: React.FC<{ text: string, sexe: string, gain: string, rang: number, sous_titre: string, image: string }> = ({ text,sexe,  gain, sous_titre, image, }) => {

  const titreAdapte = determinerTexteTitre(sexe, gain, text);
  const cheminImageMedaille = determinerImageMedaille(gain);
  const [_, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
    setTimeout(function () {
      const element = document.querySelector('.animationOut') as HTMLElement;
      if (element != undefined) {
        element.style.transform = 'translateY(400vh)';
      }
    }, 4000);
  }, []);
  return (
    <>
       <div className='animationOut'>
        <img className='medailleTransition' src={determinerImageMedaille(gain)}></img>
      </div>
      <div className="animationAgrandissement" style={{
        height: '100%',
        width: '120%',
        backgroundImage: `url(${image})`,
        objectFit: 'cover',
        objectPosition: 'center center',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        transform: 'scale(1)',
      }}>
        {cheminImageMedaille && (
          <img src={cheminImageMedaille} alt="Médaille" style={{ position: 'absolute', top: '40vh', left: '30vh', width: '150px', height: '168px' }} />
        )}
      </div>
      <h1 className="golos-text-frame1 titre_frame1 " style={{ fontSize: "11vh", bottom: '37vh' }}>{titreAdapte}</h1>
      <h3 className="golos-text-frame1 sous-titre_frame1" style={{ fontSize: "5vh", bottom: '30vh' }}>{sous_titre}</h3>
    </>
  );
};
