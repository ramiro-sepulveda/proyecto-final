import { Button } from 'react-bootstrap';
import '../HomePage.css';

const MainPage = () => (
  <div className="main-container">
    <div className="hero-section">
      <h1>Marketplace</h1>
      <Button variant="warning" className="search-button">Buscar productos</Button>
    </div>
  </div>
);

export default MainPage;