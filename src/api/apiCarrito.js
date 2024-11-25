import ENDPOINTS from "./endpoints";
const obtenerProductos = async (usuarioId) => {
    try {
        const response = await fetch(`${ENDPOINTS.obtenerProductos}/${usuarioId}`);
        const data = await response.json();
        setCarrito(data);
        return data;
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
    }
};


const agregarProducto = async (productoId, usuarioId) => {
    try {
        const response = await fetch(ENDPOINTS.agregarProducto, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ publicacion_id: productoId, usuario_id: usuarioId })
        });
        const data = await response.json();
        console.log("Producto añadido al carrito:", data);
        return data
    } catch (error) {
        console.log("Error al añadir el producto al carrito:", error);
    }
};

const actualizarCantidad = async (productoId, usuarioId, nuevaCantidad)=>{
    try {
        const response = await fetch(ENDPOINTS.actualizarCantidad, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ publicacion_id: productoId, usuario_id: usuarioId, cantidad: nuevaCantidad })
        })
        const data = await response.json();
        console.log("cantidad carrito: ",data);
    } catch (error) {
        console.log("Error al actualizar la cantidad del producto en el carrito:", error);
    }
}

const eliminarProducto = async (productoId, usuarioId) =>{
    try {
        const response = await fetch(ENDPOINTS.eliminarProducto, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ publicacion_id: productoId, usuario_id: usuarioId })
        });
        const data = await response.json();
        console.log("producto eliminado del carrito:",data);
    } catch {
        console.log("Error al eliminar el producto del carrito:", error);
    }

};

export const apiCarrito = {obtenerProductos, agregarProducto, actualizarCantidad, eliminarProducto};