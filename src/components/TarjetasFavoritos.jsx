import { Button, Card } from "react-bootstrap";
import { useContext } from "react";
import { MarketContext } from "../context/ContextMarket";
import { useNavigate } from "react-router-dom";
import Emoji from "react-emojis";


const TarjetasFavoritos = () => {
  const { favoritos, loading, carrito, setCarrito } = useContext(MarketContext);

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
          img: img
        },
      ]);
    }
  };

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
            key={el.id}
            style={{ width: "100%" }}
          >
            {el.img && <Card.Img variant="top" src={el.img} alt={`Producto ${el.name}`} />}
            <Card.Header className="fs-2 border-light">
              {primeraMayuscula(el.name || "Producto desconocido")}
            </Card.Header>
            <Card.Body>
              <Card.Title>Categoría:</Card.Title>
              <ul>
                <li>{primeraMayuscula(el.category || "Sin categoría")}</li>
              </ul>
              <div className="precio">
                {"$ " + (el.price ? el.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "Precio no disponible")}
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
                  // Aquí podrías implementar la funcionalidad de eliminar de favoritos
                  onClick={() => console.log(`Eliminar favorito: ${el.name}`)}
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
