import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const navigation = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand as={Link} to="/proyecto-final/">MarketPlace</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link as={Link} to="/proyecto-final/catalog">Ver catálogo</Nav.Link>
        <Nav.Link as={Link} to="/proyecto-final/carrito/">Inicia sesión</Nav.Link>
        <Nav.Link as={Link} to="/proyecto-final/register">Regístrate</Nav.Link>
        <Nav.Link as={Link} to="/proyecto-final/carrito/">
          <i className="bi bi-cart"></i> 
        </Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);
const Navigation = () => {
  return (
    <Navbar
      fixed="top"
      variant="dark"
      className="navbar border-bottom border-black"
    >
      <Container className="justify-content-start">
        <Link
          to="/proyecto-final/"
          className="fs-4 text-white ms-3 text-decoration-none"
        >
          <Emoji emoji="pizza" /> Marketplace
        </Link>
      </Container>
      <Container className=" justify-content-end">
        <Link
          to="/proyecto-final/galeria/"
          className="text-white ms-3 text-decoration-none"
        > Ver Catálogo
        </Link>
      </Container>
      <Container className=" justify-content-end">
        <Link
          to="/proyecto-final/login/"
          className="text-white ms-3 text-decoration-none"
        > Inicia Sesión
        </Link>
      </Container>
      <Container className=" justify-content-end">
        <Link
          to="/proyecto-final/registro/"
          className="text-white ms-3 text-decoration-none"
        > Registrate
        </Link>
      </Container>
      <Container className=" justify-content-end">
        <Link
          to="/proyecto-final/carrito/"
          className="text-white ms-3 text-decoration-none"
        >
          <Emoji emoji="shopping-cart" /> <Carrito />
        </Link>
      </Container>
    </Navbar>
  );
};

export default navigation;
