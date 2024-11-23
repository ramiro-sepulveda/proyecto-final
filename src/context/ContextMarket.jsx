import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const MarketContext = createContext();

const MarketProvider = ({ children }) => {
  const navigate = useNavigate()
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState(false);
  const [registro, setRegistro] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token')); // Traer el token de localStorage


  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', 'Bearer ' + newToken); // Guardar el token en localStorage
    setIsAuthenticated(true);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/')
  };

  useEffect(() => {
    console.log("Carrito actualizado:", carrito);
  }, [carrito]);


  return (
    <MarketContext.Provider value={{ setProductos, token, setToken, setIsAuthenticated, isAuthenticated, login, logout, registro, setRegistro, productos, loading, carrito, setCarrito, usuario, setUsuario, setLoading }}>
      {children}
    </MarketContext.Provider>
  );
}

export default MarketProvider;
