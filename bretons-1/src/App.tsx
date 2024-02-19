import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VideoPlayerPage from './pages/VideoPlayerPage';
import MySave from './pages/MySave';
import Credits from './pages/Credits';

export default function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Home" element={<Home />} />
        <Route path="MySave" element={<MySave />} />
        <Route path="VideoPlayer/:id" element={<VideoPlayerPage />} />
        <Route path="Credits" element={<Credits />} />
      </Routes>
    </div>
  );
}