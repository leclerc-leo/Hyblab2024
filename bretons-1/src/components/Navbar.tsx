import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import BurgerMenu from './BurgerMenu';
import './Navbar.css';

function OffcanvasExample() {
    return (
        <>
            {['xxxl'].map((expand, index) => (
                <Navbar fixed="top" key={index.toString()} expand={expand} className="bg-body-tertiary" data-bs-theme="light">
                    <Container fluid>
                        <Navbar.Brand><img src="/bretons-1/img/Logo_Treact.png" alt='Logo' /></Navbar.Brand>
                        <BurgerMenu></BurgerMenu>
                    </Container>
                </Navbar>
            ))}
        </>
    );
}

export default OffcanvasExample;