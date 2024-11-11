import { createContext, useState, useEffect } from "react";

export const MarketContext = createContext();

const MarketProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState(false);

  const getproductos = async () => {
    try {
      const response = await fetch("/proyecto-final/productos.json");
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.log("error fetch JSON");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getproductos();
  }, []);

  useEffect(() => {
    console.log("Carrito actualizado:", carrito);
  }, [carrito]);
  

  return (
    <MarketContext.Provider value={{ productos, loading, carrito, setCarrito, usuario, setUsuario }}>
      {children}
    </MarketContext.Provider>
  );
};
export default MarketProvider;
