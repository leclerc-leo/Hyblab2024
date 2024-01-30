import './Article.css';
import athleteImage from '../assets/athlete/PONTMARIEBOLOU1.jpg'; // Replace with path to your image

interface ArticleProps {
    title: string;
    subtitle: string;
    content: string;
  }

const Article: React.FC<ArticleProps> = ({ title, subtitle, content }) => {
  return (
    <div className="article-container">
      <h1 className="article-title">{title}</h1>
      <h2 className="article-subtitle">{subtitle}</h2>
      <p className="article-content">{content}</p>
    </div>
  );
};

export default Article;
