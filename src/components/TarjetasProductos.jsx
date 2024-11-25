import { Button, Card } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { MarketContext } from "../context/ContextMarket";
import { useNavigate } from "react-router-dom";
import Emoji from "react-emojis";
import { apiPublicaciones } from "../api/apiPublicaciones";
import { apiFavoritos } from "../api/apiFavoritos";
import { apiCarrito } from "../api/apiCarrito";

const TarjetasProductos = () => {
  const { productos, setLoading, loading, carrito, setCarrito, favoritos, setFavoritos, setProductos, usuario } = useContext(MarketContext);
  const navigate = useNavigate();

  const irAProducto = (id) => navigate(`/publicaciones/${id}`);

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

  const handleAñadir = (tipo, precio, img, publicacionid) => {
    apiCarrito.obtenerProductos(usuario.id)
    .then((data)=> setCarrito(data));
    const existe = carrito.some((el) => el.publicacion_id === publicacionid);
    console.log(existe);


    if (existe) {
      setCarrito(
        carrito.map((el) =>
          el.publicacion_id === publicacionid ? { ...el, cant: el.cant + 1 } : el
        )
      );

      apiCarrito.actualizarCantidad(usuario.id, publicacionid, cant);//actualizar mejor
    } else {
      apiCarrito.agregarProducto(usuario.id, publicacionid)
        .then((data) => {
          if (data) {
            console.log("Producto añadido al carrito:", data);
            setCarrito([...carrito, { tipo, precio, cant: 1, img, publicacion_id: publicacionid }]);
          }
        })
        .catch((error) => {
          console.error("Error al añadir el producto al carrito:", error);
        });
    }
  };

  const handleAñadirFavorito = (publicacionid) => {
    apiFavoritos.agregarFavorito(usuario.id, publicacionid);
    console.log("Producto añadido a favoritos:");
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
                    handleAñadir(el.titulo, el.precio, el.img1_portada, el.publicacion_id);
                  }}
                >
                  Añadir <Emoji emoji="shopping-cart" />
                </Button>
                <Button
                  value={el.titulo}
                  style={{ width: "45%" }}
                  className="cardButton"
                  onClick={() => handleAñadirFavorito(el.publicacion_id)}
                >
                  <Emoji emoji="red-heart" />
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
