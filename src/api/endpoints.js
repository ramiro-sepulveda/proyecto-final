const BASE_URL = import.meta.env.VITE_BASE_URL;

const ENDPOINTS = {
  //Publicaciones
  readGaleria: `${BASE_URL}/galeria`,
  agregarPublicacion: `${BASE_URL}/publicaciones`,
  detallePublicacion: (id) => `${BASE_URL}/publicaciones/${id}`,
  publicacionesUsuarios: (id) => `${BASE_URL}/usuarios/perfil/${id}`,
  eliminarPublicacion: (id) => `${BASE_URL}/publicaciones/${id}`,

  // Carrito
  obtenerProductos: (id) => `${BASE_URL}/carrito/${id}`,
  agregarProducto: `${BASE_URL}/carrito`,
  actualizarCantidad: `${BASE_URL}/carrito`,
  eliminarProducto: `${BASE_URL}/carrito`,

  // Gestion de Usuarios
  loginUsuario: `${BASE_URL}/login`,
  crearUsuario: `${BASE_URL}/registro`,
  tokenUsuario: `${BASE_URL}/usuario/perfil`,
  updateUsuario: `${BASE_URL}/usuario/update_perfil`,
  borrarUsuario: (id) => `${BASE_URL}/usuario/borrar/${id}`,

  // Favoritos
  obtenerFavoritos: (id) => `${BASE_URL}/favoritos/${id}`,
  agregarFavorito: `${BASE_URL}/favoritos`,
  eliminarFavorito: `${BASE_URL}/favoritos`,

  // Categorias
  getCategorias: `${BASE_URL}/categorias`,
};

export default ENDPOINTS;

// //Publicaciones
// router.get("/galeria", publicacionController.readGaleria); // Desplegar Galeria
// router.post("/publicaciones", publicacionController.agregarPublicacion); // Agregar Publicacion
// router.get("/publicaciones/:id", publicacionController.detallePublicacion); //Obtener detalle de una publicacion
// router.get("/usuarios/perfil/:id", publicacionController.publicacionesUsuarios); //Obtener todas las publicaciones de un usuario
// router.delete("/publicaciones/:id", publicacionController.eliminarPublicacion); //Eliminar una publicacion

// //Carrito
// router.post('/carrito', carritoController.agregarProducto); // Agregar producto a carrito                      lista
// router.get('/carrito/:usuario_id', carritoController.obtenerProductos); //Obtener carrito de usuario           lista creo
// router.put('/carrito', carritoController.actualizarCantidad); // Modificar cantidad de producto en Carrito
// router.delete('/carrito', carritoController.eliminarProducto); // Eliminar producto de Carrito

// //Imágenes
// router.post("/publicaciones/imagenes", validarToken, imagenesController.agregarImagenes) // Agregar imagenes a Publicacion
// router.put("/publicaciones/imagenes/:id", validarToken, imagenesController.actualizarImagenes) // Actualizar imagenes de Publicacion
// router.put("/publicaciones/borrar_imagenes/:id", validarToken, imagenesController.borrarImagenes) // Actualizar imagenes con NULL

// //Pedidos
// router.post("/pedidos", pedidosController.agregarPedido) // Agregar producto a tabla de pedidos
// router.get("/pedidos/:comprador_id", pedidosController.obtenerPedidos) //Obtener todos los pedidos de un usuario
// router.put("/pedidos/:id/estado", pedidosController.actualizarEstadoPedido); //Actualizar estado del pedido

// //Favoritos
// router.post('/favoritos', favoritoController.agregarFavorito);
// router.get('/favoritos/:usuario_id', favoritoController.obtenerFavoritos);
// router.delete('/favoritos/:usuario_id', favoritoController.eliminarFavorito);

// //direcciones
// router.post('/direccion', direccionController.agregarDireccion);
// router.get('/direccion/:usuario_id', direccionController.obtenerDireccion);
// router.delete('/direccion/:id', direccionController.eliminarDireccion);

// //Comentarios
// router.post("/comentario/:publicacion_id", validarToken, comentariosController.agregarComentario) // Agregar comentario en una publicacion
// router.get("/comentario/:publicacion_id", comentariosController.obtenerComentarios) // Cargar comentarios de una publicacion
// router.delete("/comentario/:publicacion_id", validarToken, comentariosController.borrarComentario) // Eliminar comentario de usuario
