import './Home.css';
import VideoPlayer from '../components/VideoPlayer';
import Ratio from 'react-bootstrap/Ratio';

export default function VideoPlayerPage() {
  return (
    <div style={{ width: 480, height: 'auto', margin: '0 auto'}} className='main'>
        <VideoPlayer id={''} title={''} subtitle={''} thumbnail={''} description={''} article={null}></VideoPlayer>
    </div>
  )
}