import './Home.css';
import VideoPlayer from '../components/VideoPlayer';
import { useParams } from 'react-router-dom';


export default function VideoPlayerPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <div style={{ maxWidth: 480, height: 'auto', margin: '0 auto'}} className='main'>
      {id !== undefined && <VideoPlayer id={id}></VideoPlayer>}
    </div>
  )
}