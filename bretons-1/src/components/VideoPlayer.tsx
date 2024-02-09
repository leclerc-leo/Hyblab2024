import { useState, useEffect } from 'react';
import { Player } from "@remotion/player";
import { MyVideo } from "../remotion/Root";
import SwipeUp from './SwipeUp';
import Article from './Article';
import NavbarT from '../components/Navbar'
import athleteData from '../data/Athlete.json';
import { Athlete, EventDataItem} from '../components/type';
import EventData from '../data/Event.json';

function VideoPlayer({ id }: { id: string }) {
    const [allowSwipe, setAllowSwipe] = useState(false);
    const allEventsData: EventDataItem[] = (EventData.Event.flat() as EventDataItem[]);

    let eventData = allEventsData.find(e => e.IdEvent == Number(id));
    const allAthletesData = athleteData.Athlete.reduce((allAthletes: Athlete[], athletesArray: Athlete[]) => {
        return allAthletes.concat(athletesArray);
      }, []);
    let athlete = allAthletesData.find(a => a.Athlete == eventData?.Athlete)
    if(athlete == undefined || eventData == undefined) {
      return (<></>);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
        setAllowSwipe(true);
        }, 20000); // 20 seconds

        return () => clearTimeout(timer);
    }, []);

    const handleSwipeUp = () => {
        if (allowSwipe) {  
        }
    };

    const durationInFrames = eventData.Gain === "" || eventData.Gain === "Qualifie" ? 1740 : 1980;
    return (
        <div id='VideoPlayer'>
            <div className="head">
                <NavbarT />
            </div>
            <Player
                component={MyVideo}
                inputProps={{ id: id }}
                durationInFrames={durationInFrames}
                compositionWidth={1080}
                compositionHeight={1920}
                fps={60}
                style={{ width: "100%", height: "100%", position: "absolute", top: "0%" }}
                controls
                autoPlay
                loop
            />
            
            {(
          allowSwipe &&(
            <>
            <SwipeUp onSwipeUp={handleSwipeUp} />
            <Article 
          id={eventData.IdEvent.toString()}
          title={athlete.Athlete}
          subtitle={eventData.Sport}
          content={athlete.Article}
        />
            </>
          )
        )}
    </div>
    );
}

export default VideoPlayer;
