import React, { useState, useEffect } from 'react';
import videoPath from '/img/animation/annimation crepe_1.mp4';
import Svg from '../assets/img/Compteur.svg';
import './Frame6.css';


export const Frame6: React.FC<{ sex: string }> = ({ sex }) => {
  const [compteur, setCompteur] = useState(0);

  useEffect(() => {
    const dureeAnimation = 1000;
    let start: number | null = null;

    const animerCompteur = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = timestamp - start;
      const ratio = Math.min(progress / dureeAnimation, 1);

      setCompteur(ratio);

      if (progress < dureeAnimation) {
        requestAnimationFrame(animerCompteur);
      }
    };

    requestAnimationFrame(animerCompteur);
  }, []);
  const valeurAffichee = compteur < 1 ? "0" : "+1";
  const pronom = sex === 'F' ? "Elle" : "Il";

  return (
    <>
      <div className="videoContainer_frame6">
        <video autoPlay loop muted className="videoPlayer_frame6">
          <source src={videoPath} type="video/mp4" />
          Votre navigateur ne supporte pas la balise vidéo.
        </video>
        <div className="compteurContainer_frame6" style={{ fontSize: "10vh", bottom: '145vh' }}>
          {valeurAffichee}
        </div>
      </div>
      <img src={Svg} alt="Compteur" className="svgCompteur" />
      <h1 className="golos-text-frame6 titre_frame6" style={{ fontSize: "10vh", bottom: '178vh', whiteSpace: 'pre-wrap' }}>{pronom} ramène une médaille supplémentaire
        <br/>au clan Breton</h1>
    </>
  );
};
