// Fichier: ControlledCarousel.tsx

import { SetStateAction, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import KitchenSinkExample from './CardCarousel.tsx'; // Import du composant KitchenSinkExample
import './carousel.css';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: SetStateAction<number>) => {
    setIndex(selectedIndex);
  };

  const titles = ['First slide', 'Second slide', 'Third slide'];

  return (
    <Carousel style={{ width: '15rem' }} indicators={false} controls={false} activeIndex={index} onSelect={handleSelect}>
      {titles.map((_, i) => (
        <Carousel.Item key={i}>
          <div style={{ maxHeight: '600px' }}> {/* Ajustez la hauteur maximale selon vos besoins */}
            <KitchenSinkExample />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ControlledCarousel;


/*
import { SetStateAction, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { RemotionContent } from './RemotionContentProps'; // Correction de l'importation

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: SetStateAction<number>) => {
    setIndex(selectedIndex);
  };

  // Les données pour chaque slide
  const slidesData = [
    {
      title: 'First-slide',
      videoSrc: 'chemin/vers/votre/video.mp4',
      content: 'text',
    },
    {
      title: 'Second-slide',
      videoSrc: 'chemin/vers/votre/video2.mp4',
      content: 'text',
    },
    {
      title: 'Third-slide',
      videoSrc: 'chemin/vers/votre/video3.mp4',
      content: 'text',
    },
  ];

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {slidesData.map((slide, i) => (
        <Carousel.Item key={i}>
          <RemotionContent {...slide} />
          <Carousel.Caption>
            <h3>{slide.title} label</h3>
            <p>{slide.content}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ControlledCarousel;*/
