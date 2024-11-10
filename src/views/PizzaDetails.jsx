import { useParams } from "react-router-dom";
import { Button, Card, Container } from "react-bootstrap";
import { useContext } from "react";
import { MarketContext } from "../context/ContextMarket";
import Emoji from "react-emojis";

const PizzaDetails = () => {
  const { name } = useParams();
  const { pizzas, loading, carrito, setCarrito } = useContext(MarketContext);
  console.log(name);
  console.log(pizzas);
  console.log(loading);

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
    const index = pizzas.findIndex((el) => el.name == name);
    return (
      <div className="pt-5">
        <Card className="d-flex flex-lg-row m-auto tarjeta" text="black">
          <Card.Img
            variant="top"
            src={pizzas[index].img}
            alt={"Pizza " + primeraMayuscula(name)}
          />
          <Card.Body className="py-0">
            <Card.Header className="fs-1 pb-4 border-light">
              {primeraMayuscula(name)}
            </Card.Header>

            <Card.Text>{pizzas[index].desc}</Card.Text>
            <Card.Title className="fs-4 pb-4">Categoría: {primeraMayuscula(pizzas[index].category)}</Card.Title>
          
            {/* <ul>
                  <li>
                    {primeraMayuscula(pizzas[index].category)}
                  </li>
            </ul> */}

            <Card.Footer className="d-lg-flex justify-content-between align-items-center">
              <div className="precio">
                {"Precio: $" +
                  pizzas[index].price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </div>
              <div className="botones-detalles">
              <Button
                style={{ width: "80px" }}
                variant="warning"
                onClick={() => {
                  handleAñadir(
                    pizzas[index].name,
                    pizzas[index].price,
                    pizzas[index].img
                  );
                  console.log(carrito);
                }}
              >
               <Emoji emoji="red-heart" />
              </Button>
              <Button
                style={{ width: "140px" }}
                variant="danger"
                onClick={() => {
                  handleAñadir(
                    pizzas[index].name,
                    pizzas[index].price,
                    pizzas[index].img
                  );
                  console.log(carrito);
                }}
              >
               <Emoji emoji="shopping-cart" /> Añadir
              </Button>
              </div>
            </Card.Footer>
          </Card.Body>
        </Card>
      </div>
    );
  }
};

export default PizzaDetails;
