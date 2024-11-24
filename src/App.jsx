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
import PerfilUsuario from "./views/PerfilUsuario";
import Favoritos from "./views/Favoritos";
import RutasProtegidas from "./views/RutasProtegidas";
import RutasObsoletas from "./views/RutasObsoletas";

function App() {

  return (
    <>
      <div className="app">
        <Navigation />
        <div className="contenido" style={{ marginTop: '56px' }}>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/publicaciones/:id" element={<ProductoDetails />} />
            <Route path="/carrito" element={<CarritoList />} />

            <Route path="/galeria" element={<Galeria />} />

            {/* Rutas privadas, protegidas por el token */}
            <Route element={<RutasProtegidas />}>
              <Route path="/usuarios/perfil/:id" element={<PerfilUsuario />} />
              <Route path="/publicar" element={<NewPost />} />
              <Route path="/favoritos" element={<Favoritos />} />
            </Route>

            {/* Rutas públicas obsoletas con token */}
            <Route element={<RutasObsoletas />}>
              <Route path="/registro" element={<Registro />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
