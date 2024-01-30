import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VideoPlayerPage from './pages/VideoPlayerPage';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="bretons-1" element={<Home />} />
        <Route path="VideoPlayer" element={<VideoPlayerPage />} />
      </Routes>
    </div>
  );
}