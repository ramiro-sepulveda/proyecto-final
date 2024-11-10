import { useContext } from "react";
import { MarketContext } from "../context/ContextMarket";
import { Container, Row, Col } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';

const NewPost = () => {

  return (

    <Form>

      <Row className="min-vh-100 d-flex align-items-center">
        <Col md={6} className="p-5 d-flex">
        </Col>
        <Col md={6} className="p-5 d-flex">
        </Col>
      </Row>

      <Row className="min-vh-100 d-flex align-items-center">
        <Col md={6} className="p-5 d-flex">
        </Col>
        <Col md={6} className="p-5 d-flex">
        </Col>
      </Row>

      <Row className="min-vh-100 d-flex align-items-center">
        <Col md={6} className="p-5 d-flex">
        </Col>
        <Col md={6} className="p-5 d-flex">
        </Col>
      </Row>
      </Form>
  )
};

export default NewPost;
