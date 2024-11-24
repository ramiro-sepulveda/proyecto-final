import { Container, Row, Col, Card } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';
import { apiPublicaciones } from '../api/apiPublicaciones';
import { useState } from 'react';


const NewPost = () => {

  // Estado para manejar los valores del formulario
  const [formData, setFormData] = useState({
    titulo: "",
    precio: "",
    categoria: "",
    descripcion: "",
  });

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    try {
      const response = await apiPublicaciones.agregarPublicacion(formData);
      console.log("Publicación creada exitosamente:", response);
      alert("Publicación creada exitosamente");
      // Aquí puedes redirigir o limpiar el formulario si es necesario
      setFormData({
        titulo: "",
        precio: "",
        categoria: "",
        descripcion: "", 
      });
    } catch (error) {
      console.error("Error al crear la publicación:", error.message);
      alert("Error al crear la publicación");
    }
  };

  return (

    <Container className='p-4 w-100 align-self-center align-items-center d-flex flex-column'>
      <Card className="d-flex flex-column w-75 m-auto" style={{ backgroundColor: "#2c3e50", minHeight: "600px" }}>
        <h2 className='white py-4 text-center fs-46px'>Nueva Publicación</h2>
        <Form className="w-100" onSubmit={handleSubmit}>

          <Row className="d-flex align-items-center">
            <Col md={6} className="px-5">
              <Form.Group controlId="formBasicName" className="d-flex flex-column align-items-center gap-5">
                <Form.Control 
                type="title" 
                name="titulo"
                placeholder="Título" 
                className='custom-input rounded-4'
                value={formData.titulo}
                onChange={handleChange} 
                />
                <Form.Control 
                type="price"
                name='precio' 
                placeholder="Precio" 
                className='custom-input rounded-4' 
                value={formData.precio}
                onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6} className="px-5">
              <Form.Group 
              controlId="formBasicName" 
              className="d-flex flex-column align-items-center gap-5">
                <Form.Control 
                type="text" 
                name='categoria'
                placeholder="Categoria" 
                className='custom-input rounded-4'
                value={formData.categoria}
                onChange={handleChange}
                />
              </Form.Group>
            </Col>

          </Row>
          <Row className="d-flex align-items-center mt-5 mb-5">
            <Col md={6} className="px-5">
              <Form.Group controlId="formBasicName" className="d-flex flex-column align-items-center gap-5">
                <Form.Control 
                as="textarea"
                name='descripcion'
                type="text" 
                placeholder="Descripción" 
                className='custom-input rounded-4' 
                style={{ height: '160px' }} 
                value={formData.descripcion}
                onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6} className="px-5">
              <h3 className='white pb-4 text-center'>Imágenes del producto</h3>
              <div className="d-flex justify-content-center gap-3">
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label className='text-white'>Selecciona las imágenes:</Form.Label>
                <Form.Control type="file" multiple />
              </Form.Group>

                {/* <div style={{
                  borderRadius: '4px',
                  backgroundColor: 'white'
                }}>
                  <img
                    src="/imageholder.png"
                    alt="Descripción de la imagen"
                    className="img-fluid" />
                </div>

                <div style={{
                  borderRadius: '4px',
                  backgroundColor: 'white'
                }}>
                  <img
                    src="/imageholder.png"
                    alt="Descripción de la imagen"
                    className="img-fluid" />
                </div>

                <div style={{
                  borderRadius: '4px',
                  backgroundColor: 'white'
                }}>
                  <img
                    src="/imageholder.png"
                    alt="Descripción de la imagen"
                    className="img-fluid" />
                </div>

                <div style={{
                  borderRadius: '4px',
                  backgroundColor: 'white'
                }}>
                  <img
                    src="/imageholder.png"
                    alt="Descripción de la imagen"
                    className="img-fluid" />
                </div> */}

              </div>
            </Col>

          </Row><div className='my-3 text-center'>
            <Button variant="warning" type="submit" className='rounded-3 fs-4'>
              Publicar
            </Button>
          </div>
        </Form >
      </Card>
    </Container >
  )
};

export default NewPost;
