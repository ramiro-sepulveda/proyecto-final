import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { MarketContext } from "../context/ContextMarket";
import Carrito2 from "../components/Carrito2";
import { apiPedidos } from "../api/apiPedidos";
import { useNavigate } from "react-router-dom";

const NuevoPedido = () => {
  const { carrito, usuario } = useContext(MarketContext);
  const [mensajeExito, setMensajeExito] = useState("");
  const [pedidoRealizado, setPedidoRealizado] = useState(false); // Estado para controlar si se realizó el pedido
  const navigate = useNavigate();

  const handleHacerPedido = async () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }

    const pedidos = carrito.map((producto) => {
      return {
        publicacion_id: producto.publicacion_id,
        comprador_id: usuario.id,
        direccion_id: null,
        cantidad: producto.cantidad,
        estado: "pendiente",
      };
    });

    try {
      for (const pedido of pedidos) {
        const respuesta = await apiPedidos.agregarPedido(pedido);
      }
      setMensajeExito("¡Gracias por tu compra!");
      setPedidoRealizado(true); // Cambiar el estado para mostrar solo el mensaje

      // Redirige después de 2 segundos
      setTimeout(() => {
        navigate(`/pedidos/${usuario.id}`);
      }, 2000);
    } catch (error) {
      console.error("Error al agregar el pedido:", error);
      const errorMessage = error.response?.data?.message || "Error desconocido";
      alert(`Error del servidor: ${errorMessage}`);
    }
  };

  useEffect(() => {
    console.log(carrito);
  }, [carrito]);

  if (pedidoRealizado) { // Condicional para mostrar solo el mensaje
    return (
      // <Container fluid className="d-flex align-items-center justify-content-center" style={{ height: '100vh', backgroundColor: '#2c3e50' }}>
      //   <h1 className="text-light">{mensajeExito}</h1>
      // </Container>
<Container fluid className="p-4 d-flex align-items-center justify-content-center animacion" style={{ height: '80vh' }}> 
  <Row className="justify-content-center">
    <Col md={8}>
      <Card className="p-4 m-3" style={{ backgroundColor: "transparent", border: "none", boxShadow: "none" }}>
        <h1 className="text-dark m-5" style={{ fontSize: '3rem', textAlign: 'center' }}>{mensajeExito}</h1> {/* Texto más grande y centrado */}
        <img
          src="solotecno.png"
          alt="MarketPlace Logo"
          style={{
            height: "auto",
            width: "100%",
            maxHeight: "60%", // Ajusta el tamaño de la imagen
            objectFit: "contain", // Asegura que la imagen mantenga su proporción
            display: "block", // Centra la imagen
            margin: "0 auto" // Centra horizontalmente la imagen
          }}
        />
      </Card>
    </Col>
  </Row>
</Container>
    );
  }

  return (
    <Container fluid className="p-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card
            className="p-4 mb-3"
            style={{ backgroundColor: "#2c3e50", borderRadius: "10px" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="text-light">Mi pedido</h3>
              <Carrito2 clase="total-amount text-light" />
            </div>
            <Card
              className="p-3 mb-3"
              style={{ backgroundColor: "#34495e", borderRadius: "10px" }}
            >
              {carrito.length === 0 ? (
                <p className="text-light text-center">No tienes pedidos</p>
              ) : (
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
                      <p className="mb-0 text-muted">
                        {"$ " + producto.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </p>
                    </Col>
                    <Col xs={3} className="d-flex justify-content-end align-items-center">
                      <span className="mx-3">{producto.titulo}</span>
                    </Col>
                    <Col xs={3} className="d-flex justify-content-end align-items-center">
                      <span className="mx-3">{producto.cantidad}</span>
                    </Col>
                  </Row>
                ))
              )}
            </Card>
            <Card className="p-4" style={{ backgroundColor: "#34495e", borderRadius: "10px" }}>
              <h5 className="text-light">Datos del Comprador</h5>
              <div className="text-light">
                <p><strong>Nombre:</strong> {usuario.nombre}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
                <p><strong>Teléfono:</strong> {usuario.telefono}</p>
              </div>
            </Card>
            {carrito.length > 0 && (
              <div className="d-flex justify-content-end p-3 m-3">
                <Button
                  variant="warning"
                  style={{ borderRadius: "20px", padding: "5px 20px" }}
                  onClick={handleHacerPedido}
                >
                  Finalizar pedido
                </Button>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NuevoPedido;