import ControlledCarousel from './components/carousel';
import './App.css';
import OffcanvasExample from './components/Navbar'

function App() {
  return (
    <div>
      <div className="head">
        <OffcanvasExample/>
      </div>
      <div className="app">
        <ControlledCarousel />
      </div>
    </div>
  );
}

export default App;