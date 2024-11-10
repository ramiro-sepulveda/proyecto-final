import { createContext, useState, useEffect } from "react";

export const MarketContext = createContext();

const MarketProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState([]);

  const getPizzas = async () => {
    try {
      const response = await fetch("/proyecto-final/pizzas.json");
      const data = await response.json();
      setPizzas(data);
    } catch (error) {
      console.log("error fetch JSON");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPizzas();
  }, []);

  return (
    <MarketContext.Provider value={{ pizzas, loading, carrito, setCarrito, usuario, setCarrito }}>
      {children}
    </MarketContext.Provider>
  );
};
export default MarketProvider;
