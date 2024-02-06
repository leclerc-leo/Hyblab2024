import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import VideoPlayerPage from './pages/VideoPlayerPage';
import MySave from './pages/MySave';
import Credits from './pages/Credits';

export default function App() {
  return (
    <div className="App">
    <BrowserRouter basename="/bretons-1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MySave" element={<MySave />} />
        <Route path="/VideoPlayer" element={<VideoPlayerPage />} />
        <Route path="/Credits" element={<Credits />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}