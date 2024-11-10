import { Button } from 'react-bootstrap';
import '../HomePage.css';

const MainPage = () => (
  <div className="main-container">
    <div className="hero-section">
      <h1 style={{

        textShadow: "-1px -1px 10px rgba(0,0,0,0.50), 1px -1px 10px rgba(0,0,0,0.50), -1px 1px 10px rgba(0,0,0,0.50), 1px 1px 10px rgba(0,0,0,0.50)"
      }}>Marketplace</h1>
      <Button variant="warning" className="search-button">Buscar productos</Button>
    </div>
  </div>
);

export default MainPage;