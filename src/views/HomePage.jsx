import { Button } from 'react-bootstrap';
import '../HomePage.css';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {

  const navigate = useNavigate();
  const irAGaleria = () => navigate('/galeria');

  return (

  <>
<div className="main-container">
  <div className="hero-section">
    <h1
      style={{
        textShadow:
          "-1px -1px 10px rgba(0,0,0,0.50), 1px -1px 10px rgba(0,0,0,0.50), -1px 1px 10px rgba(0,0,0,0.50), 1px 1px 10px rgba(0,0,0,0.50)",
        zIndex: 2, // Asegúrate de que el texto esté encima del filtro
      }}
    >
      Tecnología al alcance de todos
    </h1>
    <h4 style={{ zIndex: 2 }}>
      Descubre nuestra amplia selección de productos tecnológicos y súmate a la
      revolución del reciclaje digital.
    </h4>
    <Button
      variant="warning"
      className="search-button"
      onClick={irAGaleria}
      style={{ zIndex: 2 }}
    >
      Buscar productos
    </Button>
  </div>
</div>
  </>
  )};
export default MainPage;