import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import BurgerMenu from './BurgerMenu';
import './Navbar.css';

function NavbarT() {
    return (
      <>
        {['xxxl'].map((expand, index) => (
          <div key={index.toString()} className='Navbar'>
            <Navbar fixed="top" expand={expand} className="bg-body-tertiary">
              <Container fluid>
                <Navbar.Brand><img src="/bretons-1/img/Logo_Treact.png" alt='Logo' /></Navbar.Brand>
                <BurgerMenu></BurgerMenu>
              </Container>
            </Navbar>
          </div>
        ))}
      </>
    );
  }
  
  export default NavbarT;