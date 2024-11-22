import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import { MarketContext } from "../context/ContextMarket";
import { apiUsuarios } from "../api/apiUsuarios";
import { Form } from "react-bootstrap";
import Emoji from "react-emojis";

const Perfil = () => {
    const [editar, setEditar] = useState(false)
    const { usuario, setUsuario } = useContext(MarketContext)
    const [formData, setFormData] = useState({})
    console.log(formData)
    const primeraMayuscula = (str) => {
        return str
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    // Función para guardar los cambios (simula un envío al backend)
    const handleForm = (event) => {
        event.preventDefault();
        apiUsuarios.updateUsuario(formData)
            .then(() => {
                console.log("Información guardada:");
                setUsuario(formData)
                setEditar(false); // Desactiva el modo de edición
            })
            .catch((error) => {
                console.error(error)
                window.alert(`${error.message} 🙁.`)
            })
    }

    useEffect(() => {
        setFormData(usuario)

    }, [editar]);

    return (
        <Container fluid className="p-4">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="p-4" style={{ backgroundColor: "#2c3e50", minHeight: "600px" }}>
                        <h3 className="text-light text-center mb-4">Mi perfil</h3>
                        <Row>
                            <Col md={4}>
                                <Card className="p-3 d-flex align-items-center" style={{ backgroundColor: "#ffffff", minHeight: "400px" }}>
                                    {editar ? (<>
                                        <button
                                            style={{
                                                position: "absolute",
                                                top: "10px",
                                                right: "10px",
                                                background: "transparent",
                                                border: "none",
                                                cursor: "pointer",
                                                fontSize: "20px",
                                            }}
                                            onClick={(e) => handleForm(e)}
                                        >
                                            <Emoji emoji="floppy-disk" />
                                        </button>
                                        <Form className='pt-5 w-100'>
                                            <Form.Control
                                                placeholder="Imagen de Perfil"
                                                className="text-dark text-center mb-3"
                                                type="text"
                                                name="imgPerfil"
                                                value={formData.imgPerfil}
                                                onChange={handleChange} />

                                            <Form.Control
                                                placeholder="Nombre"
                                                className="text-dark text-center mb-3"
                                                type="text"
                                                name="nombre"
                                                value={formData.nombre}
                                                onChange={handleChange} />

                                            <Form.Control
                                                placeholder="Apellido"
                                                className="text-dark text-center mb-3"
                                                type="text"
                                                name="apellido"
                                                value={formData.apellido}
                                                onChange={handleChange} />

                                            <Form.Control
                                                placeholder="Telefono"
                                                className="text-dark text-center mb-3"
                                                type="phone"
                                                name="telefono"
                                                value={formData.telefono}
                                                onChange={handleChange} />

                                        </Form>
                                    </>) : (<>
                                        <button
                                            style={{
                                                position: "absolute",
                                                top: "10px",
                                                right: "10px",
                                                background: "transparent",
                                                border: "none",
                                                cursor: "pointer",
                                                fontSize: "20px",
                                            }}
                                            onClick={() => setEditar(true)}
                                        >
                                            <Emoji emoji="pencil" />
                                        </button>
                                        <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: "150px", height: "150px" }}>
                                            <img src={usuario.imgPerfil} />
                                        </div>
                                        <p className="text-dark text-center mb-3">  {primeraMayuscula(`${usuario.nombre} ${usuario.apellido}`)}</p>
                                        <p className="text-dark text-center mb-3">{usuario.email}</p>
                                        <p className="text-dark text-center mb-3"></p></>)
                                    }

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
        </Container >
    );
}


export default Perfil;
