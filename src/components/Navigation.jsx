import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carrito from "./Carrito";
import Emoji from "react-emojis";

const Navigation = () => {
  return (
    <Navbar
      fixed="top"
      bg="danger"
      variant="dark"
      className="navbar border-bottom border-black"
    >
      <Container className="justify-content-start">
        <Link
          to="/mamma-mia/"
          className="fs-4 text-white ms-3 text-decoration-none"
        >
          <Emoji emoji="pizza" /> ¡Pizzería Mamma Mia!
        </Link>
      </Container>
      <Container className=" justify-content-end">
        <Link
          to="/mamma-mia/carrito/"
          className="text-white ms-3 text-decoration-none"
        >
          <Emoji emoji="shopping-cart" /> <Carrito />
        </Link>
      </Container>
    </Navbar>
  );
};

export default Navigation;
