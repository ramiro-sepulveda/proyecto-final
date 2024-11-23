import { useParams } from "react-router-dom";
import { Button, Card, Container } from "react-bootstrap";
import { useContext } from "react";
import { MarketContext } from "../context/ContextMarket";
import Emoji from "react-emojis";

const ProductoDetails = () => {
  const titulo = useParams().name;
  const { productos, loading, carrito, setCarrito } = useContext(MarketContext);

  console.log(titulo);
  console.log(productos);
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
  console.log(productos)
  if (loading) {
    return <div>cargando</div>;
  } else {
    const index = productos.findIndex((el) => el.titulo == titulo);
    return (
      <div classtitulo="pt-5">
        <Card classtitulo="d-flex flex-lg-row m-auto tarjeta" text="black">
          <Card.Img classtitulo="w-50"
            variant="top"
            src={productos[index].img1_portada}
            alt={"Producto " + primeraMayuscula(titulo)}
          />
          <Card.Body classtitulo="py-0">
            <Card.Header classtitulo="fs-1 pb-4 border-light">
              {primeraMayuscula(titulo)}
            </Card.Header>

            <Card.Text>{productos[index].descripcion}</Card.Text>
            {/* <Card.Title classtitulo="fs-4 pb-4">Categoría: {primeraMayuscula(productos[index].category)}</Card.Title> */}

            {/* <ul>
                  <li>
                    {primeraMayuscula(productos[index].category)}
                  </li>
            </ul> */}

            <Card.Footer classtitulo="d-lg-flex justify-content-between align-items-center">
              <div classtitulo="precio">
                {"Precio: $" +
                  productos[index].precio
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </div>
              <div classtitulo="botones-detalles">
                <Button
                  style={{ width: "80px" }}
                  variant="warning"
                  onClick={() => {
                    handleAñadir(
                      productos[index].titulo,
                      productos[index].precio,
                      productos[index].img1_portada
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
                      productos[index].titulo,
                      productos[index].precio,
                      productos[index].img1_portada
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

export default ProductoDetails;
