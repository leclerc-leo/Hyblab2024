import { useEffect, useState } from 'react';
import './Article.css';
import { FavoriteButton } from './Fav_nav';
import ShareMenu from './ShareMenu';
import { useNavigate } from 'react-router';

interface ArticleProps {
  id: string;
  title: string;
  subtitle: string;
  content: string;
}

const Article: React.FC<ArticleProps> = ({ id, title, subtitle, content }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteButtonId] = useState(id);
  const navigate = useNavigate();
  
  useEffect(() => {
    const favoritesFromStorage = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorited(favoritesFromStorage.includes(id));
  }, [id]);

  const handleBackClick = () => {
    navigate('/bretons-1')
  };

  const handleFavoriteClick = () => {
    const updatedIsFavorited = !isFavorited;
    setIsFavorited(updatedIsFavorited);
    const favoritesFromStorage = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedFavorites = updatedIsFavorited
      ? [...favoritesFromStorage, id]
      : favoritesFromStorage.filter((fav: string) => fav !== id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };
  return (
    <div className="article-container">
      <h1 className="article-title">{title}</h1>
      <h2 className="article-subtitle">{subtitle}</h2>
      <p className="article-content">{content}</p>
      <div className='Lastline'>
        <button onClick={() => handleBackClick()}>Retour</button>
        <div className='inversedColor'>
          <FavoriteButton
            isFavorited={isFavorited}
            onClick={handleFavoriteClick}
            buttonId={favoriteButtonId}
          />
        </div>
        <div className='inversedColor'>
          <ShareMenu />
        </div>
      </div>
    </div >
  );
};

export default Article;
