import React, { useState, useEffect } from 'react';
import './VideoListItem.css';
import Carousel from 'react-bootstrap/Carousel';
import { FavoriteButton } from './Fav_nav';
import athleteData from '../data/Athlete.json';
import { Athlete, Video, VideoListItemProps } from './type';

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
          <p>{video.description}</p>
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
    <Carousel className="carousel_main" indicators={true} controls={false}>
      {videosData.map(video => (
        <Carousel.Item key={video.id}>
          <VideoListItem key={video.id} video={video} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default VideoList;
