import { createContext, useState, useEffect } from "react";

export const PizzasContext = createContext();

const PizzasProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carrito, setCarrito] = useState([]);

  const getPizzas = async () => {
    try {
      const response = await fetch("/mamma-mia/pizzas.json");
      const data = await response.json();
      setPizzas(data);
    } catch (error) {
      console.log("error fetch JSON");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPizzas() ;
  }, []);

  return (
    <PizzasContext.Provider value={{ pizzas, loading, carrito, setCarrito }}>
      {children}
    </PizzasContext.Provider>
  );
};
export default PizzasProvider;
