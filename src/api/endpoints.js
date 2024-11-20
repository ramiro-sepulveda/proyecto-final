import dotenv from 'dotenv';

dotenv.config();  // Cargar las variables de entorno
const BASE_URL = process.env.BASE_URL

const ENDPOINTS = {
    readGaleria: `${BASE_URL}/galeria`,
    createProducto: `${BASE_URL}/productos`,
    updateProducto: (id) => `${BASE_URL}/productos/${id}`,
    deleteProducto: (id) => `${BASE_URL}/productos/${id}`,
};

export default ENDPOINTS;