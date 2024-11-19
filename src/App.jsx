import "./App.css";
import Navigation from "./components/Navigation";
import HomePage from "./views/HomePage";
import Galeria from "./views/Galeria";
import ProductoDetails from "./views/ProductoDetails";
import CarritoList from "./views/CarritoList";
import Registro from "./views/Registro";
import Login from "./views/Login";
import NewPost from "./views/NewPost";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import PerfilUsuario from "./views/PerfilUsuarrio";
import Favoritos from "./views/Favoritos";

function App() {
  return (
    <>
      <div className="app">
        <Navigation />
        <div className="contenido" style={{ marginTop: '56px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/producto/:name" element={<ProductoDetails />} />
            <Route path="/carrito/" element={<CarritoList />} />
            <Route path="/perfil/" element={<PerfilUsuario />} />
            <Route path="/galeria/" element={<Galeria />} />
            <Route path="/registro/" element={<Registro />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/publicar/" element={<NewPost  />} />
            <Route path="/favoritos/" element={<Favoritos  />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
