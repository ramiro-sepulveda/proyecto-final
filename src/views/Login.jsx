import { Container, Card } from 'react-bootstrap';
import LoginForm from "../components/LoginForm";


const Login = () => {

  return (
    // Imagen izquierda
    <Container className="p-4">
      <Card className="d-flex flex-row w-75 m-auto" style={{ backgroundColor: "#2c3e50", minHeight: "600px" }}>

        <div >
          <img
            src="/imglogin.png"
            alt="Descripción de la imagen"
            className="img-fluid"
            style={{ height: "100%", minHeight: "600px" }}
          />
        </div>

        {/* Columna derecha para el formulario */}
        <div className="d-flex justify-content-center w-75">
          <LoginForm />
        </div>


      </Card>
    </Container >
  )
};

export default Login;
