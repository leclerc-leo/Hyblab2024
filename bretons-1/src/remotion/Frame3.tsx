import background from '../assets/video_cover/tennis.jpg';

export const Frame3: React.FC<{ text: string }> = ({ text }) => {
    return (
      <div>
          <h1 style={{ position: "absolute", color: "while"}}>{text}</h1>
          <img style={{height: "100%"}} src={background} alt='background' />;
      </div>
    );
};