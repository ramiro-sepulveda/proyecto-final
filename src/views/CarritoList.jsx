import React, { useContext, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { MarketContext } from "../context/ContextMarket";
import { apiCarrito } from "../api/apiCarrito";
import Carrito2 from "../components/Carrito2";
import { useNavigate } from "react-router-dom";

const CarritoList = () => {
  const { carrito, setCarrito, usuario } = useContext(MarketContext); // Asegúrate de obtener usuario

  const navigate = useNavigate()

  const irAPedidos = () => navigate('/pedidos');

  const handleAumentar = async (producto) => {
    if (!usuario) {
      if (carrito.find((el) => el.publicacion_id === producto.publicacion_id)) {
        setCarrito(
          carrito.map((el) =>
            el.publicacion_id === producto.publicacion_id
              ? { ...el, cantidad: el.cantidad + 1 }
              : el
          ))
        console.log(carrito)
      }
      else {
        setCarrito([...carrito, { publicacion_id: publicacionId, img1_portada: img, precio: precio, cantidad: 1, }])
        return;
      }
    } else {
      try {
        const existe = carrito.some(
          (el) => el.publicacion_id === producto.publicacion_id
        );

        if (!existe) {
          console.error("Producto no encontrado en el carrito");
          return;
        }

        const cantProducto = carrito.find(
          (el) => el.publicacion_id === producto.publicacion_id
        );

        if (!cantProducto) {
          console.error("Producto no encontrado en el carrito");
          return;
        } else {
          const cantidadActualizada = {
            usuario_id: usuario.id,
            publicacion_id: producto.publicacion_id,
            cantidad: producto.cantidad + 1,
          };
          const response = await apiCarrito.actualizarCantidad(cantidadActualizada)
            .then((data) => {
              const nuevoCarrito = carrito.map((producto) =>
                producto.publicacion_id === cantProducto.publicacion_id
                  ? { ...producto, cantidad: data.cantidad }
                  : producto
              );
              setCarrito(nuevoCarrito);
            })
            .then(() => {
              // Sincronizar con el servidor después de actualizar
              apiCarrito.obtenerProductos(usuario.id).then((data) => {
                setCarrito(Array.isArray(data) ? data : []);
              });
            })
            .catch((error) => {
              console.error("Error al actualizar la cantidad:", error);
            });
        }
      } catch (error) {
        console.error("Error al aumentar cantidad:", error);
      }
    }
  }



  const handleDisminuir = async (producto) => {
    if (!usuario) {
      console.log("")
      if (producto.cantidad === 1) {
        console.log(carrito[0].publicacion_id)
        console.log(producto.publicacion_id)
        setCarrito(
          carrito.filter((el) =>
            el.publicacion_id !== producto.publicacion_id
          ))
        console.log(carrito)
      }
      else {
        setCarrito(
          carrito.map((el) =>
            el.publicacion_id === producto.publicacion_id
              ? { ...el, cantidad: el.cantidad - 1 }
              : el
          ))
        console.log(carrito)

      }
    }
    else {
      if (producto.cantidad === 1) {
        await apiCarrito.eliminarProducto(producto.publicacion_id, usuario.id);
        setCarrito(
          carrito.filter((el) => el.publicacion_id !== producto.publicacion_id)
        );

        if (response.success) {
          const nuevoCarrito = carrito.filter(
            (el) => el.publicacion_id !== producto.publicacion_id
          );
          setCarrito(nuevoCarrito);
          console.log("Producto eliminado del carrito");
        }
      } else {
        try {
          const existe = carrito.some(
            (el) => el.publicacion_id === producto.publicacion_id
          );

          if (!existe) {
            console.error("Producto no encontrado en el carrito");
            return;
          }

          const cantProducto = carrito.find(
            (el) => el.publicacion_id === producto.publicacion_id
          );

          if (!cantProducto) {
            console.error("Producto no encontrado en el carrito");
            return;
          } else {
            const cantidadActualizada = {
              usuario_id: usuario.id,
              publicacion_id: producto.publicacion_id,
              cantidad: producto.cantidad - 1,
            };
            const response = await apiCarrito.actualizarCantidad(cantidadActualizada)
              .then((data) => {
                const nuevoCarrito = carrito.map((producto) =>
                  producto.publicacion_id === cantProducto.publicacion_id
                    ? { ...producto, cantidad: data.cantidad }
                    : producto
                );
                setCarrito(nuevoCarrito);
              })
              .then(() => {
                // Sincronizar con el servidor después de actualizar
                apiCarrito.obtenerProductos(usuario.id).then((data) => {
                  setCarrito(Array.isArray(data) ? data : []);
                });
              })
              .catch((error) => {
                console.error("Error al actualizar la cantidad:", error);
              });
          }
        }
        catch (error) {
          console.error("Error al aumentar cantidad:", error);
        }
      };
    }
  }


  useEffect(() => { console.log(carrito); }, [carrito])


  return (
    <Container fluid className="p-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card
            className="p-4"
            style={{ backgroundColor: "#2c3e50", borderRadius: "10px" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="text-light">Carrito</h3>
              <Carrito2 clase="total-amount text-light" />
            </div>
            <Card
              className="p-3 mb-3"
              style={{ backgroundColor: "#34495e", borderRadius: "10px" }}
            >
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
                        src={producto.img1_portada}
                        alt={producto.tipo}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "5px",
                        }}
                      />
                    </Col>
                    <Col xs={4}>

                      <p className="mb-0 text-muted">{"$ " + producto.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                    </Col>
                    <Col
                      xs={3}
                      className="d-flex justify-content-end align-items-center"
                    >
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleDisminuir(producto)}
                      >
                        -
                      </Button>
                      <span className="mx-3">{producto.cantidad}</span>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleAumentar(producto)}
                      >
                        +
                      </Button>
                    </Col>
                    <Col xs={2}>
                      <p className="mb-0">{"$ " + (producto.precio * producto.cantidad).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                    </Col>
                  </Row>
                ))
              )}
            </Card>
            {Array.isArray(carrito) && carrito.length > 0 && (
              <div className="d-flex justify-content-end">
                <Button
                  variant="warning"
                  style={{ borderRadius: "20px", padding: "5px 20px" }}
                  onClick={irAPedidos}
                >
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
