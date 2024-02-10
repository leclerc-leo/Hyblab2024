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
    <>
      <img className='GuilleVerte' src='/bretons-1/img/Logo_Guille_vert.svg'></img>
      <div className="article-container">
        <h1 className="article-title">{title}</h1>
        <div className='subtitle'>
          <h2 className="article-subtitle">{subtitle}</h2>
          <img className="BicycleLogoArticle" src={`/bretons-1/img/${subtitle}.svg`} />
        </div>
        <p className="article-content">{content}</p>
        <img className='GuilleVerteinversed' src='/bretons-1/img/Logo_Guille_vert.svg'></img>
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
            <ShareMenu id={id} title={title} />
          </div>
        </div>
      </div >
    </>
  );
};

export default Article;
