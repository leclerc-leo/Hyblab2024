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


