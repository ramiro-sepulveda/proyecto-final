import React, { useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { MarketContext } from "../context/ContextMarket";
import Carrito2 from "../components/Carrito2";

const CarritoList = () => {
  const { carrito, setCarrito } = useContext(MarketContext);

  const handleAumentar = (tipo) => {
    setCarrito(
      carrito.map((el) =>
        el.tipo === tipo ? { ...el, cant: el.cant + 1 } : el
      )
    );
  };

  const handleDisminuir = (tipo, cant) => {
    if (cant === 1) {
      setCarrito(carrito.filter((el) => el.tipo !== tipo));
    } else {
      setCarrito(
        carrito.map((el) =>
          el.tipo === tipo ? { ...el, cant: el.cant - 1 } : el
        )
      );
    }
  };

  return (
    <Container fluid className="p-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4" style={{ backgroundColor: "#2c3e50", borderRadius: "10px" }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="text-light">Carrito</h3>
              <Carrito2 clase="total-amount text-light" />            </div>
            <Card className="p-3 mb-3" style={{ backgroundColor: "#34495e", borderRadius: "10px" }}>
              {carrito.length === 0 ? (
                <p className="text-light text-center">Tu carrito está vacío</p>
              ) : (
                carrito.map((producto, index) => (
                  <Row key={index} className="align-items-center mb-3" style={{ backgroundColor: "#ecf0f1", borderRadius: "8px", padding: "10px 5px" }}>
                    <Col xs={2} className="d-flex justify-content-center">
                      <img src={producto.img} alt={producto.tipo} style={{ width: "40px", height: "40px", borderRadius: "5px" }} />
                    </Col>
                    <Col xs={4}>
                      <p className="mb-0 font-weight-bold">{producto.tipo}</p>
                      <p className="mb-0 text-muted">${producto.precio}</p>
                    </Col>
                    <Col xs={3} className="d-flex justify-content-end">
                      <Button variant="secondary" size="sm" onClick={() => handleDisminuir(producto.tipo, producto.cant)}>-</Button>
                      <span className="mx-2">{producto.cant}</span>
                      <Button variant="secondary" size="sm" onClick={() => handleAumentar(producto.tipo)}>+</Button>
                    </Col>
                  </Row>
                ))
              )}
            </Card>
            {carrito.length > 0 && (
              <div className="d-flex justify-content-end">
                <Button variant="warning" style={{ borderRadius: "20px", padding: "5px 20px" }}>Comprar</Button>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CarritoList;
