import React, { useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { MarketContext } from "../context/ContextMarket";
import { apiCarrito } from "../api/apiCarrito";
import Carrito2 from "../components/Carrito2";

const CarritoList = () => {
  const { carrito, setCarrito, usuario } = useContext(MarketContext); // Asegúrate de obtener usuario

  const handleAumentar = (producto) => {
    const existe = carrito.some((el) => el.publicacion_id === producto.publicacion_id);

    if (!existe) {
        console.error("Producto no encontrado en el carrito");
        return;
    }

    const cantProducto = carrito.find((el) => el.publicacion_id === producto.publicacion_id);

    if (!cantProducto) {
        console.error("Producto no encontrado en el carrito");
        return;
    }

    const cantidadActualizada = {
        usuario_id: usuario.id, // Ahora 'usuario' está definido
        publicacion_id: cantProducto.publicacion_id,
        cantidad: cantProducto.cantidad + 1,
    };

    apiCarrito
        .actualizarCantidad(cantidadActualizada)
        .then((data) => {
            console.log("Cantidad aumentada:", data);
            const nuevoCarrito = carrito.map((el) =>
                el.publicacion_id === cantProducto.publicacion_id
                    ? { ...el, cantidad: data.cantidad }
                    : el
            );
            setCarrito(nuevoCarrito);
        })
        .then(() => {
            // Sincronizar con el servidor después de aumentar la cantidad
            return apiCarrito.obtenerProductos(usuario.id);
        })
        .then((data) => {
            setCarrito(Array.isArray(data) ? data : []);
        })
        .catch((error) => {
            console.error("Error al aumentar cantidad:", error);
        });
  };

  const handleDisminuir = async (producto) => {
    try {
      // Evitar múltiples clics
      if (producto.cantidad <= 0) return; // Si la cantidad es 0 o menos, no hacer nada
  
      const existe = carrito.some((el) => el.publicacion_id === producto.publicacion_id);
  
      if (!existe) {
        console.error("Producto no encontrado en el carrito");
        return;
      }
  
      if (producto.cantidad === 1) {
        // Eliminar producto del carrito
        await apiCarrito.eliminarProducto({
          usuario_id: usuario.id, // Asegúrate de usar el ID del usuario
          publicacion_id: producto.publicacion_id,
        });
  
        // Actualizar el carrito en el estado
        setCarrito(carrito.filter((el) => el.publicacion_id !== producto.publicacion_id));
      } else {
        // Actualizar cantidad del producto
        const actualizado = await apiCarrito.actualizarCantidad({
          usuario_id: usuario.id, // Asegúrate de usar el ID del usuario
          publicacion_id: producto.publicacion_id,
          cantidad: producto.cantidad - 1,
        });
  
        // Actualizar el carrito en el estado
        setCarrito(
          carrito.map((el) =>
            el.publicacion_id === producto.publicacion_id
              ? { ...el, cantidad: actualizado.cantidad }
              : el
          )
        );
      }
    } catch (error) {
      console.error("Error al disminuir cantidad:", error);
    }
  };
  return (
    <Container fluid className="p-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4" style={{ backgroundColor: "#2c3e50", borderRadius: "10px" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="text-light">Carrito</h3>
              <Carrito2 clase="total-amount text-light" />
            </div>
            <Card className="p-3 mb-3" style={{ backgroundColor: "#34495e", borderRadius: "10px" }}>
              {Array.isArray(carrito) && carrito.length === 0 ? (
                <p className="text-light text-center">Tu carrito está vacío</p>
              ) : (
                Array.isArray(carrito) &&
                carrito.map((producto, index) => (
                  <Row
                    key={index}
                    className="align-items-center mb-3"
                    style={{
                      backgroundColor: "#ecf0f1",
                      borderRadius: "8px",
                      padding: "10px 5px",
                    }}
                  >
                    <Col xs={2} className="d-flex justify-content-center">
                      <img
                        src={producto.img}
                        alt={producto.tipo}
                        style={{ width: "40px", height: "40px", borderRadius: "5px" }}
                      />
                    </Col>
                    <Col xs={4}>
                      <p className="mb-0 font-weight-bold">{producto.tipo}</p>
                      <p className="mb-0 text-muted">${producto.precio}</p>
                    </Col>
                    <Col xs={3} className="d-flex justify-content-end align-items-center">
                      <Button variant="secondary" size="sm" onClick={() => handleDisminuir(producto)}>
                        -
                      </Button>
                      <span className="mx-3">{producto.cantidad}</span>
                      <Button variant="secondary" size="sm" onClick={() => handleAumentar(producto)}>
                        +
                      </Button>
                    </Col>
                  </Row>
                ))
              )}
            </Card>
            {Array.isArray(carrito) && carrito.length > 0 && (
              <div className="d-flex justify-content-end">
                <Button variant="warning" style={{ borderRadius: "20px", padding: "5px 20px" }}>
                  Comprar
                </Button>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CarritoList;