import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MySave from './pages/MySave';
import Credits from './pages/Credits';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="bretons-1" element={<Home />} />
        <Route path="bretons-1/MySave" element={<MySave />} />
        <Route path="bretons-1/VideoPlayer" element={<MySave />} />
        <Route path="bretons-1/Credits" element={<Credits />} />
      </Routes>
    </div>
  );
}