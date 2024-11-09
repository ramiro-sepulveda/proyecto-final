import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Carrito = () => {
  return (
    <Container fluid className="p-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4" style={{ backgroundColor: "#2c3e50", borderRadius: "10px" }}>
            <h3 className="text-light text-center mb-4">Carrito</h3>
            <Card className="p-3 mb-3" style={{ backgroundColor: "#34495e", borderRadius: "10px" }}>
              {[...Array(4)].map((_, i) => (
                <Row key={i} className="align-items-center mb-3" style={{ backgroundColor: "#ecf0f1", borderRadius: "8px", padding: "10px 5px" }}>
                  <Col xs={2} className="d-flex justify-content-center">
                    <div className="bg-secondary" style={{ width: "40px", height: "40px", borderRadius: "5px" }}></div>
                  </Col>
                  <Col xs={4}>
                    <p className="mb-0 font-weight-bold">Título</p>
                    <p className="mb-0 text-muted">Descripción</p>
                  </Col>
                  <Col xs={3} className="d-flex justify-content-end">
                    <Button variant="secondary" size="sm" className="me-2">-</Button>
                    <span>1</span>
                    <Button variant="secondary" size="sm" className="ms-2">+</Button>
                  </Col>
                </Row>
              ))}
            </Card>
            <div className="d-flex justify-content-end">
              <Button variant="warning" style={{ borderRadius: "20px", padding: "5px 20px" }}>Comprar</Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Carrito;
