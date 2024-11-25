import { Button, Card } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { MarketContext } from "../context/ContextMarket";
import { useNavigate } from "react-router-dom";
import Emoji from "react-emojis";
import { apiPublicaciones } from "../api/apiPublicaciones";

const TarjetasProductos = () => {
  const { categorias, productos, setLoading, loading, carrito, setCarrito, setProductos } = useContext(MarketContext);
  const navigate = useNavigate();

  const irAProducto = (id) => navigate(`/publicaciones/${id}`);

  useEffect(() => {
    apiPublicaciones.getProductos()
      .then((data) => {
        setProductos(data.results)
        setLoading(false)

      })
      .catch((error) => {
        console.error(error)
        window.alert(`${error.message} 🙁.`)
      })
  }, []);

  function primeraMayuscula(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
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
      setCarrito([
        ...carrito,
        { tipo: tipo, precio: precio, cant: 1, img: img },
      ]);
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
              key={el.publicacion_id}
              style={{ width: "100%" }}
            >
              <Card.Img variant="top" src={el.img1_portada} alt={el.titulo} />
              <Card.Header className="fs-2 border-light">
                {primeraMayuscula(el.titulo)}
              </Card.Header>
              <Card.Body>
                <Card.Title>Categoría</Card.Title>

                <ul>
                  <li>
                    {primeraMayuscula(categorias.find(categoria => categoria.id === el.categoria_id).nombre)}
                  </li>
                </ul>

                <div className="precio">
                  {"$ " +
                    el.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </div>

                <div className="botones d-flex justify-content-around">
                  <Button
                    value={el.publicacion_id}
                    style={{ width: "45%" }}
                    variant="secondary"
                    onClick={(e) => irAProducto(e.currentTarget.value)}
                  >
                    Ver Más <Emoji emoji="eyes" />
                  </Button>
                  <Button
                    value={el.titulo}
                    style={{ width: "45%" }}
                    className="cardButton"
                    onClick={() => {
                      handleAñadir(el.titulo, el.precio, el.img1_portada);
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
