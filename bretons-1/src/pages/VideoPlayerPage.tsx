import './Home.css';
import VideoPlayer from '../components/VideoPlayer';
import {useLocation} from 'react-router-dom';


export default function VideoPlayerPage() {
  const location = useLocation();
  console.log(location.state.id);
  return (
    <div style={{ width: 480, height: 'auto', margin: '0 auto'}} className='main'>
        <VideoPlayer id={''} title={''} subtitle={''} thumbnail={''} description={''} article={null}></VideoPlayer>
    </div>
  )
}