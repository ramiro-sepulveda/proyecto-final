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
            <Route path="/proyecto-final/" element={<HomePage />} />
            <Route path="/proyecto-final/producto/:name" element={<ProductoDetails />} />
            <Route path="/proyecto-final/carrito/" element={<CarritoList />} />
            <Route path="/proyecto-final/perfil/" element={<PerfilUsuario />} />
            <Route path="/proyecto-final/galeria/" element={<Galeria />} />
            <Route path="/proyecto-final/registro/" element={<Registro />} />
            <Route path="/proyecto-final/login/" element={<Login />} />
            <Route path="/proyecto-final/publicar/" element={<NewPost  />} />
            <Route path="/proyecto-final/favoritos/" element={<Favoritos  />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
