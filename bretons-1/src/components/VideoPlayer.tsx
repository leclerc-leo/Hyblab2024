import './VideoPlayer.css';
import { Player } from "@remotion/player";
import { MyVideo } from "../remotion/Root";
import SwipeUp from './SwipeUp';
import athleteData from '../data/Athlete.json';
import { Athlete, EventDataItem} from './type';
import EventData from '../data/Event.json';

function VideoPlayer({ id }: { id: string }) {

    const handleSwipeUp = () => {
    };
    const allAthletesData = athleteData.Athlete.reduce((allAthletes: Athlete[], athletesArray: Athlete[]) => {
        return allAthletes.concat(athletesArray);
      }, []);
      
    const athleteVideosData = allAthletesData.map((athlete: Athlete) => {
        const allEventsData: EventDataItem[] = (EventData.Event.flat() as EventDataItem[]);
        const athleteEvents = allEventsData.filter((event: EventDataItem) => event.Athlete === athlete.Athlete);
        const videosForAthlete = athleteEvents.map((event: EventDataItem) => ({
          id: event.IdEvent.toString(),
          title: event.Athlete,
          subtitle: event.Epreuve,
          srcPhoto: athlete.Photo,
          description: event.Performance,
        }));
        return videosForAthlete;
      }).flat();
    
    let videoData = athleteVideosData.find(a => a.id == id);

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
