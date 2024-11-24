import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Emoji from "react-emojis";
import { useContext, useEffect } from "react";
import { MarketContext } from '../context/ContextMarket';
import Carrito2 from './Carrito2';
import { apiUsuarios } from '../api/apiUsuarios';


const Navigation = () => {
  const { usuario, setUsuario, token, setToken, setIsAuthenticated, isAuthenticated, logout } = useContext(MarketContext);

  useEffect(() => {
    if (token) {
      apiUsuarios.tokenUsuario(token)
        .then((data) => {
          setIsAuthenticated(true),
            setUsuario(data[0])
        }
        )
        .catch((error) => {
          setIsAuthenticated(false)
          localStorage.removeItem('token')
        })
    }
  }
    , [token, isAuthenticated]);


  if (!isAuthenticated) {
    return (
      // VISUALIZACION EN MODO PUBLICO
      <>
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
          <Container>
            <Navbar.Brand as={Link} to="/">MarketPlace</Navbar.Brand>

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

            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/galeria" className=' border-end pe-4 me-4'>Ver catálogo</Nav.Link>
              <Nav.Link as={Link} to="/publicar/">Publicar</Nav.Link>
              <Nav.Link as={Link} to="/perfil">Perfil</Nav.Link>
              <Nav.Link as={Link} to="/favoritos/">Favoritos</Nav.Link>
              <Nav.Link as={Link} to="/carrito/">
                <Emoji emoji="shopping-cart" /> <Carrito2 />
              </Nav.Link>
              <Nav.Link as={Link} to="/" onClick={logout}>LogOut</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    )
  }
};

export default Navigation;
