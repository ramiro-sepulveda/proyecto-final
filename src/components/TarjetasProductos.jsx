import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { useContext } from "react";
import { PizzasContext } from "../context/ContextPizzas";
import { useNavigate } from "react-router-dom";
import Emoji from "react-emojis";

const TarjetasProductos = () => {
  const { pizzas, loading, carrito, setCarrito } = useContext(PizzasContext);
  console.log(pizzas);
  console.log(loading);

  const navigate = useNavigate();
  const irAPizza = (e) => navigate(`/mamma-mia/pizza/${e}`);

  function primeraMayuscula(str) {
    return str
      .split(" ")
      .map((word) => {
        if (word.length === 0) {
          return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }

  const handleAñadir = (tipo, precio, img) => {
    const existe = carrito.some((el) => el.tipo === tipo);
    if (existe) {
      setCarrito(
        carrito.map((el) =>
          el.tipo === tipo ? { ...el, cant: el.cant + 1 } : el
        )
      );
    } else {
      const copiaCarrito = carrito;
      copiaCarrito.push({
        tipo: tipo,
        precio: precio,
        cant: 1,
        img: img,
      });
      setCarrito(copiaCarrito.map((el) => el));
    }
  };

  if (loading) {
    return <div>cargando</div>;
  } else {
    return (
      <>
        <div className="gallery d-grid row-gap-5 grid-columns">
          {pizzas.map((el) => (
            <Card
              className="d-flex m-auto tarjeta"
              text="white"
              key={el.id}
              style={{ width: "100%" }}
            >
              <Card.Img variant="top" src={el.img} alt={"Pizza " + el.name} />
              <Card.Header className="fs-2 border-light">
                {primeraMayuscula(el.name)}
              </Card.Header>
              <Card.Body>
                <Card.Title>Ingredientes:</Card.Title>

                <ul>
                  <li>
                    <Emoji emoji="pizza" />
                    {primeraMayuscula(el.ingredients[0])}
                  </li>
                  <li>
                    <Emoji emoji="pizza" />
                    {primeraMayuscula(el.ingredients[1])}
                  </li>
                  <li>
                    <Emoji emoji="pizza" />
                    {primeraMayuscula(el.ingredients[2])}
                  </li>
                  <li>
                    <Emoji emoji="pizza" />
                    {primeraMayuscula(el.ingredients[3])}
                  </li>
                </ul>

                <div className="precio">
                  {"$ " +
                    el.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </div>

                <div className="botones d-flex justify-content-around">
                  <Button
                    value={el.name}
                    style={{ width: "45%" }}
                    variant="secondary"
                    onClick={(e) => irAPizza(e.currentTarget.value)}
                  >
                    Ver Más <Emoji emoji="eyes" />
                  </Button>
                  <Button
                    value={el.name}
                    style={{ width: "45%" }}
                    variant="danger"
                    onClick={() => {
                      handleAñadir(el.name, el.price, el.img);
                      console.log(carrito);
                    }}
                  >
                    Añadir <Emoji emoji="shopping-cart" />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </>
    );
  }
};

export default TarjetasProductos;
