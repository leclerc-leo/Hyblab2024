import ControlledCarousel from './components/carousel';
import OffcanvasExample from './components/Navbar';
import './App.css'; 

function App() {
  return (
    <div className="app">
      <OffcanvasExample/>
      <ControlledCarousel />
    </div>
  );
}

export default App;