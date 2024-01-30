import './Home.css';
import OffcanvasExample from '../components/Navbar'
import VideoList from '../components/VideoListItem'
import Ratio from 'react-bootstrap/Ratio';

export default function MySave() {
    return (
        <div style={{ maxWidth: 480, height: 'auto', margin: '0 auto' }} className='main'>
            <Ratio aspectRatio="9x16">
                <div className="container">
                    <div className="head">
                        <OffcanvasExample />
                    </div>
                    <div className="main_video">
                        <div className='titreLike'>
                            <p className='MySave'>Mes enregistrés</p>
                        </div>
                        <VideoList />
                    </div>
                </div>
            </Ratio>
        </div>
    )
}