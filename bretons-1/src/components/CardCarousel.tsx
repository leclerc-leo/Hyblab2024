import Card from 'react-bootstrap/Card';
import ImageGenerique from '../assets/sportif_velo.jpeg';
import BicycleLogo from '../assets/Bicycle_logo.svg';
import ShareLogo from '../assets/Share_logo.svg'
import GoldMedal from '../assets/GoldMedal.png';
import PlayButton from '../assets/Play_button.svg';
import Placeholder from 'react-bootstrap/Placeholder';
import { FavoriteButton } from './Fav_nav';
// import {LikeButton} from './Like_nav';
import { useState } from 'react';

import './CardCarousel.css';

function KitchenSinkExample() {
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteButtonId] = useState('uniqueId');

  // const [isLiked, setIsLiked] = useState(false);
  // const [likeButtonId] = useState('uniqueId');

  const handleImageClick = (imageName: string) => {
    console.log(`Image "${imageName}" cliquée !`);
  };

  const handlePlayClick = (imageName: string) => {
    console.log(`Image "${imageName}" cliquée !`);
  };

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
    console.log(`Favoris "${isFavorited ? 'retiré' : 'ajouté'}" !`);
  };

  // const handleLikeClick = () => {
  //   setIsLiked(!isLiked);
  //   console.log(`Favoris "${isLiked ? 'retiré' : 'ajouté'}" !`);
  // };

  return (
    <Card className="custom-card" style={{ width: '15rem' }}>
      <div className="image-container">
        <Card.Img className="custom-image" variant="top" src={ImageGenerique} />
        <div className='card_text'>
          <h4 aria-hidden="true">
            <Placeholder xs={9} bg="light" />
          </h4>
          <p aria-hidden="true">
            <Placeholder xs={6} bg="light"/>
          </p>
        </div>
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
          <FavoriteButton
            isFavorited={isFavorited}
            onClick={handleFavoriteClick}
            buttonId={favoriteButtonId}
          />
          {/* <LikeButton
            isLiked={isLiked}
            onClick={handleLikeClick}
            buttonId={likeButtonId}
          /> */}
          <img
            className="ShareLogo"
            src={ShareLogo}
            alt="Share"
            onClick={() => handleImageClick('ShareLogo')}
          />
        </div>
        {/* Titre de la vidéo */}
      </Card.Body>
    </Card>
  );
}

export default KitchenSinkExample;