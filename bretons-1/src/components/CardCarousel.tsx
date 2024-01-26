import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ImageGenerique from '../assets/sportif_velo.jpeg';

function KitchenSinkExample() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={ImageGenerique}/>{/* Ici une image lié à l'athlète sera mis */}
      <Card.Body>
        <Card.Title>Card Title</Card.Title> {/* Titre de a vidéo*/}
      </Card.Body>
    </Card>
  );
}

export default KitchenSinkExample;