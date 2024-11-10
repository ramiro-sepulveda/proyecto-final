import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Emoji from "react-emojis";
import { useContext, useEffect } from "react";
import { MarketContext } from '../context/ContextMarket';

const Navigation = () => {
  const { usuario, setUsuario } = useContext(MarketContext);

  // Función para cambiar el estado
  const cambiarEstado = () => {
    setUsuario(!usuario);
  };
  useEffect(() => { console.log("El estado ha cambiado"); }, [setUsuario]);

  if (usuario == false) {
    return (
      <>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/proyecto-final/">MarketPlace</Navbar.Brand>

            <Nav className="mr-auto">
              <Link
                to="#" // Si no necesitas cambiar de página, usa "#" o el valor deseado
                className="nav-link"
                onClick={cambiarEstado} // Cambia el estado al hacer clic
              >
                Cambiar a modo Privado
              </Link>
            </Nav>

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
      </>
    )
  }
  else {
    return (
      <>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/proyecto-final/">MarketPlace</Navbar.Brand>
            <Nav>
              <Link
                to="#" // Si no necesitas cambiar de página, usa "#" o el valor deseado
                className="nav-link"
                onClick={cambiarEstado} // Cambia el estado al hacer clic
              >
                Cambiar a modo Publico
              </Link>
            </Nav>
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/proyecto-final/galeria" className=' border-end pe-4 me-4'>Ver catálogo</Nav.Link>
              <Nav.Link as={Link} to="/proyecto-final/publicar/">Publicar</Nav.Link>
              <Nav.Link as={Link} to="/proyecto-final/registro">Perfil</Nav.Link>
              <Nav.Link as={Link} to="/proyecto-final/carrito/">
                <Emoji emoji="shopping-cart" />
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    )
  }
};

export default Navigation;
