import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiFavoritos } from "../api/apiFavoritos"; // Ajusta la ruta según la ubicación de tu archivo apiFavoritos.jsx
import ENDPOINTS from "../api/endpoints";

export const MarketContext = createContext();

const MarketProvider = ({ children }) => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carrito, setCarrito] = useState([]);
  const [favoritos, setFavoritos] = useState([]); // Nuevo estado para favoritos
  const [usuario, setUsuario] = useState(false); // Usuario completo
  const [registro, setRegistro] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [categorias, setCategorias] = useState([]);
  const [update, setUpdate] = useState(true);

  const login = (newToken) => {
    localStorage.setItem("token", "Bearer " + newToken);
    setToken(localStorage.getItem("token"));
    setIsAuthenticated(true);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUsuario("")
    navigate("/");
    console.log("Logout")
  };

  const fetchFavoritos = async () => {
    try {
      console.log(usuario)
      if (usuario) {
        // Verifica si el usuario tiene un ID válido
        const favoritos2 = await apiFavoritos.obtenerFavoritos(usuario.id);
        if (favoritos !== favoritos2) {
          setFavoritos(favoritos2);
          console.log("Favoritos actualizados:", favoritos);
        } else {
          console.log("Favoritos esta al dia"); // Pasa el usuarioId correcto
        }
      }
      else {
        console.log("No hay ningun usuario logeado");
      }
    } catch (error) {
      console.error("Error al obtener los favoritos:", error);
    }
  };


  useEffect(() => {
    fetchFavoritos()
  }, [usuario, update]);

  useEffect(() => {
    const dataCategorias = async () => {
      try {
        const response = await fetch(ENDPOINTS.getCategorias);
        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        console.log("error fetch JSON");
      }
    };
    dataCategorias().then((data) => {
      setCategorias(data);
    });
    console.log(categorias);
  }, [usuario]);

  return (
    <MarketContext.Provider
      value={{
        setProductos,
        token,
        setToken,
        setIsAuthenticated,
        isAuthenticated,
        login,
        logout,
        registro,
        setRegistro,
        productos,
        loading,
        carrito,
        setCarrito,
        favoritos,
        setFavoritos,
        usuario,
        setUsuario,
        setLoading,
        categorias,
        setUpdate,
        update,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export default MarketProvider;
