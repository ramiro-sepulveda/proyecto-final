import { useParams } from "react-router-dom";
import { Button, Card, Carousel } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { apiPublicaciones } from "../api/apiPublicaciones";
import { MarketContext } from "../context/ContextMarket";
import Emoji from "react-emojis";

const ProductoDetails = () => {
  const { id } = useParams();
  const { carrito, setCarrito } = useContext(MarketContext);

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const primeraMayuscula = (str) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        console.log("ID enviado:", id); // <-- Asegúrate de que esto es correcto
        const data = await apiPublicaciones.detallePublicacion(id);
        console.log(id);
        setProducto(data);
        setLoading(false); // Cambiar a "no cargando"
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el detalle del producto.");
        setLoading(false); // Cambiar a "no cargando"
      }
    };

    fetchDetalle();
  }, [id]);

  const handleAñadir = (tipo, precio, img) => {
    const existe = carrito.some((el) => el.tipo === tipo);
    if (existe) {
      setCarrito(
        carrito.map((el) =>
          el.tipo === tipo ? { ...el, cant: el.cant + 1 } : el
        )
      );
    } else {
      setCarrito([...carrito, { tipo, precio, cant: 1, img }]);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!producto) {
    return <div>No se encontró el producto.</div>;
  }

  return (
    <div className="pt-5">
      <Card className="d-flex flex-lg-row m-auto tarjeta" text="black">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={producto.img1_portada}
              alt={`Producto ${producto.titulo}`}
            />

          </Carousel.Item>
          {producto.img2 && (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={producto.img2}
                alt={`Producto ${primeraMayuscula(producto.titulo)}`}
              />

            </Carousel.Item>)}

          {producto.img3 && (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={producto.img3}
                alt={`Producto ${primeraMayuscula(producto.titulo)}`}
              />

            </Carousel.Item>)}

          {producto.img3 && (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={producto.img3}
                alt={`Producto ${primeraMayuscula(producto.titulo)}`}
              />

            </Carousel.Item>)}

        </Carousel>

      
        <Card.Body className="py-0 w-50">
          <Card.Header className="fs-1 pb-4 border-light">
            {primeraMayuscula(producto.titulo)}
          </Card.Header>
          <Card.Text>{producto.descripcion}</Card.Text>
          <Card.Footer className="d-lg-flex justify-content-between align-items-center">
            <div className="precio">
              {"Precio: $" +
                producto.precio
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </div>
            <div className="botones-detalles">
              <Button
                style={{ width: "80px" }}
                variant="warning"
                onClick={() =>
                  handleAñadir(
                    producto.titulo,
                    producto.precio,
                    producto.img1_portada
                  )
                }
              >
                <Emoji emoji="red-heart" />
              </Button>
              <Button
                style={{ width: "140px" }}
                variant="danger"
                onClick={() =>
                  handleAñadir(
                    producto.titulo,
                    producto.precio,
                    producto.img1_portada
                  )
                }
              >
                <Emoji emoji="shopping-cart" /> Añadir
              </Button>
            </div>
          </Card.Footer>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductoDetails;
