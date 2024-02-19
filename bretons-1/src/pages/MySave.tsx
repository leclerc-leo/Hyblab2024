import NavbarT from '../components/Navbar'
import VideoList from '../components/VideoListItem'
import Ratio from 'react-bootstrap/Ratio';
import './MySave.css'

export default function MySave() {
    return (
        <div style={{ maxWidth: 480, height: 'auto', margin: '0 auto' }} className='main'>
            <Ratio aspectRatio="9x16">
                <div className="container">
                    <div className="head">
                        <NavbarT />
                    </div>
                    <div className="main_video">
                        <div className='titresave'>
                            <p className='MySave'>Mes enregistrés</p>
                        </div>
                        <VideoList />
                    </div>
                </div>
            </Ratio>
        </div>
    )
}