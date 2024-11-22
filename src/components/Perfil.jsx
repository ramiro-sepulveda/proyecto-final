import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import { MarketContext } from "../context/ContextMarket";
import { apiUsuarios } from "../api/apiUsuarios";

const Perfil = () => {
    const [editar, setEditar] = useState(false)
    const { usuario, setUsuario } = useContext(MarketContext)
    const token = window.sessionStorage.getItem('token')

    useEffect(() => {
        apiUsuarios.updateUsuario()

    }, []);
    return (
        <Container fluid className="p-4">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="p-4" style={{ backgroundColor: "#2c3e50", minHeight: "600px" }}>
                        <h3 className="text-light text-center mb-4">Mi perfil</h3>
                        <Row>
                            <Col md={4}>
                                <Card className="p-3 d-flex align-items-center" style={{ backgroundColor: "#ffffff", minHeight: "400px" }}>
                                    <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: "150px", height: "150px" }}>
                                        <p className="text-center m-0">foto</p>
                                    </div>
                                    <p className="text-dark text-center mb-3">nombre</p>
                                    <p className="text-dark text-center mb-3">correo</p>
                                    <p className="text-dark text-center mb-3">ciudad</p>
                                </Card>
                            </Col>

                            <Col md={8}>
                                <Card className="p-3" style={{ backgroundColor: "#ffffff", minHeight: "400px" }}>
                                    <h5 className="text-dark">Mis publicaciones</h5>
                                    <Button variant="link" className="text-secondary p-0 mb-3" style={{ fontSize: "0.9rem" }}>
                                        Añadir nuevo +
                                    </Button>

                                    {[...Array(6)].map((_, i) => (
                                        <Row key={i} className="mb-2 align-items-center">
                                            <Col xs={2} className="d-flex justify-content-center">
                                                <div className="bg-secondary" style={{ width: "40px", height: "40px" }}></div>
                                            </Col>
                                            <Col xs={8}>
                                                <p className="mb-0">Título</p>
                                            </Col>
                                            <Col xs={2} className="text-end">
                                                <p className="mb-0">$15.000</p>
                                            </Col>
                                        </Row>
                                    ))}
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Perfil;