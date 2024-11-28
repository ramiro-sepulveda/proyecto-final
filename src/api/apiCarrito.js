import ENDPOINTS from "./endpoints";

const obtenerProductos = async (publicacionId) => {
  const response = await fetch(ENDPOINTS.obtenerProductos(publicacionId));
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Error HTTP: ${response.status}, Response: ${errorText}`);
    throw new Error(`Error HTTP: ${response.status}`);
  }
  const data = await response.json();
  console.log("Datos obtenidos:", data); // Ver los datos aquí
  return data;
};
const agregarProducto = async (usuarioId, publicacionId, img1_portada) => {
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

    // Añadir la imagen directamente si fue pasada como argumento
    const productoConImagen = { ...data, img1_portada };

    console.log("Producto añadido al carrito:", productoConImagen);
    return productoConImagen;
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

const eliminarProducto = async (publicacion_id, usuario_id) => {
  try {
    const response = await fetch(ENDPOINTS.eliminarProducto, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        publicacion_id: publicacion_id, // Usar los parámetros directamente
        usuario_id: usuario_id,
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
