import './VideoPlayer.css';
import { useState, useEffect } from 'react';
import { Player } from "@remotion/player";
import { MyVideo } from "../remotion/Root";
import SwipeUp from './SwipeUp';
import athleteData from '../data/Athlete.json';
import { Athlete, EventDataItem} from './type';
import EventData from '../data/Event.json';
import Article from './Article';

function VideoPlayer({ id }: { id: string }) {

  const [allowSwipe, setAllowSwipe] = useState(false);

  // set 
  useEffect(() => {
    const timer = setTimeout(() => {
      setAllowSwipe(true);
    }, 6000); // 6 seconds

    return () => clearTimeout(timer); // clear the timer 
  }, []); // An empty dependency array means that this effect will only run once when the component is loaded.

  const handleSwipeUp = () => {
    if (allowSwipe) {  
    }
  };
    const allEventsData: EventDataItem[] = (EventData.Event.flat() as EventDataItem[]);

    let eventData = allEventsData.find(e => e.IdEvent == Number(id));
    const allAthletesData = athleteData.Athlete.reduce((allAthletes: Athlete[], athletesArray: Athlete[]) => {
        return allAthletes.concat(athletesArray);
      }, []);
    let athlete = allAthletesData.find(a => a.Athlete == eventData?.Athlete)
    return (
        <div id='VideoPlayer'>
            <div className='headerPlayer'>
                <img src="/bretons-1/img/logo_telegram_banc.svg" alt='Logo' />
            </div>
            <Player
                component={MyVideo}
                inputProps={{ id: id }}
                durationInFrames={1000}
                compositionWidth={1080}
                compositionHeight={1920}
                fps={60}
                style={{ width: "100%", height: "100%", position: "absolute", top: "0%" }}
                controls
            />
            {(
          allowSwipe &&(
            <SwipeUp onSwipeUp={handleSwipeUp} />
          )
        )}
        {//Here is a example, need to change to video.article.
        <Article 
          title="Sounkamba Sylla, médaillée d’or ! "
          subtitle="Athlétisme : 400m" 
          content="A moins d’un an des Jeux Olympiques de Paris 2024, le sport français s’organise pour répondre présent. Si pour les stars tricolores, la voie est toute tracée pour représenter la France, pour certains athlètes, la tâche est plus complexe. En Mayenne, la spécialiste du 400 mètres Sounkamba Sylla a décidé de tout sacrifier pour réaliser son rêve olympique."
        />
}
    </div>
    );
}

export default VideoPlayer;
