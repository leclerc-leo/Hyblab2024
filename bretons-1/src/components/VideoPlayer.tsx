import { useState, useEffect } from 'react';
import { Player } from "@remotion/player";
import { MyVideo } from "../remotion/Root";
import SwipeUp from './SwipeUp';
import Article from './Article';
import NavbarT from '../components/Navbar'
import athleteData from '../data/Athlete.json';
import { Athlete, EventDataItem} from '../components/type';
import EventData from '../data/Event.json';
import { useNavigate } from 'react-router';

function VideoPlayer({ id }: { id: string }) {
    const [allowSwipe, setAllowSwipe] = useState(false);
    const allEventsData: EventDataItem[] = (EventData.Event.flat() as EventDataItem[]);
    const navigate = useNavigate();
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
    const handleGoBack = () => {
      navigate("/bretons-1")
  };

    const durationInFrames = eventData.Gain === "" || eventData.Gain === "Qualifie" ? 2040 : 2280;
    return (
        <div id='VideoPlayer' style={{overflow: 'hidden' }}>
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
                style={{ width: "100%", height: "100%", position: "absolute", top: "0%",objectFit: "cover", }}
                autoPlay
                loop
            />
            <div onClick={handleGoBack} style={{ position: 'absolute', bottom: '20px', left: '10px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="16" viewBox="0 0 25 16" fill="none" style={{ transform: 'rotate(90deg)'}}>
              <path d="M2 2L12.5 13L23 2" stroke="black" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 2L12.5 13L23 2" stroke="#FFFFFF" strokeWidth="3"/>
              </svg>
            </div>
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
