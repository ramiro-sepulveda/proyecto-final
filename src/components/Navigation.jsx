import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Emoji from "react-emojis";

const navigation = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand as={Link} to="/proyecto-final/">MarketPlace</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link as={Link} to="/proyecto-final/galeria" className=' border-end pe-4 me-4'>Ver catálogo</Nav.Link>
        <Nav.Link as={Link} to="/proyecto-final/login/">Inicia sesión</Nav.Link>
        <Nav.Link as={Link} to="/proyecto-final/registro">Regístrate</Nav.Link>
        <Nav.Link as={Link} to="/proyecto-final/carrito/">
          <Emoji emoji="shopping-cart" />
        </Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);

export default navigation;
