import { useContext, useEffect, useState } from "react";
import { MarketContext } from "../context/ContextMarket";
import { apiCarrito } from "../api/apiCarrito";

const Carrito2 = ({ clase }) => {
  const { carrito, setCarrito, usuario } = useContext(MarketContext);
  const [total, setTotal] = useState(0);

  // Calcula el precio total del carrito
  const calcularPrecioTotal = (array) => {
    if (Array.isArray(array)) {
      return array.reduce((acc, el) => {
        const precio = el.precio || 0;
        const cantidad = el.cantidad || 0;
        return acc + precio * cantidad;
      }, 0);
    }
    return 0;
  };

  // Obtener productos del carrito al cargar el componente o cuando cambia el usuario
  useEffect(() => {
    if (usuario) {
      apiCarrito
        .obtenerProductos(usuario.id)
        .then((data) => {
          setCarrito(Array.isArray(data) ? data : []);
        })
        .catch((error) => console.error("Error al obtener productos del carrito:", error));
    }
  }, [usuario, setCarrito]);

  // Recalcular el precio total cuando cambia el carrito
  useEffect(() => {
    if (Array.isArray(carrito) && carrito.length > 0) {
      setTotal(calcularPrecioTotal(carrito));
    } else {
      setTotal(0); // Si el carrito está vacío o no es válido, el total será 0
    }
  }, [carrito]);

  return (
    <b className={clase}>
      {"$ " + total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
    </b>
  );
};

export default Carrito2;
