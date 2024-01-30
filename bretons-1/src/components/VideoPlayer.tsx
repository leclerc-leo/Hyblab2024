import './VideoPlayer.css';
import { Player } from "@remotion/player";
import { MyComp } from "../remotion/MyComp";
import logo from '../assets/logo_telegram_banc.svg';
import SwipeUp from './SwipeUp';
import Video from '../type/Video';

function VideoPlayer(video: Video) {

    const handleSwipeUp = () => {
    };
  return (
    <div>
        <div className='headerPlayer'>
            <img src={logo} alt='Logo' />
        </div>
        <Player
            component={MyComp}
            inputProps={{ text: "Malo" }}
            durationInFrames={240}
            compositionWidth={1080}
            compositionHeight={1920}
            fps={30}
            style={{ width: "100%", height: "100%", position: "absolute", top: "0%" }}
            controls
        />
        {!video.article ? (
            <div className='boutonRetour'><span>Retour</span></div>
        ) : (
            <SwipeUp onSwipeUp={handleSwipeUp} />
        )}
    </div>
  );
}

export default VideoPlayer;
