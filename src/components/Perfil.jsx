import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import { MarketContext } from "../context/ContextMarket";
import { apiUsuarios } from "../api/apiUsuarios";
import { Form } from "react-bootstrap";
import Emoji from "react-emojis";
import { apiPublicaciones } from "../api/apiPublicaciones";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Perfil = () => {
    const [editar, setEditar] = useState(false)
    const { usuario, setUsuario, logout } = useContext(MarketContext)
    const [formData, setFormData] = useState({})

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [publicaciones, setPublicaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const {id} = useParams();
    console.log("ID del usuario desde useParams:", id);

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

    const handleEliminarCuenta = () => {
        apiUsuarios.borrarUsuario(usuario.id)
            .then(() => {
                console.log("Cuenta eliminada");
                handleClose()
                window.alert(`Tu cuenta ha sido eliminada.`)
                logout()
            })
            .catch((error) => {
                console.error(error)
                window.alert(`${error.message} 🙁.`)
            })


    };

    useEffect(() => {
        setFormData(usuario)
        console.log('info formData')
        console.log(formData)

    }, [editar]);

    useEffect(() => {
        console.log("id del usuario: ", id)
        const obtenerPublicaciones = async () => {
            try {
                const publicacionesData = await apiPublicaciones.publicacionesUsuarios(id); // Usamos el id desde la URL
                setPublicaciones(publicacionesData);
                setLoading(false);
            } catch (error) {
                setError("No se pudieron cargar las publicaciones.");
                setLoading(false);
            }
        };

        if (id) {
            obtenerPublicaciones();
        } else {
            console.log("No se ha proporcionado un id de usuario válido.");
            setLoading(false);
        }
    }, [id]);  // Dependemos de 'id' de la URL

    // Función para redirigir al formulario de nueva publicación
    const handleRedireccionar = () => {
        navigate("/publicar"); // Redirige a la ruta /publicar
    };

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
                                                right: "40px",
                                                background: "transparent",
                                                border: "none",
                                                cursor: "pointer",
                                                fontSize: "20px",
                                            }}
                                            onClick={(e) => handleForm(e)}
                                        >
                                            <Emoji emoji="floppy-disk" />
                                        </button>
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
                                            onClick={() => setEditar(false)}
                                        >
                                            <Emoji emoji="cross-mark" />
                                        </button>

                                        <Form className='pt-5 w-100'>
                                            <Form.Control
                                                placeholder="URL Imagen de Perfil"
                                                className="text-dark text-center mb-3"
                                                type="text"
                                                name="img_perfil"
                                                value={formData.img_perfil}
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
                                        <Button variant="danger" className="p-1 mb-3" style={{ fontSize: "0.9rem" }} onClick={handleShow}>
                                            Eliminar Cuenta
                                        </Button>
                                        <Modal show={show} onHide={handleClose} centered>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Confirmar eliminación</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Cancelar
                                                </Button>
                                                <Button variant="danger" onClick={handleEliminarCuenta}>
                                                    Confirmar
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
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
                                            <img src={usuario.img_perfil ? usuario.img_perfil : "https://cdn-icons-png.flaticon.com/512/3135/3135768.png"} alt="Imagen de perfil"
                                                style={{
                                                    color: "transparent",
                                                    width: "100%", // Ocupa todo el ancho del contenedor
                                                    height: "100%", // Ocupa todo el alto del contenedor
                                                    objectFit: "cover", // Ajusta la imagen para cubrir el contenedor
                                                    borderRadius: "50%", // Hace que la imagen también sea circular
                                                }} />
                                        </div>
                                        <p className="text-dark text-center mb-3">  {`${usuario.nombre} ${usuario.apellido}`}</p>
                                        <Emoji emoji='e-mail' />
                                        <p className="text-dark text-center mb-3">{usuario.email}</p>
                                        <Emoji emoji='telephone-receiver' />
                                        <p className="text-dark text-center mb-3">{usuario.telefono}</p></>)
                                    }

                                </Card>
                            </Col>

                            <Col md={8}>
                                <Card className="p-3" style={{ backgroundColor: "#ffffff", minHeight: "400px" }}>
                                    <h5 className="text-dark">Mis publicaciones</h5>
                                    <Button variant="link" className="text-secondary p-0 mb-3" style={{ fontSize: "0.9rem" }} onClick={handleRedireccionar}>
                                        Añadir nuevo +
                                    </Button>

                                    {loading && <p>Cargando publicaciones...</p>}
{!loading && error && <p>{error}</p>}
{!loading && !error && publicaciones.length === 0 && <p>No tienes publicaciones aún.</p>}
{!loading && !error && publicaciones.map((publicacion, i) => (
    <Row key={i} className="mb-2 align-items-center">
        <Col xs={2} className="d-flex justify-content-center">
            <div className="bg-secondary" style={{ width: "40px", height: "40px" }}></div>
        </Col>
        <Col xs={8}>
            <p className="mb-0">{publicacion.titulo}</p>
        </Col>
        <Col xs={2} className="text-end">
            <p className="mb-0">${publicacion.precio}</p>
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
}


export default Perfil;
