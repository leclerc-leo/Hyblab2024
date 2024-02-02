import React from 'react';
import './Frame1.css';
import OrSVG from '../assets/img/Or.svg';
import ArgentSVG from '../assets/img/Argent.svg';
import BronzeSVG from '../assets/img/Bronze.svg';
import QualifieSVG from '../assets/img/Qualifie.svg';
import { useEffect, useState } from 'react';

const determinerTexteTitre = (gain: string, rang: number) => {
    switch(gain) {
        case "Or":
            return "décroche l'or !";
        case "Argent":
            return "décroche l'argent !";
        case "Bronze":
            return "décroche le bronze !";
        default:
            return `rang ${rang}`;
    }
};


const determinerImageMedaille = (gain: string) => {
    switch(gain) {
      case "Or":
        return OrSVG;
      case "Argent":
        return ArgentSVG;
      case "Bronze":
        return BronzeSVG;
      case "Qualifie":
        return QualifieSVG;
      default:
        return null;
    }
  };
  

export const Frame1: React.FC<{ text: string, gain: string,  rang: number, sous_titre: string, image:string }> = ({ text, gain, rang, sous_titre,image, }) => {

    const titreAdapte = determinerTexteTitre(gain, rang);
    const cheminImageMedaille = determinerImageMedaille(gain);
    const [_, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(false);
        setTimeout(function() {
          const element = document.querySelector('.animationOut') as HTMLElement;
          if(element != undefined) {
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
                    width: '100%',
                    backgroundImage: `url(${image})`,
                    objectFit: 'cover',
                    objectPosition: 'center center',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    position: 'relative',
                    transform: 'scale(1)',
                    backgroundSize: '1080px 1920px',
                }}>
                    {cheminImageMedaille && (
                        <img src={cheminImageMedaille} alt="Médaille" style={{ position: 'absolute', top: '25vh', left: '17vh', width: '150px', height: '168px' }} />
                        )}
                    <h1 className="golos-text-frame1 titre_frame1" style={{ fontSize: "11vh", bottom: '50vh' }}>{text}</h1>
                    <h1 className="golos-text-frame1 titre_frame1" style={{ fontSize: "11vh", bottom: '37vh' }}>{titreAdapte}</h1>
                    <h3 className="golos-text-frame1 sous-titre_frame1" style={{ fontSize: "5vh", bottom: '30vh' }}>{sous_titre}</h3>
                </div>
        </>
    );
};
