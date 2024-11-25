import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const BASE_URL = import.meta.env.VITE_BASE_URL;

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
  const [categorias, setCategorias] = useState()

  const getCategorias = async () => {
    try {
      const response = await fetch(`${BASE_URL}/categorias`);
      const data = await response.json();
      console.log(data)
      return data
    } catch (error) {
      console.error("error fetch JSON", error);

    };
  }

  const login = (newToken) => {
    localStorage.setItem('token', 'Bearer ' + newToken); // Guardar el token en localStorage
    setToken(localStorage.getItem('token'));
    setIsAuthenticated(true);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/')
  };


  useEffect(() => {
    getCategorias()
      .then((data) => setCategorias(data))
      .catch((error) => console.error(error))
    console.log("Carrito actualizado:", carrito);
  }, [carrito]);

  return (
    <MarketContext.Provider value={{ categorias, setProductos, token, setToken, setIsAuthenticated, isAuthenticated, login, logout, registro, setRegistro, productos, loading, carrito, setCarrito, usuario, setUsuario, setLoading }}>
      {children}
    </MarketContext.Provider>
  );
}

export default MarketProvider;
