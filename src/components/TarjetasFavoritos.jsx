import { Button, Card } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { MarketContext } from "../context/ContextMarket";
import { useNavigate } from "react-router-dom";
import Emoji from "react-emojis";
import { apiFavoritos } from "../api/apiFavoritos";

const TarjetasFavoritos = () => {
  const {
    setFavoritos,
    favoritos,
    loading,
    carrito,
    setCarrito,
    setLoading,
    categorias,
  } = useContext(MarketContext);
  console.log(favoritos);
  const navigate = useNavigate();
  const irAProducto = (e) => navigate(`/producto/${e}`);

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
        {
          tipo: tipo,
          precio: precio,
          cant: 1,
          img: img,
        },
      ]);
    }
  };

  const handleEliminarFavorito = async (id) => {
    try {
      const mensaje = await apiFavoritos.eliminarFavorito(id); // Llamada a la API

      setFavoritos((prevFavoritos) =>
        prevFavoritos.filter((fav) => fav.id !== id)
      ); // Actualizar el estado de publicaciones
    } catch (error) {
      alert("Error al eliminar la publicación. Inténtalo nuevamente.");
      console.error("Error al eliminar la publicación:", error.message);
    }
  };

  useEffect(() => {
    if (!favoritos || favoritos.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [setLoading, loading, favoritos]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="gallery d-grid row-gap-5 grid-columns">
      {favoritos && favoritos.length > 0 ? (
        favoritos.map((el) => (
          <Card
            className="d-flex m-auto tarjeta"
            text="black"
            key={el.favorito_id}
            style={{ width: "100%" }}
          >
            {el.img1_portada && (
              <Card.Img
                variant="top"
                src={el.img1_portada}
                alt={`Producto ${el.titulo}`}
                style={{ height: "300px", objectFit: "contain" }}
              />
            )}
            <Card.Header
              style={{ height: "80px" }}
              className="fs-4 border-light"
            >
              {primeraMayuscula(el.titulo || "Producto desconocido")}
            </Card.Header>
            <Card.Body>
              <Card.Title>Categoría:</Card.Title>
              <ul>
                <li>
                  {primeraMayuscula(
                    categorias.find(
                      (categoria) => categoria.id === el.categoria_id
                    ).nombre || "Sin categoría"
                  )}
                </li>
              </ul>
              <div className="precio">
                {"$ " +
                  (el.precio
                    ? el.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                    : "Precio no disponible")}
              </div>
              <div className="botones-favoritos d-flex justify-content-around">
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
                    console.log(carrito);
                  }}
                >
                  Añadir <Emoji emoji="shopping-cart" />
                </Button>
                <Button
                  value={el.titulo}
                  style={{ width: "45%" }}
                  className="cardButton bg-danger"
                  onClick={() => {
                    handleEliminarFavorito(el.favorito_id);
                    console.log(`Eliminar favorito: ${el.titulo}`);
                  }}
                >
                  Eliminar <Emoji emoji="wastebasket" />
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <div>No hay productos favoritos para mostrar.</div>
      )}
    </div>
  );
};

export default TarjetasFavoritos;
