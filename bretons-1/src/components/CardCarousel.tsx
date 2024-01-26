import Card from 'react-bootstrap/Card';
import ImageGenerique from '../assets/sportif_velo.jpeg';
import BicycleLogo from '../assets/Bicycle_logo.svg';
import SaveLogo from '../assets/Save_logo.svg';
import ShareLogo from '../assets/Share_logo.svg';
import LikeLogo from '../assets/Like_logo.svg';
import GoldMedal from '../assets/GoldMedal.png';
import PlayButton from '../assets/Play_button.svg'

import './CardCarousel.css';

function KitchenSinkExample() {
  const handleImageClick = (imageName: string) => {
    console.log(`Image "${imageName}" cliquée !`);
  };
  const handlePlayClick = (imageName: string) => {
    console.log(`Image "${imageName}" cliquée !`);
  };

  return (
    <Card className="custom-card" style={{ width: '18rem' }}>
      <div className="image-container">
        <Card.Img className="custom-image" variant="top" src={ImageGenerique} />
        <h2 className='card_title'>Breton Winner</h2>
      </div>
      <img
            className="PlayButton"
            src={PlayButton}
            alt="PlayButton"
            onClick={() => handlePlayClick('PlayButton')}
          />
      <img className="overlay-image" src={GoldMedal} alt="Overlay" />
      <Card.Body>
        <div className="image-row">
          <img
            className="BicycleLogo"
            src={BicycleLogo}
            alt="Bicycle"
            onClick={() => handleImageClick('BicycleLogo')}
          />
          <img
            className="SaveLogo"
            src={SaveLogo}
            alt="Save"
            onClick={() => handleImageClick('SaveLogo')}
          />
          <img
            className="ShareLogo"
            src={ShareLogo}
            alt="Share"
            onClick={() => handleImageClick('ShareLogo')}
          />
          <img
            className="LikeLogo"
            src={LikeLogo}
            alt="Like"
            onClick={() => handleImageClick('LikeLogo')}
          />
        </div>
        {/* Titre de la vidéo */}
      </Card.Body>
    </Card>
  );
}

export default KitchenSinkExample;
