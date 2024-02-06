import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VideoPlayerPage from './pages/VideoPlayerPage';
import MySave from './pages/MySave';
import Credits from './pages/Credits';

export default function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
          <Route path="bretons-1" element={<Home />} />
          <Route path="bretons-1/MySave" element={<MySave />} />
          <Route path="bretons-1/VideoPlayer" element={<VideoPlayerPage />} />
          <Route path="bretons-1/Credits" element={<Credits />} />
        </Routes>
      </Router>
    </div>
  );
}