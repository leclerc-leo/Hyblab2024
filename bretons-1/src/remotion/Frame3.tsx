import './Frame3.css';

export const Frame3: React.FC<{ text: string }> = ({ text }) => {
    return (
      <div className="container">
        <img src='/bretons-1/img/frame3.png' alt='background' className="search-image" />
        <div className="text-overlay">{text}</div>
        <img src='/bretons-1/img/souris3.png' className="mouse-cursor"></img>
      </div>
    );
};

