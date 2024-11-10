import "./App.css";
import Navigation from "./components/Navigation";
import HomePage from "./views/HomePage";
import Galeria from "./views/Galeria";
import PizzaDetails from "./views/PizzaDetails";
import CarritoList from "./views/CarritoList";
import Registro from "./views/Registro";
import Login from "./views/Login";
import NewPost from "./views/NewPost";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import PerfilUsuario from "./views/PerfilUsuarrio";

function App() {
  return (
    <>
      <div className="app">
        <Navigation />
        <div className="contenido">
          <Routes>
            <Route path="/proyecto-final/" element={<HomePage />} />
            <Route path="/proyecto-final/pizza/:name" element={<PizzaDetails />} />
            <Route path="/proyecto-final/carrito/" element={<CarritoList />} />
            <Route path="/proyecto-final/perfil/" element={<PerfilUsuario/>} />
            <Route path="/proyecto-final/galeria/" element={<Galeria />} />
            <Route path="/proyecto-final/registro/" element={<Registro />} />
            <Route path="/proyecto-final/login/" element={<Login />} />
            <Route path="/proyecto-final/publicar/" element={<NewPost  />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
