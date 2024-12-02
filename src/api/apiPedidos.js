import ENDPOINTS from "./endpoints";

// Función para agregar un pedido
const agregarPedido = async (pedido) => {
    try {
        const response = await fetch(ENDPOINTS.agregarPedido, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem('token')}`, // Incluye el token en el header
            },
            body: JSON.stringify(pedido),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData?.error || `Error al agregar el pedido: ${response.status}`
            );
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al agregar el pedido:", error.message);
        throw error;
    }
};

// Función para obtener pedidos de un comprador
const obtenerPedidos = async (comprador_id) => {
    try {
        const response = await fetch(ENDPOINTS.obtenerPedidos(comprador_id), {
            headers: {
                "Authorization": `${localStorage.getItem('token')}`, // Incluye el token en el header
            },
        });
        if (!response.ok) {
            throw new Error(`Error al obtener los pedidos: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener los pedidos:", error.message);
        throw error;
    }
};

// Función para actualizar el estado de un pedido
const actualizarEstadoPedido = async (id, estado) => {
    try {
        const response = await fetch(ENDPOINTS.actualizarEstadoPedido(id), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem('token')}`, // Incluye el token en el header
            },
            body: JSON.stringify({ estado }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData?.error || `Error al actualizar el pedido: ${response.status}`
            );
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al actualizar el estado del pedido:", error.message);
        throw error;
    }
};

// Exportación de las funciones de pedidos
export const apiPedidos = {
    agregarPedido,
    obtenerPedidos,
    actualizarEstadoPedido
};