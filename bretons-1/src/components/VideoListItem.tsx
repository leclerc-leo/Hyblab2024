import { useState } from 'react';
import {LikeButton} from './Likes';
import './VideoListItem.css'; 

type Video = {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  description: string;
};

type VideoListItemProps = {
  video: Video;
};

function VideoListItem({ video }: VideoListItemProps) {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="video-list-item">
      <img src={video.thumbnail} alt={video.title} />
      <div className="video-content">
        <div className="video-info">
          <h4>{video.title}</h4>
          <h5>{video.subtitle}</h5>
          <p>{video.description}</p>
          <LikeButton 
          isLiked={isLiked} 
          onClick={toggleLike} 
          buttonId={video.id}
          />
        </div>
      </div>
    </div>
  );
}

export default VideoListItem;
