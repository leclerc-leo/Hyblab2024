import './VideoPlayer.css';
import { Player } from "@remotion/player";
import { MyVideo } from "../remotion/Root";
import SwipeUp from './SwipeUp';
import athleteData from '../data/Athlete.json';
import { Athlete, _ } from './type';

function VideoPlayer({ id }: { id: string }) {

    const handleSwipeUp = () => {
    };
    const allAthletesData = athleteData.Athlete.reduce((allAthletes: Athlete[], athletesArray: Athlete[]) => {
        return allAthletes.concat(athletesArray);
    }, []);

    let videoData = allAthletesData.find(a => a.Athlete == id);
    return (
        <div id='VideoPlayer'>
            <div className='headerPlayer'>
                <img src="/bretons-1/img/logo_telegram_banc.svg" alt='Logo' />
            </div>
            <Player
                component={MyVideo}
                inputProps={{ videoData: videoData }}
                durationInFrames={1000}
                compositionWidth={1080}
                compositionHeight={1920}
                fps={60}
                style={{ width: "100%", height: "100%", position: "absolute", top: "0%" }}
                controls
            />
            {!videoData!["Etudes / Métier"] ? (
                <div className='boutonRetour'><span>Retour</span></div>
            ) : (
                <SwipeUp onSwipeUp={handleSwipeUp} />
            )}
        </div>
    );
}

export default VideoPlayer;
