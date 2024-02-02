import './Credit.css';
import NavbarT from '../components/Navbar'
import Ratio from 'react-bootstrap/Ratio';

const CreditPage = () => {
    return (
        <div style={{ maxWidth: 480, height: 'auto', margin: '0 auto' }} className='main'>
            <Ratio aspectRatio="9x16">
                <div className="container">
                    <div className="head">
                        <NavbarT />
                    </div>
                    <div className="credit-container">
                        <div className="credit-logos">
                            <img src="logo1.png" alt="Logo 1" />
                            <img src="logo2.png" alt="Logo 2" />
                        </div>
                    </div>
                </div>
            </Ratio>
        </div>
    );
};

export default CreditPage;