import React from 'react';
import './Frame1.css';

const determinerTexteTitre = (rang: number) => {
    switch(rang) {
        case 1:
            return "Décroche l'or";
        case 2:
            return "Décroche l'argent";
        case 3:
            return "Décroche le bronze";
        default:
            return `Rang ${rang}`;
    }
};

export const Frame1: React.FC<{ text: string, titre: number, sous_titre: string }> = ({ text, titre, sous_titre }) => {

    const titreAdapte = determinerTexteTitre(titre);

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
            <h1 className="golos-text-frame1 titre_frame1" style={{ fontSize: "14vh", bottom: '55vh' }}>{text}</h1>
            <h1 className="golos-text-frame1 titre_frame1" style={{ fontSize: "14vh", bottom: '35vh' }}>{titreAdapte}</h1>
            <h3 className="golos-text-frame1 sous-titre_frame1" style={{ fontSize: "5vh", bottom: '30vh' }}>{sous_titre}</h3>
        </div>
    );
};
