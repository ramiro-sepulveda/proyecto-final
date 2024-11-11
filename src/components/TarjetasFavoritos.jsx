import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { useContext } from "react";
import { MarketContext } from "../context/ContextMarket";
import { useNavigate } from "react-router-dom";
import Emoji from "react-emojis";

const TarjetasFavoritos = () => {
  const { productos, loading, carrito, setCarrito } = useContext(MarketContext);
  console.log(productos);
  console.log(loading);

  const navigate = useNavigate();
  const irAProducto = (e) => navigate(`/proyecto-final/producto/${e}`);

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
          {productos.map((el) => (
              <Card
              className="d-flex m-auto tarjeta"
              text="black"
              key={el.id}
              style={{ width: "100%" }}
              >
              <Card.Img variant="top" src={el.img} alt={"Producto " + el.name} />
              <Card.Header className="fs-2 border-light">
                {primeraMayuscula(el.name)}
              </Card.Header>
              <Card.Body>
                <Card.Title>Categoría:</Card.Title>

                <ul>
                  <li>
                    {primeraMayuscula(el.category)}
                  </li>
                </ul>

                <div className="precio">
                  {"$ " +
                    el.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </div>

                <div className="botones-favoritos d-flex justify-content-around">
                  <Button
                    value={el.name}
                    style={{ width: "45%" }}
                    variant="secondary"
                    onClick={(e) => irAProducto(e.currentTarget.value)}
                  >
                    Ver Más <Emoji emoji="eyes" />
                  </Button>
                  <Button
                    value={el.name}
                    style={{ width: "45%" }}
                    className="cardButton"
                    onClick={() => {
                        handleAñadir(el.name, el.price, el.img);
                        console.log(carrito);
                    }}
                  >
                    Añadir <Emoji emoji="shopping-cart" />
                  </Button>
                  <Button
                    value={el.name}
                    style={{ width: "45%" }}
                    className="cardButton bg-danger"
                    // onClick={() => {
                    //     handleAñadir(el.name, el.price, el.img);
                    //     console.log(carrito);
                    // }}
                  >
                    Eliminar<Emoji emoji="wastebasket"/>
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

export default TarjetasFavoritos;
