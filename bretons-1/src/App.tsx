import { Player } from "@remotion/player";
import { MyComp } from "./remotion/MyComp";
import './App.css'

function App() {

  return (
    <Player
      component={MyComp}
      inputProps={{ text: "Malo" }}
      durationInFrames={240}
      compositionWidth={1920}
      compositionHeight={1080}
      fps={30}
      style={{
        width: 1280,
        height: 720,
      }}
      controls
    />
  );
}

export default App
