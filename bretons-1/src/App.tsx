import ControlledCarousel from './components/carousel';
import './App.css';
import OffcanvasExample from './components/Navbar'
import VideoList from './components/VideoList'
function App() {
  return (
    <div>
      <div className="head">
        <OffcanvasExample/>
      </div>
      <div className="app">
        <ControlledCarousel />
      </div>
      <div className="app">
        <VideoList/>
      </div>
    </div>
  );
}

export default App;