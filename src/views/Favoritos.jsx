// import { Card, Container } from "react-bootstrap";
import TarjetasFavoritos from "../components/TarjetasFavoritos";

const Favoritos = () => {
  return (
    <>
        <div className="text-center mt-5">
            <h1>Mis Favoritos</h1>
        </div>
        <TarjetasFavoritos />
    </>
  );
};

export default Favoritos;
