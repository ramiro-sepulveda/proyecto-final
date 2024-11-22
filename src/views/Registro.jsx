import { useContext, useEffect } from "react";
import { MarketContext } from "../context/ContextMarket";
import { Container, Row, Col, Card } from 'react-bootstrap';
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";


const Registro = () => {
  const { usuario, setUsuario, isAuthenticated } = useContext(MarketContext);
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      // Si el usuario no está logueado, redirige a login
      navigate("/perfil");
    }
  }, [isAuthenticated, navigate]);
  return (
    // Imagen izquierda
    <Container className="p-4">
      {/* Fila que contiene las dos columnas */}
      <Card className="d-flex flex-row w-75 m-auto" style={{ backgroundColor: "#2c3e50", minHeight: "600px" }}>

        <div >
          <img
            src="/imgregistro.png"
            alt="Descripción de la imagen"
            className="img-fluid"
            style={{ height: "100%", minHeight: "600px" }}
          />
        </div>

        {/* Columna derecha para el formulario */}
        <div className="d-flex justify-content-center w-75 py-5">
          <RegisterForm />
        </div>
      </Card>
    </Container >
  )
};

export default Registro;
