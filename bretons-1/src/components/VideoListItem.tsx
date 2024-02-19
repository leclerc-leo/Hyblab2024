import './VideoListItem.css';
import React, { useState, useEffect } from 'react';
import { FavoriteButton } from './Fav_nav';
import athleteData from '../data/Athlete.json';
import { Athlete, Video, VideoListItemProps } from './type';
import EventData from '../data/Event.json';
import { EventDataItem } from './type'; 
import { useNavigate } from 'react-router-dom'; 

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

const athleteVideosData = allAthletesData.map((athlete: Athlete) => {
  const allEventsData: EventDataItem[] = (EventData.Event.flat() as EventDataItem[]);


  const athleteEvents = allEventsData.filter((event: EventDataItem) => event.Athlete === athlete.Athlete);

  const videosForAthlete = athleteEvents.map((event: EventDataItem) => ({
    id: event.IdEvent.toString(),
    sport: event.Sport,
    epreuve:event.Epreuve,
    gain: event.Gain,
    title: event.Athlete,
    subtitle: event.Gain,
    srcPhoto: athlete.Photo,
    description: athlete.Sexe,
    text: "",
  }));

  return videosForAthlete;
}).flat();

type FavoriteVideosManagerProps = {
  videoId: string;
};

const FavoriteVideosManager: React.FC<FavoriteVideosManagerProps> = ({ videoId }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  useEffect(() => {
    const favoritesFromStorage = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorited(favoritesFromStorage.includes(videoId));
  }, [videoId]);

  const handleFavoriteClick = () => {
    const updatedIsFavorited = !isFavorited;
    setIsFavorited(updatedIsFavorited);
    const favoritesFromStorage = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedFavorites = updatedIsFavorited
      ? [...favoritesFromStorage, videoId]
      : favoritesFromStorage.filter((fav: string) => fav !== videoId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <FavoriteButton
      isFavorited={isFavorited}
      onClick={handleFavoriteClick}
      buttonId={videoId}
    />
  );
};

function VideoListItem({ video }: VideoListItemProps) {
  const navigate = useNavigate();
  const handlePlayClick = (id: string) => {
    navigate('VideoPlayer/'+id);
  };
  return (
    <div className="video-list-item" onClick={() => handlePlayClick(video.id)}>
      <img src={video.srcPhoto} alt={video.title} />
      <div className="video-content">
        <div className="video-info">
          <h4>{video.title}</h4>
          <p className='psanspadding'>{determinerTexteTitre(video.description, video.subtitle)}</p>
          <p> en {video.epreuve} ! </p>
        </div>
      </div>
      <FavoriteVideosManager videoId={video.id} />
    </div>
  );
}

function VideoList() {
  const [videosData, setVideosData] = useState<Video[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    const filteredVideos = athleteVideosData.filter(video => favorites.includes(video.id));
    setVideosData(filteredVideos);
  }, []);

  return (
    <ul className="video-list">
      {videosData.map(video => (
        <VideoListItem key={video.id} video={video} />
      ))}
    </ul>
  );
}

export default VideoList;
