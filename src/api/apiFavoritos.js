import ENDPOINTS from "./endpoints";
// Obtener los productos favoritos de un usuario

const obtenerFavoritos = async (usuarioId) => {
    try {
        const response = await fetch(ENDPOINTS.obtenerFavoritos(usuarioId));
        const data = await response.json();
        console.log(data); // Verifica aquí si los datos están bien estructurados
        return data;
    } catch (error) {
        console.error("Error al obtener los favoritos:", error);
    }
};
// Agregar un producto a favoritos
const agregarFavorito = async (usuarioId, productoId) => {
    try {
        const response = await fetch(ENDPOINTS.agregarFavorito, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem('token')}`, // Incluye el token en el header
            },
            body: JSON.stringify({ usuario_id: usuarioId, publicacion_id: productoId })
        });
        console.log(response);
        const data = await response.json();
        console.log("Producto añadido a favoritos:", data);
        return data;
    } catch (error) {
        console.error("Error al añadir el producto a favoritos:", error);
    }
};

// Eliminar un producto de favoritos
const eliminarFavorito = async (favId) => {
    try {
        console.log(favId);
        const response = await fetch(ENDPOINTS.eliminarFavorito(favId), {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem('token')}`, // Incluye el token en el header
            },
            body: JSON.stringify({ id: favId })
        });
        console.log(response)
        const data = await response.json();
        console.log("Producto eliminado de favoritos:", data);
        return data;
    } catch (error) {
        console.error("Error al eliminar el producto de favoritos:", error);
    }
};
export const apiFavoritos = { obtenerFavoritos, agregarFavorito, eliminarFavorito };

