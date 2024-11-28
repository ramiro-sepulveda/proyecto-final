// import { Card, Container } from "react-bootstrap";
import TarjetasProductos from "../components/TarjetasProductos";
import SearchBar from "../components/SearchBar";

const Galeria = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log(BASE_URL)
  return (
    <>
      <SearchBar />
      <TarjetasProductos />
    </>
  );
};

export default Galeria;
