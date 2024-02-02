import './VideoPlayer.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player } from "@remotion/player";
import { MyVideo } from "../remotion/Root";
import SwipeUp from './SwipeUp';
import Article from './Article';
import NavbarT from '../components/Navbar'

function VideoPlayer({ id }: { id: string }) {
    const navigate = useNavigate();
    const [allowSwipe, setAllowSwipe] = useState(false);

    const handleClick = () => {
      // After click return button navigate to Accueil
      navigate('/bretons-1');
    };

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
    return (
        <div id='VideoPlayer'>
            <div className="head">
                <NavbarT />
            </div>
            <Player
                component={MyVideo}
                inputProps={{ id: id }}
                durationInFrames={1140}
                compositionWidth={1080}
                compositionHeight={1920}
                fps={60}
                style={{ width: "100%", height: "100%", position: "absolute", top: "0%" }}
                controls
                autoPlay
            />
            
            {(
          allowSwipe &&(
            <>
            <SwipeUp onSwipeUp={handleSwipeUp} />
            <Article 
          title="Sounkamba Sylla, médaillée d’or ! "
          subtitle="Athlétisme : 400m" 
          content="A moins d’un an des Jeux Olympiques de Paris 2024, le sport français s’organise pour répondre présent. Si pour les stars tricolores, la voie est toute tracée pour représenter la France, pour certains athlètes, la tâche est plus complexe. En Mayenne, la spécialiste du 400 mètres Sounkamba Sylla a décidé de tout sacrifier pour réaliser son rêve olympique."
        />
            </>
          )
          
        )}
    </div>
    );
}

export default VideoPlayer;
