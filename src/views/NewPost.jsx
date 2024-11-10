import { useContext } from "react";
import { MarketContext } from "../context/ContextMarket";
import { Container, Row, Col } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';

const NewPost = () => {

  return (

    <div className='w-100 align-self-center'>
      <h2 className='pb-4 text-center fs-46px'>Nueva Publicación</h2>
      <Form>

        <Row className="d-flex align-items-center">
          <Col md={6} className="px-5">
            <Form.Group controlId="formBasicName" className="d-flex flex-column align-items-center gap-5">
              <Form.Control type="tittle" placeholder="Título" className='custom-input w-75 rounded-4' />
              <Form.Control type="price" placeholder="Precio" className='custom-input  w-75 rounded-4' />
            </Form.Group>
          </Col>

          <Col md={6} className="px-5">
            <Form.Group controlId="formBasicName" className="d-flex flex-column align-items-center gap-5">
              <Form.Control type="label1" placeholder="Categoria 1" className='custom-input w-75 rounded-4' />
              <Form.Control type="label2" placeholder="Categoria 2" className='custom-input  w-75 rounded-4' />
            </Form.Group>
          </Col>

        </Row>
        <Row className="d-flex align-items-center mt-5 mb-5">
          <Col md={6} className="px-5">
            <Form.Group controlId="formBasicName" className="d-flex flex-column align-items-center gap-5">
              <Form.Control as="textarea" type="text" placeholder="Descripción" className='custom-input w-75 rounded-4'style={{ height: '160px' }}  />
            </Form.Group>
          </Col>

          <Col md={6} className="px-5">
            <Form.Group controlId="formBasicName" className="d-flex flex-column align-items-center gap-5">
              <Form.Control type="name" placeholder="IMAGENES" className='custom-input w-75 rounded-4' />

            </Form.Group>
          </Col>

        </Row>
      </Form>
    </div>
  )
};

export default NewPost;
