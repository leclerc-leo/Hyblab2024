import Card from 'react-bootstrap/Card';
import ImageGenerique from '../assets/sportif_velo.jpeg';
import BicycleLogo from '../assets/Bicycle_logo.svg';
import ShareLogo from '../assets/Share_logo.svg'
import GoldMedal from '../assets/GoldMedal.png';
import PlayButton from '../assets/Play_button.svg';
import { FavoriteButton } from './Fav_nav';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CardCarousel.css';
import athleteData from '../data/Athlete.json';
import { Carousel } from 'react-bootstrap';
import { Athlete, VideoListItemProps } from './type';


const allAthletesData = athleteData.Athlete.reduce((allAthletes: Athlete[], athletesArray: Athlete[]) => {
  return allAthletes.concat(athletesArray);
}, []);

const athleteVideosData = allAthletesData.map((athlete: Athlete) => ({
  id: athlete.Athlete,
  title: athlete.Athlete,
  subtitle: athlete.Epreuve,
  srcPhoto: athlete.Photo,
  description: athlete.Performance,
}));


function CardCarousel({ video }: VideoListItemProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteButtonId] = useState(video.id);
  const navigate = useNavigate();

  useEffect(() => {
    const favoritesFromStorage = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorited(favoritesFromStorage.includes(video.id));
  }, [video.id]);

  const handleImageClick = (imageName: string) => {
    console.log(`Image "${imageName}" cliquée !`);
  };

  const handlePlayClick = (imageName: string) => {
    console.log(`Image "${imageName}" cliquée !`);
    navigate('VideoPlayer', { state: { id: imageName } })
  };

  const handleFavoriteClick = () => {
    const updatedIsFavorited = !isFavorited;
    setIsFavorited(updatedIsFavorited);
    const favoritesFromStorage = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedFavorites = updatedIsFavorited
      ? [...favoritesFromStorage, video.id]
      : favoritesFromStorage.filter((fav: string) => fav !== video.id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <Card className="custom-card" style={{ width: '15rem' }}>
      <div className="image-container">
        <Card.Img className="custom-image" variant="top" src={ImageGenerique} />
        <div className='card_text'>
            <h4>{video.title}</h4>
            <p>{video.subtitle}</p>
        </div>
      </div>
      <img
        className="PlayButton"
        src={PlayButton}
        alt="PlayButton"
        onClick={() => handlePlayClick('PlayButton')}
      />
      <img className={`overlay-image ${isFavorited ? 'saveyellow' : ''}`} src={GoldMedal} alt="Overlay" />
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
          <img
            className="ShareLogo"
            src={ShareLogo}
            alt="Share"
            onClick={() => handleImageClick('ShareLogo')}
          />
        </div>
      </Card.Body>
    </Card>
  );
}


function ControlledCarousel() {
  const [videosData] = useState(athleteVideosData);

  return (
    <Carousel className="carousel_main" style={{ width: '15rem' }} indicators={true} controls={false}>
      {videosData.map(video => (
        <Carousel.Item key={video.id}>
          <CardCarousel key={video.id} video={video} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ControlledCarousel;