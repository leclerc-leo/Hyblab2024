import './Home.css';
import VideoPlayer from '../components/VideoPlayer';
import {useLocation} from 'react-router-dom';


export default function VideoPlayerPage() {
  const location = useLocation();
  const id:string = location.state.id;
  return (
    <div style={{ maxWidth: 480, height: 'auto', margin: '0 auto'}} className='main'>
        <VideoPlayer id={id}></VideoPlayer>
    </div>
  )
}