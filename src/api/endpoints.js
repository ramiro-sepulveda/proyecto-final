
const BASE_URL = import.meta.env.VITE_BASE_URL;

const ENDPOINTS = {
    //Publicaciones
    readGaleria: `${BASE_URL}/galeria`,
    createProducto: `${BASE_URL}/productos`,
    updateProducto: (id) => `${BASE_URL}/productos/${id}`,
    deleteProducto: (id) => `${BASE_URL}/productos/${id}`,

    // Carrito

    // Gestion de Usuarios
    loginUsuario: `${BASE_URL}/login`,
    crearUsuario: `${BASE_URL}/registro`,
};

export default ENDPOINTS;