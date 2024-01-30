import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VideoPlayerPage from './pages/VideoPlayerPage';
import MySave from './pages/MySave';
export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="bretons-1" element={<Home />} />
        <Route path="bretons-1/MySave" element={<MySave />} />
        <Route path="bretons-1/VideoPlayer" element={<VideoPlayerPage />} />
      </Routes>
    </div>
  );
}