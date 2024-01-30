import background from '../assets/video_cover/running_women_full.png';

export const Frame1: React.FC<{ text: string }> = ({ text }) => {
    return (
      <div>
          <h1 style={{ position: "absolute", color: "while"}}>{text}</h1>
          <img style={{height: "100%"}} src={background} alt='background' />;
      </div>
    );
};