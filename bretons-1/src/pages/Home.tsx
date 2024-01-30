import ControlledCarousel from '../components/carousel';
import './Home.css';
import OffcanvasExample from '../components/Navbar'
import VideoList from '../components/VideoList'
import Ratio from 'react-bootstrap/Ratio';

export default function Home() {
  return (
    <div style={{ width: 480, height: 'auto', margin: '0 auto'}} className='main'>
        <Ratio aspectRatio = "9x16">
            <div className="container">
                <div className="head">
                    <OffcanvasExample />
                </div>
                <div className='main_app'>
                    <div className="app">
                        <div className="Carousel">
                            <ControlledCarousel />
                        </div>
                    </div>
                </div>
                <div className="main_video">
                    <VideoList />
                </div>
            </div>
        </Ratio>
    </div>
  )
}