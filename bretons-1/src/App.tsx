import ControlledCarousel from './components/carousel';
import './App.css';
import OffcanvasExample from './components/Navbar'
import VideoList from './components/VideoList'
function App() {
  return (
    <div className="container">
      <div className="head">
        <OffcanvasExample />
      </div>
      <div className='main_app'>
        <div className="app">
          <div className="Carousel">
            <ControlledCarousel />
          </div>
        </div>
      </div>
      <div className="main_video">
        <VideoList />
      </div>
    </div>

  );
}

export default App;