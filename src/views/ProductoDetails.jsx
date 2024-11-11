import { useParams } from "react-router-dom";
import { Button, Card, Container } from "react-bootstrap";
import { useContext } from "react";
import { MarketContext } from "../context/ContextMarket";
import Emoji from "react-emojis";

const ProductoDetails = () => {
  const { name } = useParams();
  const { productos, loading, carrito, setCarrito } = useContext(MarketContext);
  console.log(name);
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

  if (loading) {
    return <div>cargando</div>;
  } else {
    const index = productos.findIndex((el) => el.name == name);
    return (
      <div className="pt-5">
        <Card className="d-flex flex-lg-row m-auto tarjeta" text="black">
          <Card.Img className="w-50"
            variant="top"
            src={productos[index].img}
            alt={"Producto " + primeraMayuscula(name)}
          />
          <Card.Body className="py-0">
            <Card.Header className="fs-1 pb-4 border-light">
              {primeraMayuscula(name)}
            </Card.Header>

            <Card.Text>{productos[index].desc}</Card.Text>
            <Card.Title className="fs-4 pb-4">Categoría: {primeraMayuscula(productos[index].category)}</Card.Title>
          
            {/* <ul>
                  <li>
                    {primeraMayuscula(productos[index].category)}
                  </li>
            </ul> */}

            <Card.Footer className="d-lg-flex justify-content-between align-items-center">
              <div className="precio">
                {"Precio: $" +
                  productos[index].price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </div>
              <div className="botones-detalles">
              <Button
                style={{ width: "80px" }}
                variant="warning"
                onClick={() => {
                  handleAñadir(
                    productos[index].name,
                    productos[index].price,
                    productos[index].img
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
                    productos[index].name,
                    productos[index].price,
                    productos[index].img
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
