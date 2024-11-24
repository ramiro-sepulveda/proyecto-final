import { useParams } from "react-router-dom";
import { Button, Card, Container } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { MarketContext } from "../context/ContextMarket";
import Emoji from "react-emojis";
import { apiPublicaciones } from "../api/apiPublicaciones";

const ProductoDetails = () => {
  const { carrito, setCarrito } = useContext(MarketContext);
  const idPublicacion = parseInt(useParams().name.split('-')[0], 10);
  const [producto, setProducto] = useState()
  const [loading, setloading] = useState(true)

  useEffect(() => {
    console.log(producto)
    apiPublicaciones.detallePublicacion(idPublicacion)
      .then((data) => {
        console.log(data)
        setProducto(data)
        console.log(producto)
        setloading(false)

      })
      .catch((error) => {
        console.error(error)
        window.alert(`${error.message} 🙁.`)
      })
  }, []);

  // console.log(producto.titulo);
  // console.log(producto);
  // console.log(loading);

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
      <div classtitulo="pt-5">
        <Card classtitulo="d-flex flex-lg-row m-auto tarjeta" text="black">
          <Card.Img classtitulo="w-50"
            variant="top"
            src={producto.img1_portada}
            alt={"Producto " + primeraMayuscula(producto.titulo)}
          />
          <Card.Body classtitulo="py-0">
            <Card.Header classtitulo="fs-1 pb-4 border-light">
              {primeraMayuscula(producto.titulo)}
            </Card.Header>

            <Card.Text>{producto.descripcion}</Card.Text>
            {/* <Card.Title classtitulo="fs-4 pb-4">Categoría: {primeraMayuscula(producto.category)}</Card.Title> */}

            {/* <ul>
                  <li>
                    {primeraMayuscula(producto.category)}
                  </li>
            </ul> */}

            <Card.Footer classtitulo="d-lg-flex justify-content-between align-items-center">
              <div classtitulo="precio">
                {"Precio: $" +
                  producto.precio
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </div>
              <div classtitulo="botones-detalles">
                <Button
                  style={{ width: "80px" }}
                  variant="warning"
                  onClick={() => {
                    handleAñadir(
                      producto.titulo,
                      producto.precio,
                      producto.img1_portada
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
                      producto.titulo,
                      producto.precio,
                      producto.img1_portada
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
}


export default ProductoDetails;
