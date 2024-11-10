import { useContext } from "react";
import { MarketContext } from "../context/ContextMarket";
import { Container, Row, Col } from 'react-bootstrap';
import LoginForm from "../components/LoginForm";

const Login = () => {
  const { usuario, setUsuario } = useContext(MarketContext);

  return (
    // Imagen izquierda
    <Container fluid>
      {/* Fila que contiene las dos columnas */}
      <Row className="min-vh-100 d-flex align-items-center">
        {/* Columna izquierda para la imagen */}
        <Col className="d-flex justify-content-center align-items-center">
          <img
            src="/proyecto-final/imglogin.png"
            alt="Descripción de la imagen"
            className="img-fluid"
          />
        </Col>

        {/* Columna derecha para el formulario */}
        <Col md={6} className="p-5 d-flex">
        <LoginForm />
      </Col>
    </Row>
    </Container >
  )
};

export default Login;