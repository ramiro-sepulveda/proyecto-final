import ENDPOINTS from "./endpoints";


const getProductos = async () => {

    try {
        const response = await fetch(ENDPOINTS.readGaleria);
        const data = await response.json();
        console.log(data.results)
        return data
    } catch (error) {
        console.log("error fetch JSON");

    }
}

const readGaleria = async () => {
    try {
        const response = await fetch(ENDPOINTS.readGaleria);
        if (!response.ok) {
            throw new Error(`Error al obtener la galería: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener la galería:", error.message);
        throw error;
    }
};

const agregarPublicacion = async (publicacion) => {
    try {
        const response = await fetch(ENDPOINTS.agregarPublicacion, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(publicacion),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData?.error || `Error al agregar la publicación: ${response.status}`
            );
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al agregar la publicación:", error.message);
        throw error;
    }
};

const detallePublicacion = async (id) => {
    try {
        const response = await fetch(ENDPOINTS.detallePublicacion(id));
        if (!response.ok) {
            throw new Error(`Error al obtener el detalle: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener el detalle de la publicación:", error.message);
        throw error;
    }
};

const publicacionesUsuarios = async (id) => {
    try {
        const response = await fetch(ENDPOINTS.publicacionesUsuarios(id));
        if (!response.ok) {
            throw new Error(`Error al obtener las publicaciones del usuario: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener las publicaciones del usuario:", error.message);
        throw error;
    }
};

const eliminarPublicacion = async (id) => {
    console.log("ID de la publicación que se va a eliminar:", id); // Verifica el ID
    try {
        const response = await fetch(ENDPOINTS.eliminarPublicacion(id), {
            method: "DELETE",
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error del servidor:", errorData);
            throw new Error(
                errorData?.error || `Error al eliminar la publicación: ${response.status}`
            );
        }
        return "Publicación eliminada con éxito.";
    } catch (error) {
        console.error("Error al eliminar la publicación:", error.message);
        throw error;
    }
};

export const apiPublicaciones = { 
    getProductos, 
    readGaleria,
    agregarPublicacion,
    detallePublicacion,
    publicacionesUsuarios,
    eliminarPublicacion, }

