import ENDPOINTS from "./endpoints";


const getProductos = async () => {

    try {

        const response = await fetch(ENDPOINTS.readGaleria);
        const data = await response.json();
        console.log(data.results)
        return data
    } catch (error) {
        console.log("error fetch JSON");

    };
}

const detallePublicacion = async (id) => {
    try {
        const response = await fetch(ENDPOINTS.detallePublicacion(id))
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error:", error.message);
        // Lanzar el error para manejarlo desde el front
        throw error;
    }
}

export const apiPublicaciones = { getProductos, detallePublicacion }
