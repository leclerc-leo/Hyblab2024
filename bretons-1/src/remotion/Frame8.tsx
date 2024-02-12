import React from 'react';
import videoPath from '/bretons-1/img/animation/Composition 1.mp4';
import './Frame8.css';


export const Frame8: React.FC<{}> = ({ }) => {

  return (
    <>
      <div className="videoContainer_frame6">
        <video autoPlay loop muted className="videoPlayer_frame6">
          <source src={videoPath} type="video/mp4" />
          Votre navigateur ne supporte pas la balise vidéo.
        </video>
      </div>
    </>
  );
};
