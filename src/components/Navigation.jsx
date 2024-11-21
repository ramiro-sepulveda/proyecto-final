import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Emoji from "react-emojis";
import { useContext, useEffect } from "react";
import { MarketContext } from '../context/ContextMarket';
import Carrito2 from './Carrito2';


const Navigation = () => {
  const { usuario, setUsuario, token, setToken, setIsAuthenticated, isAuthenticated, logout } = useContext(MarketContext);

  console.log(token)
  useEffect(() => {
    // Verificar si el token está vigente
    setToken(sessionStorage.getItem('token'))
    if (token) {
      // Verificar si el token ha expirado (si el token tiene una fecha de expiración)
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const expirationDate = decodedToken.exp * 1000; // Convertir a milisegundos
      const currentTime = Date.now();
      console.log('fecha actua: ' + currentTime)
      console.log('fecha expiracion: ' + expirationDate)
      if (currentTime > expirationDate) {
        setToken(null); // Si el token ha expirado, eliminarlo
        sessionStorage.removeItem('token');
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true); // Si el token es válido, mantener la sesión activa
      }
    } else {
      setIsAuthenticated(false); // Si no hay token, no está autenticado
    }
  }
    , [token, isAuthenticated]);


  // Función para cambiar el estado
  const cambiarEstado = () => {
    setUsuario(!usuario);
  };
  useEffect(() => { console.log("El estado ha cambiado"); }, [setUsuario]);

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
