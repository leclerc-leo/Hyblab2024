import ControlledCarousel from '../components/CardCarousel';
import './Home.css';
import NavbarT from '../components/Navbar'
import Ratio from 'react-bootstrap/Ratio';

export default function Home() {
    return (
        <div style={{ maxWidth: 480, height: 'auto', margin: '0 auto' }} className='main'>
            <Ratio aspectRatio="9x16">
                <div className="container">
                    <div className="head">
                        <NavbarT />
                    </div>
                    <div className='main_app'>
                        <div className="app">
                        <div className="Carousel">
                                <ControlledCarousel />
                            </div>
                        </div>
                    </div>
                </div>
            </Ratio>
        </div>
    )
}