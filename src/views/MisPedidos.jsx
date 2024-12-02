import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { MarketContext } from "../context/ContextMarket";
import { apiPedidos } from "../api/apiPedidos";
import { useParams } from "react-router-dom";

const MisPedidos = () => {
  const { carrito } = useContext(MarketContext);
  const [pedidos, setPedidos] = useState([]); // Estado para almacenar pedidos
  const [error, setError] = useState(null); // Estado para manejar errores
  const { comprador_id } = useParams(); // Debe coincidir con el nombre en la ruta

  useEffect(() => {
    const obtenerMisPedidos = async () => {
      console.log("Obteniendo pedidos...");
      console.log("comprador_id desde los parámetros:", comprador_id);

      const id = parseInt(comprador_id, 10); // Convierte comprador_id en un número
      console.log("ID convertido:", id);

      if (isNaN(id)) {
        console.error("El compradorId no es un número válido:", comprador_id);
        setError("El ID del comprador no es válido."); // Establecer error
        return;
      }

      try {
        const pedidosObtenidos = await apiPedidos.obtenerPedidos(id);
        if (Array.isArray(pedidosObtenidos)) {
          setPedidos(pedidosObtenidos); // Guardar los pedidos en el estado
        } else {
          setError("No se obtuvieron pedidos válidos."); // Manejar caso donde no se reciben pedidos
        }
      } catch (error) {
        console.error("Error al obtener los pedidos:", error.message);
        setError("Hubo un problema al obtener tus pedidos."); // Establecer error
      }
    };

    obtenerMisPedidos(); // Llamar a la función cuando se monta el componente
  }, [comprador_id]);

  return (
    <Container fluid className="p-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card
            className="p-4"
            style={{ backgroundColor: "#2c3e50", borderRadius: "10px" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="text-light">Mis Pedidos</h3>
            </div>
            {error ? (
              <p className="text-light text-center">{error}</p> // Mostrar error si existe
            ) : (
              <Card
                className="p-3 mb-3"
                style={{ backgroundColor: "#34495e", borderRadius: "10px" }}
              >
                {pedidos.length === 0 ? (
                  <p className="text-light text-center">No tienes pedidos</p>
                ) : (
                  pedidos.map((pedido) => (
                    <Row
    key={pedido.id}
    className="align-items-center mb-3"
    style={{
      backgroundColor: "#ecf0f1",
      borderRadius: "8px",
      padding: "10px 5px",
    }}
  >
    <Col xs={2} className="d-flex justify-content-center">
      <img
        src={pedido.img1_portada}
        alt="Producto"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "5px",
        }}
      />
    </Col>
    <Col xs={4}>
      <p className="mb-0 text-muted">
        {"Estado: " + (pedido.estado)}
      </p>
    </Col>
    <Col xs={3} className="d-flex justify-content-end align-items-center">
      <span className="mx-3">{pedido.titulo}</span>
    </Col>
    <Col xs={3} className="d-flex justify-content-end align-items-center">
      <span className="mx-3">{"Cantidad: " + (pedido.cantidad)}</span>
    </Col>
  </Row>
                  ))
                )}
              </Card>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MisPedidos;