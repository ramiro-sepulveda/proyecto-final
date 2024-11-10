import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const navigation = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand as={Link} to="/proyecto-final/">MarketPlace</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link as={Link} to="/proyecto-final/catalog">Ver catálogo</Nav.Link>
        <Nav.Link as={Link} to="/proyecto-final/login/">Inicia sesión</Nav.Link>
        <Nav.Link as={Link} to="/proyecto-final/register">Regístrate</Nav.Link>
        <Nav.Link as={Link} to="/proyecto-final/carrito/">carrito</Nav.Link>
        <Nav.Link as={Link} to="/proyecto-final/perfil/">perfil</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);

export default navigation;
