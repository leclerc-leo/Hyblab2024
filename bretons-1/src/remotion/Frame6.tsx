import React from 'react';
import './Frame1.css';
import OrSVG from '/img/Or.svg';
import ArgentSVG from '/img/Argent.svg';
import BronzeSVG from '/img/Bronze.svg';

const determinerTexteTitre = (rang: number) => {
    switch(rang) {
        case 1:
            return "décroche l'or !";
        case 2:
            return "décroche l'argent !";
        case 3:
            return "décroche le bronze !";
        default:
            return `rang ${rang}`;
    }
};


const determinerImageMedaille = (rang: number) => {
    switch(rang) {
      case 1:
        return OrSVG;
      case 2:
        return ArgentSVG;
      case 3:
        return BronzeSVG;
      default:
        return null;
    }
  };
  

export const Frame1: React.FC<{ text: string, titre: number, sous_titre: string }> = ({ text, titre, sous_titre }) => {

    const titreAdapte = determinerTexteTitre(titre);
    const cheminImageMedaille = determinerImageMedaille(titre);

    return (
        <div className="animationAgrandissement" style={{
            height: '100%',
            width: '100%',
            backgroundImage: `url(/bretons-1/img/athlete/JDE2.jpg)`,
            objectFit: 'cover',
            objectPosition: 'center center',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            transform: 'scale(1)',
        }}>
            {cheminImageMedaille && (
                <img src={cheminImageMedaille} alt="Médaille" style={{ position: 'absolute', top: '25vh', left: '17vh', width: '150px', height: '168px' }} />
            )}
            <h1 className="golos-text-frame1 titre_frame1" style={{ fontSize: "11vh", bottom: '50vh' }}>{text}</h1>
            <h1 className="golos-text-frame1 titre_frame1" style={{ fontSize: "11vh", bottom: '37vh' }}>{titreAdapte}</h1>
            <h3 className="golos-text-frame1 sous-titre_frame1" style={{ fontSize: "5vh", bottom: '30vh' }}>{sous_titre}</h3>
        </div>
    );
};
