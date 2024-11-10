import { useContext } from "react";
import { MarketContext } from "../context/ContextMarket";
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';

const NewPost = () => {

  return (

    <Container className='p-4 w-100 align-self-center align-items-center d-flex flex-column'>
      <Card className="d-flex flex-column w-75 m-auto" style={{ backgroundColor: "#2c3e50", minHeight: "600px" }}>
        <h2 className='white py-4 text-center fs-46px'>Nueva Publicación</h2>
        <Form className="w-100">

          <Row className="d-flex align-items-center">
            <Col md={6} className="px-5">
              <Form.Group controlId="formBasicName" className="d-flex flex-column align-items-center gap-5">
                <Form.Control type="tittle" placeholder="Título" className='custom-input rounded-4' />
                <Form.Control type="price" placeholder="Precio" className='custom-input rounded-4' />
              </Form.Group>
            </Col>

            <Col md={6} className="px-5">
              <Form.Group controlId="formBasicName" className="d-flex flex-column align-items-center gap-5">
                <Form.Control type="label1" placeholder="Categoria 1" className='custom-input rounded-4' />
                <Form.Control type="label2" placeholder="Categoria 2" className='custom-input rounded-4' />
              </Form.Group>
            </Col>

          </Row>
          <Row className="d-flex align-items-center mt-5 mb-5">
            <Col md={6} className="px-5">
              <Form.Group controlId="formBasicName" className="d-flex flex-column align-items-center gap-5">
                <Form.Control as="textarea" type="text" placeholder="Descripción" className='custom-input rounded-4' style={{ height: '160px' }} />
              </Form.Group>
            </Col>

            <Col md={6} className="px-5">
              <h3 className='white pb-4 text-center'>Imágenes del producto</h3>
              <div className="d-flex justify-content-center gap-3">

                <div style={{
                  borderRadius: '4px',
                  backgroundColor: 'white'
                }}>
                  <img
                    src="/proyecto-final/imageholder.png"
                    alt="Descripción de la imagen"
                    className="img-fluid" />
                </div>

                <div style={{
                  borderRadius: '4px',
                  backgroundColor: 'white'
                }}>
                  <img
                    src="/proyecto-final/imageholder.png"
                    alt="Descripción de la imagen"
                    className="img-fluid" />
                </div>

                <div style={{
                  borderRadius: '4px',
                  backgroundColor: 'white'
                }}>
                  <img
                    src="/proyecto-final/imageholder.png"
                    alt="Descripción de la imagen"
                    className="img-fluid" />
                </div>

                <div style={{
                  borderRadius: '4px',
                  backgroundColor: 'white'
                }}>
                  <img
                    src="/proyecto-final/imageholder.png"
                    alt="Descripción de la imagen"
                    className="img-fluid" />
                </div>

              </div>
              <div className='mt-3 text-end'>
                <Button variant="primary" className='rounded-3'>
                  Añadir foto
                </Button>
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
