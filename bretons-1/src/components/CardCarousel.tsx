import './CardCarousel.css';
import Card from 'react-bootstrap/Card';
import { FavoriteButton } from './Fav_nav';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import athleteData from '../data/Athlete.json';
import { Carousel } from 'react-bootstrap';
import { Athlete, VideoListItemProps, EventDataItem } from './type';
import EventData from '../data/Event.json';
import ShareMenu from './ShareMenu';

const determinerTexteTitre = (sexe: string, gain: string) => {
  const suffixeGenre = (sexe === 'F') ? 'e' : '';
  switch (gain) {
    case "Or":
      return "décroche l'or ";
    case "Argent":
      return "décroche l'argent ";
    case "Bronze":
      return "décroche le bronze";
    case "Qualifie":
      return `qualifié${suffixeGenre} pour la finale`
    case "":
      return `non qualifié${suffixeGenre} pour la finale`;
  }
};

const allAthletesData = athleteData.Athlete.reduce((allAthletes: Athlete[], athletesArray: Athlete[]) => {
  return allAthletes.concat(athletesArray);
}, []);

const athleteVideosData = allAthletesData
  .map((athlete: Athlete) => {
    const allEventsData: EventDataItem[] = (EventData.Event.flat() as EventDataItem[]);

    const athleteEvents = allEventsData.filter((event: EventDataItem) => event.Athlete === athlete.Athlete);

    const videosForAthlete = athleteEvents.map((event: EventDataItem) => ({
      id: event.IdEvent.toString(),
      sport: event.Sport,
      epreuve: event.Epreuve,
      gain: event.Gain,
      title: event.Athlete,
      subtitle: event.Gain,
      srcPhoto: athlete.Photo,
      description: athlete.Sexe,
      text: "",
    }));

    return videosForAthlete;
  })
  .flat()
  .sort((a, b) => parseInt(a.id) - parseInt(b.id)); 

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

  const handlePlayClick = (id: string) => {
    navigate('/bretons-1/VideoPlayer/'+id);
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
    <Card className="custom-card">
      <div className="image-container">
        <Card.Img className="custom-image" src={video.srcPhoto} />
        <div className='card_text'>
          <h4>{video.title}</h4>
          <p className='psanspadding'>{determinerTexteTitre(video.description, video.subtitle)}</p>
          <p> en {video.epreuve} ! </p>
        </div>
        <div className="image-row" style={{ zIndex: 5 }}>
          <img
            className="BicycleLogo"
            src={`/bretons-1/img/${video.sport}.svg`}
            alt="Logo"
            onClick={() => handleImageClick('BicycleLogo')}
          />
          <FavoriteButton
            isFavorited={isFavorited}
            onClick={handleFavoriteClick}
            buttonId={favoriteButtonId}
          />
          <ShareMenu id={video.id} title={video.title} />
        </div>
      </div>
      <img
        className="PlayButton"
        src="/bretons-1/img/Play_button.svg"
        alt="PlayButton"
        onClick={() => handlePlayClick(video.id)}
      />
      <img
        className={`overlay-image ${isFavorited ? 'saveyellow' : ''}`}
        src={video.gain === "" ? "/bretons-1/img/Eliminate.svg" : `/bretons-1/img/${video.gain}.svg`}
        alt="Overlay"
        style={{ zIndex: 2 }}
      />
    </Card>
  );
}



function ControlledCarousel() {
  const [videosData] = useState(athleteVideosData);

  const last4Videos = videosData.slice(-4).reverse();

  return (
    <Carousel className="carousel_main" indicators={true} controls={false}>
      {last4Videos.map(video => (
        <Carousel.Item key={video.id}>
          <CardCarousel video={video} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ControlledCarousel;
