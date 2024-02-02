import React, { useState, useEffect } from 'react';
import videoPath from '/img/animation/annimation crèpe_1.mp4';
import './Frame6.css';

export const Frame6: React.FC = () => {
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
  const valeurAffichee = compteur < 1 ? "0" : "1";

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
      <h1 className="golos-text-frame6 titre_frame6" style={{ fontSize: "10vh", bottom: '145vh' }}>Elle ramène la 1ère médaille au clan Breton</h1>
    </>
  );
};
