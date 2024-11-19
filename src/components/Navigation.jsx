import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Emoji from "react-emojis";
import { useContext, useEffect } from "react";
import { MarketContext } from '../context/ContextMarket';
import Carrito2 from './Carrito2';


const Navigation = () => {
  const { usuario, setUsuario } = useContext(MarketContext);

  // Función para cambiar el estado
  const cambiarEstado = () => {
    setUsuario(!usuario);
  };
  useEffect(() => { console.log("El estado ha cambiado"); }, [setUsuario]);

  if (usuario == false) {
    return (
      // VISUALIZACION EN MODO PUBLICO
      <>
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
          <Container>
            <Navbar.Brand as={Link} to="/">MarketPlace</Navbar.Brand>

            <Nav className="mr-auto">
              <Link
                to="#"
                className="nav-link"
                onClick={cambiarEstado}
              >
                Cambiar a modo Privado
              </Link>
            </Nav>

            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/galeria" className=' border-end pe-4 me-4'>Ver catálogo</Nav.Link>
              <Nav.Link as={Link} to="/login/">Inicia sesión</Nav.Link>
              <Nav.Link as={Link} to="/registro">Regístrate</Nav.Link>
              <Nav.Link as={Link} to="/carrito/">
                <Emoji emoji="shopping-cart" /><Carrito2 />
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    )
  }
  else {
    return (
      // VISUALIZACION EN MODO PRIVADO
      <>
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
          <Container>
            <Navbar.Brand as={Link} to="/">MarketPlace</Navbar.Brand>
            <Nav>
              <Link
                to="#" 
                className="nav-link"
                onClick={cambiarEstado}
              >
                Cambiar a modo Publico
              </Link>
            </Nav>
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/galeria" className=' border-end pe-4 me-4'>Ver catálogo</Nav.Link>
              <Nav.Link as={Link} to="/publicar/">Publicar</Nav.Link>
              <Nav.Link as={Link} to="/perfil">Perfil</Nav.Link>
              <Nav.Link as={Link} to="/favoritos/">Favoritos</Nav.Link>
              <Nav.Link as={Link} to="/carrito/">
                <Emoji emoji="shopping-cart" /> <Carrito2 />
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    )
  }
};

export default Navigation;
