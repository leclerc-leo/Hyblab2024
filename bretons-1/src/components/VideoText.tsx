import React from 'react';
import './VideoTextOverlay.css';

type Video = {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  description: string;
  article: string|null;
};

interface VideoTextOverlayProps {
  video: Video;
}

const VideoTextOverlay: React.FC<VideoTextOverlayProps> = ({ video }) => {
    return (
      <div className="video-container">
        <video src={video.thumbnail} controls poster={video.thumbnail}> {}
          Your browser does not support the video tag.
        </video>
        <div className="overlay-text">
          <h1>{video.title}</h1>
          <h2>{video.subtitle}</h2>
          <p>{video.description}</p>
        </div>
      </div>
    );
  };
  
  export default VideoTextOverlay;
