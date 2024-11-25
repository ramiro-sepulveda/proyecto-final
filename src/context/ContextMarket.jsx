import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiFavoritos } from '../api/apifavoritos'; // Ajusta la ruta según la ubicación de tu archivo apifavoritos.jsx

export const MarketContext = createContext();

const MarketProvider = ({ children }) => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carrito, setCarrito] = useState([]);
  const [favoritos, setFavoritos] = useState([]);// Nuevo estado para favoritos
  const [usuario, setUsuario] = useState(false); // Usuario completo
  const [registro, setRegistro] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = (newToken) => {
    localStorage.setItem('token', 'Bearer ' + newToken);
    setToken(localStorage.getItem('token'));
    setIsAuthenticated(true);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        if (usuario?.id) {  // Verifica si el usuario tiene un ID válido
          const favoritos2 = await apiFavoritos.obtenerFavoritos(usuario.id);
          if (favoritos2) {
            setFavoritos(favoritos2);
          } 
          else {
            console.log("hola");// Pasa el usuarioId correcto
          
        };
      }} catch (error) {
        console.error("Error al obtener los favoritos:", error);
      }
    };

    fetchFavoritos(); // Llamamos a la función para obtener los favoritos
  }, [usuario]); // El `useEffect` se disparará cuando `usuario` cambie

  useEffect(() => {
    console.log("Favoritos actualizados:", favoritos);
  }, [favoritos]);

  return (
    <MarketContext.Provider value={{
      setProductos, token, setToken, setIsAuthenticated, isAuthenticated, login, logout,
      registro, setRegistro, productos, loading, carrito, setCarrito, favoritos, setFavoritos, 
      usuario, setUsuario, setLoading
    }}>
      {children}
    </MarketContext.Provider>
  );
};

export default MarketProvider;
