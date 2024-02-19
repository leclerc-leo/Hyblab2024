import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import BurgerMenu from './BurgerMenu';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function NavbarT() {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/')
  };
    return (
      <>
        {['xxxl'].map((expand, index) => (
          <div key={index.toString()} className='Navbar'>
            <Navbar fixed="top" expand={expand} className="bg-body-tertiary">
              <Container fluid>
                <Navbar.Brand><img src="img/Logo.svg" onClick={() => handleLogoClick()} alt='Logo' /></Navbar.Brand>
                <BurgerMenu></BurgerMenu>
              </Container>
            </Navbar>
          </div>
        ))}
      </>
    );
  }
  
  export default NavbarT;