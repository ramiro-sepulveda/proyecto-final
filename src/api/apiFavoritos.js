import ENDPOINTS from "./endpoints";
import { useContext } from "react";
import { MarketContext } from "../context/ContextMarket";

// Obtener los productos favoritos de un usuario
const obtenerFavoritos = async (usuarioId) => {
    try {
      const response = await fetch(`${ENDPOINTS.obtenerFavoritos}/${usuarioId}`);
      const data = await response.json();
      console.log(data); // Verifica aquí si los datos están bien estructurados
      setFavoritos(data);
      return data;
    } catch (error) {
      console.error("Error al obtener los favoritos:", error);
    }
  };
// Agregar un producto a favoritos
const agregarFavorito = async (productoId, usuarioId) => {
    try {
        const response = await fetch(ENDPOINTS.agregarFavorito, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ producto_id: productoId, usuario_id: usuarioId })
        });
        const data = await response.json();
        console.log("Producto añadido a favoritos:", data);
        return data;
    } catch (error) {
        console.error("Error al añadir el producto a favoritos:", error);
    }
};

// Eliminar un producto de favoritos
const eliminarFavorito = async (productoId, usuarioId) => {
    try {
        const response = await fetch(ENDPOINTS.eliminarFavorito, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ producto_id: productoId, usuario_id: usuarioId })
        });
        const data = await response.json();
        console.log("Producto eliminado de favoritos:", data);
        return data;
    } catch (error) {
        console.error("Error al eliminar el producto de favoritos:", error);
    }
};
export const apiFavoritos = { obtenerFavoritos, agregarFavorito, eliminarFavorito };

