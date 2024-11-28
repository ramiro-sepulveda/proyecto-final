import { Container, Row, Col, Card } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { apiPublicaciones } from "../api/apiPublicaciones";
import { useState, useContext, useEffect } from "react";
import { MarketContext } from "../context/ContextMarket";
import Emoji from "react-emojis";
import { apiImagenes } from "../api/apiImagenes";

const NewPost = () => {
  const { usuario, categorias } = useContext(MarketContext);
  const [render, setRender] = useState(false);
  // Estado para manejar los valores del formulario
  const [formData, setFormData] = useState({
    id_vendedor: "",
    publicacion_id: "",
    titulo: "",
    precio: "",
    categoria_id: "",
    descripcion: "",
    img1_portada: "",
    img2: "",
    img3: "",
    img4: ""
  });

  const [isInputVisible, setInputVisible] = useState({
    img1_portada: false,
    img2: false,
    img3: false,
    img4: false
  }); // Control del popup

  const handlePlaceholderClick = (e) => {
    setInputVisible({ ...isInputVisible, [e.target.name]: true }); // Muestra el cuadro de entrada
  };

  const handleImgChange = (e) => {
    const { name, value } = e.target;
    console.log(e);
    setFormData({ ...formData, [name]: value }); // Actualiza la URL de la imagen
  };

  const saveImg = (e) => {
    console.log(e);
    setRender((render) => !render);
    setInputVisible({ ...isInputVisible, [e.currentTarget.name]: false });
  }; // Oculta el cuadro de entrada

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      id_vendedor: usuario.id,
      [name]: value,
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue
    console.log(formData);
    if (!formData.img1_portada || !formData.titulo || !formData.descripcion || !formData.precio || !formData.categoria_id) {

      window.alert(`Todos los campos son obligatorios.`)
    }
    else {
      try {
        const response1 = await apiPublicaciones.agregarPublicacion(formData);
        console.log([response1][0].publicacion);

        // Actualizamos formData con la id de la publicación
        setFormData({
          ...formData,
          publicacion_id: [response1][0].publicacion.id,
        });
        console.log(formData);
      } catch (error) {
        console.error("Error al crear la publicación:", error.message);
        alert("Error al crear la publicación");
      }
    };
  }

  useEffect(() => {
    if (formData.publicacion_id) {
      // Esto se ejecuta solo cuando `publicacion_id` ha sido actualizado
      apiImagenes.agregarImagenes(formData).then(() => {
        console.log("Publicación creada exitosamente");
        alert("Publicación creada exitosamente");
        setFormData({
          id_vendedor: "",
          publicacion_id: "",
          titulo: "",
          precio: "",
          categoria_id: "",
          descripcion: "",
          img1_portada: "",
          img2: "",
          img3: "",
          img4: ""
        })
      });
    }
  }, [formData]);

  useEffect(() => {
    // Este efecto se dispara cuando cambia reloadKey
    console.log("Componente recargado");
  }, [render]); // Dependencia en reloadKey

  return (
    <Container className="p-4 w-100 align-self-center align-items-center d-flex flex-column">
      <Card
        className="d-flex flex-column w-75 m-auto"
        style={{ backgroundColor: "#2c3e50", minHeight: "600px" }}
      >
        <h2 className="white py-4 text-center fs-46px">Nueva Publicación</h2>
        <Form className="w-100" onSubmit={handleSubmit}>
          <Row className="d-flex align-items-center">
            <Col md={6} className="px-5">
              <Form.Group
                controlId="formBasicName"
                className="d-flex flex-column align-items-center gap-5"
              >
                <Form.Control
                  type="title"
                  name="titulo"
                  placeholder="Título"
                  className="custom-input rounded-4"
                  value={formData.titulo}
                  onChange={handleChange}
                />
                <Form.Control
                  type="price"
                  name="precio"
                  placeholder="Precio"
                  className="custom-input rounded-4"
                  value={formData.precio}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6} className="px-5">
              <Form.Group
                controlId="formBasicCategory"
                className="d-flex flex-column align-items-center gap-5"
              >
                <Form.Select
                  name="categoria_id"
                  className="custom-input rounded-4"
                  value={formData.categoria_id}
                  onChange={handleChange}
                >
                  <option value="">Seleccione una categoría</option>{" "}
                  {/* Opción inicial */}
                  <option value="1">Notebooks</option>
                  <option value="2">Celulares</option>
                  <option value="3">Consolas</option>
                  <option value="4">Wearables</option>
                  <option value="5">Tablets</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="d-flex align-items-center mt-5 mb-5">
            <Col md={6} className="px-5">
              <Form.Group
                controlId="formBasicName"
                className="d-flex flex-column align-items-center gap-5"
              >
                <Form.Control
                  as="textarea"
                  name="descripcion"
                  type="text"
                  placeholder="Descripción"
                  className="custom-input rounded-4"
                  style={{ height: "160px" }}
                  value={formData.descripcion}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6} className="px-5">
              <h3 className="white pb-4 text-center">Agrega tus imágenes:</h3>
              <div className="d-flex justify-content-center gap-3">
                {/* <Form.Group controlId="formFileMultiple" className="mb-3">
                  <Form.Label className="text-white">
                    Selecciona las imágenes:
                  </Form.Label>
                  <Form.Control type="file" multiple />
                </Form.Group> */}

                <div
                  style={{
                    borderRadius: "4px",
                    backgroundColor: "white",
                    width: "75px",
                    height: "75px",
                  }}
                >
                  <img
                    src={formData.img1_portada} // Reemplaza con la URL de la imagen que estás pasando
                    alt="Descripción de la imagen"
                    className="bg-light d-flex align-items-center justify-content-center p-1"
                    name="img1_portada"
                    style={{
                      color: "transparent",
                      width: "100%", // Ocupa todo el ancho del contenedor
                      height: "100%", // Ocupa todo el alto del contenedor
                      objectFit: "cover", // Ajusta la imagen para cubrir el contenedor
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onError={(e) => {
                      e.target.onerror = null; // Evita bucles infinitos
                      e.target.src = "/imageholder.png"; // Ruta al placeholder
                    }}
                    onClick={handlePlaceholderClick}
                  />
                  {isInputVisible.img1_portada && (
                    <div
                      style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        padding: "20px",
                        background: "white",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        borderRadius: "8px",
                        zIndex: 1000,
                      }}
                    >
                      <label>
                        Ingresa la URL de la nueva imagen:
                        <input
                          type="text"
                          value={formData.img1_portada}
                          name="img1_portada"
                          onChange={handleImgChange} // Actualiza al perder foco
                          autoFocus
                          style={{ marginLeft: "10px", padding: "5px" }}
                        />
                        <button
                          type="button"
                          name="img1_portada"
                          style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "20px",
                          }}
                          onClick={saveImg}
                        >
                          <Emoji emoji="floppy-disk" />
                        </button>
                      </label>
                    </div>
                  )}
                </div>
                <div
                  style={{
                    borderRadius: "4px",
                    backgroundColor: "white",
                    width: "75px",
                    height: "75px",
                  }}
                >
                  <img
                    src={formData.img2} // Reemplaza con la URL de la imagen que estás pasando
                    alt="Descripción de la imagen"
                    className="bg-light d-flex align-items-center justify-content-center p-1"
                    name="img2"
                    style={{
                      color: "transparent",
                      width: "100%", // Ocupa todo el ancho del contenedor
                      height: "100%", // Ocupa todo el alto del contenedor
                      objectFit: "cover", // Ajusta la imagen para cubrir el contenedor
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onError={(e) => {
                      e.target.onerror = null; // Evita bucles infinitos
                      e.target.src = "/imageholder.png"; // Ruta al placeholder
                    }}
                    onClick={handlePlaceholderClick}
                  />
                  {isInputVisible.img2 && (
                    <div
                      style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        padding: "20px",
                        background: "white",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        borderRadius: "8px",
                        zIndex: 1000,
                      }}
                    >
                      <label>
                        Ingresa la URL de la nueva imagen:
                        <input
                          type="text"
                          value={formData.img2}
                          name="img2"
                          onChange={handleChange} // Actualiza al perder foco
                          autoFocus
                          style={{ marginLeft: "10px", padding: "5px" }}
                        />
                        <button
                          type="button"
                          name="img2"
                          style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "20px",
                          }}
                          onClick={saveImg}
                        >
                          <Emoji emoji="floppy-disk" />
                        </button>
                      </label>
                    </div>
                  )}
                </div>

                <div
                  style={{
                    borderRadius: "4px",
                    backgroundColor: "white",
                    width: "75px",
                    height: "75px",
                  }}
                >
                  <img
                    src={formData.img3} // Reemplaza con la URL de la imagen que estás pasando
                    alt="Descripción de la imagen"
                    className="bg-light d-flex align-items-center justify-content-center p-1"
                    name="img3"
                    style={{
                      color: "transparent",
                      width: "100%", // Ocupa todo el ancho del contenedor
                      height: "100%", // Ocupa todo el alto del contenedor
                      objectFit: "cover", // Ajusta la imagen para cubrir el contenedor
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onError={(e) => {
                      e.target.onerror = null; // Evita bucles infinitos
                      e.target.src = "/imageholder.png"; // Ruta al placeholder
                    }}
                    onClick={handlePlaceholderClick}
                  />
                  {isInputVisible.img3 && (
                    <div
                      style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        padding: "20px",
                        background: "white",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        borderRadius: "8px",
                        zIndex: 1000,
                      }}
                    >
                      <label>
                        Ingresa la URL de la nueva imagen:
                        <input
                          type="text"
                          value={formData.img3}
                          name="img3"
                          onChange={handleImgChange} // Actualiza al perder foco
                          autoFocus
                          style={{ marginLeft: "10px", padding: "5px" }}
                        />
                        <button
                          type="button"
                          name="img3"
                          style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "20px",
                          }}
                          onClick={saveImg}
                        >
                          <Emoji emoji="floppy-disk" />
                        </button>
                      </label>
                    </div>
                  )}
                </div>

                <div
                  style={{
                    borderRadius: "4px",
                    backgroundColor: "white",
                    width: "75px",
                    height: "75px",
                  }}
                >
                  <img
                    src={formData.img4} // Reemplaza con la URL de la imagen que estás pasando
                    alt="Descripción de la imagen"
                    className="bg-light d-flex align-items-center justify-content-center p-1"
                    name="img4"
                    style={{
                      color: "transparent",
                      width: "100%", // Ocupa todo el ancho del contenedor
                      height: "100%", // Ocupa todo el alto del contenedor
                      objectFit: "cover", // Ajusta la imagen para cubrir el contenedor
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onError={(e) => {
                      e.target.onerror = null; // Evita bucles infinitos
                      e.target.src = "/imageholder.png"; // Ruta al placeholder
                    }}
                    onClick={handlePlaceholderClick}
                  />
                  {isInputVisible.img4 && (
                    <div
                      style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        padding: "20px",
                        background: "white",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        borderRadius: "8px",
                        zIndex: 1000,
                      }}
                    >
                      <label>
                        Ingresa la URL de la nueva imagen:
                        <input
                          type="text"
                          value={formData.img4}
                          name="img4"
                          onChange={handleImgChange} // Actualiza al perder foco
                          autoFocus
                          style={{ marginLeft: "10px", padding: "5px" }}
                        />
                        <button
                          type="button"
                          name="img4"
                          style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "20px",
                          }}
                          onClick={saveImg}
                        >
                          <Emoji emoji="floppy-disk" />
                        </button>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </Col>
          </Row>
          <div className="my-3 text-center">
            <Button variant="warning" type="submit" className="rounded-3 fs-4">
              Publicar
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default NewPost;
