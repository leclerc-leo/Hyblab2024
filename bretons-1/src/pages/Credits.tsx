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
                            <img src="img/logos/logo-hyblab.png" alt="Logo hyblab" />
                            <img src="img/logos/logo-telegramme.png" alt="Logo Télégramme" />
                            <img src="img/logos/logo-ouestmedia.png" alt="Logo ouestmedia" />
                            <img src="img/logos/logo-polytech.png" alt="Logo polytech" />
                            <img src="img/logos/logo-agr.png" alt="Logo agr" />
                            <img src="img/logos/logo-journalistetours.png" alt="Logo journalistetours" />
                            <img src="img/logos/logo-sciencespo.png" alt="Logo sciencespo" />
                            <img src="img/logos/CcOSI.png" alt="Logo CC OSI" />
                        </div>
                    </div>
                    {/* our names */}
                    <div className="text-content">
                            <p>AURIEDE Nino <br></br>Polytech</p>
                            <p>LE ROUX Malo <br></br>Polytech</p>
                            <p>LIBERT Adrien <br></br>Polytech</p>
                            <p>COURTRAI Arthur <br></br>Polytech</p>
                            <p>KONG Shenhong <br></br>Polytech</p>
                            <p>PAULMIER Pierre <br></br>Polytech</p>
                            <p>BUREAU Camille <br></br>AGR</p>
                            <p>LANDREAU Antonin<br></br>AGR</p>
                            <p>AUDEGOND Anna <br></br>SciencesPo</p>
                            <p>GAULT Lucas <br></br>EPJT</p>
                        </div>
                </div>
            </Ratio>
        </div>

    );
};

export default CreditPage;