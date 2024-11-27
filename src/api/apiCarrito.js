import ENDPOINTS from "./endpoints";

const obtenerProductos = async (usuarioId) => {
  try {
    const response = await fetch(ENDPOINTS.obtenerProductos(usuarioId));
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
  }
};

const agregarProducto = async (usuarioId, publicacionId) => {
  try {
    const response = await fetch(ENDPOINTS.agregarProducto, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario_id: usuarioId,
        publicacion_id: publicacionId,
        cantidad: 1,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log("Producto añadido al carrito:", data);
    return data; 
  } catch (error) {
    console.error("Error al añadir el producto al carrito:", error.message);
    throw error;
  }
};

const actualizarCantidad = async ({ usuario_id, publicacion_id, cantidad }) => {
  try {
    const response = await fetch(ENDPOINTS.actualizarCantidad, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usuario_id, publicacion_id, cantidad }),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log("Cantidad actualizada:", data);
    return data;
  } catch (error) {
    console.error("Error al actualizar cantidad:", error.message);
    throw error;
  }
};

const eliminarProducto = async (productoId, usuarioId) => {
  try {
    const response = await fetch(ENDPOINTS.eliminarProducto, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        publicacion_id: productoId,
        usuario_id: usuarioId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log("Producto eliminado del carrito:", data);
    return data; // Devuelve la respuesta si necesitas usarla
  } catch (error) {
    console.error("Error al eliminar el producto del carrito:", error.message);
    throw error;
  }
};


export const apiCarrito = {
  obtenerProductos,
  agregarProducto,
  actualizarCantidad,
  eliminarProducto,
};
