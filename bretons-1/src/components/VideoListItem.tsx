import React, { useState, useEffect } from 'react';
import './VideoListItem.css';
import { FavoriteButton } from './Fav_nav';
import athleteData from '../data/Athlete.json';
import { Athlete, Video, VideoListItemProps } from './type';
import EventData from '../data/Event.json';
import { EventDataItem } from './type';  

const allAthletesData = athleteData.Athlete.reduce((allAthletes: Athlete[], athletesArray: Athlete[]) => {
  return allAthletes.concat(athletesArray);
}, []);

const athleteVideosData = allAthletesData.map((athlete: Athlete) => {
  const allEventsData: EventDataItem[] = (EventData.Event.flat() as EventDataItem[]);


  const athleteEvents = allEventsData.filter((event: EventDataItem) => event.Athlete === athlete.Athlete);

  const videosForAthlete = athleteEvents.map((event: EventDataItem) => ({
    id: event.IdEvent.toString(),
    title: event.Athlete,
    sport: event.Sport,
    gain: event.Gain,
    text: event.Performance,
    subtitle: event.Epreuve,
    srcPhoto: athlete.Photo,
    description: event.Performance,
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
  return (
    <div className="video-list-item">
      <img src={video.srcPhoto} alt={video.title} />
      <div className="video-content">
        <div className="video-info">
          <h4>{video.title}</h4>
          <h5>{video.subtitle}</h5>
          <p>{video.text}</p>
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
