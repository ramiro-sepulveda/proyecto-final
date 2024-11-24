import { Button, Card } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { MarketContext } from "../context/ContextMarket";
import { useNavigate } from "react-router-dom";
import Emoji from "react-emojis";
import { apiPublicaciones } from "../api/apiPublicaciones"; // Asegúrate de tener la API para las publicaciones

const TarjetasProductos = () => {
  const { productos, setLoading, loading, carrito, setCarrito, favoritos, setFavoritos, setProductos } = useContext(MarketContext);
  const navigate = useNavigate();

  const irAProducto = (e) => navigate(`/producto/${e}`);

  useEffect(() => {
    apiPublicaciones.getProductos()
      .then((data) => {
        setProductos(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        window.alert(`${error.message} 🙁.`);
      });
  }, [setProductos, setLoading]);

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

  const handleAñadirFavorito = (producto) => {
    if (!Array.isArray(favoritos)) {
      console.error("Favoritos no está inicializado correctamente");
      return;
    }
  
    const existe = favoritos.some((fav) => fav.id === producto.id);
  
    if (existe) {
      console.log("El producto ya está en favoritos");
    } else {
      setFavoritos([...favoritos, producto]);
      console.log("Producto añadido a favoritos:", producto);
    }
  };

  if (loading) {
    return <div>cargando</div>;
  } else {
    return (
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

              <div className="precio">
                {"$ " + el.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </div>

              <div className="botones d-flex justify-content-around">
                <Button
                  value={el.titulo}
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
                  }}
                >
                  Añadir <Emoji emoji="shopping-cart" />
                </Button>
                <Button
                  value={el.titulo}
                  style={{ width: "45%" }}
                  className="cardButton"
                  onClick={() => handleAñadirFavorito(el)} // Agregar a favoritos
                >
                  <Emoji emoji="heart" />
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
};

export default TarjetasProductos;