import { useContext, useEffect, useState } from "react";
import { MarketContext } from "../context/ContextMarket";
import { apiCarrito } from "../api/apiCarrito";

const Carrito2 = ({ clase }) => {
  const { carrito, setCarrito, usuario } = useContext(MarketContext);
  const [total, setTotal] = useState(0);

  const precioTotal = (array) => {
    console.log(array);
    const totalCarrito = array.reduce(
      (acc, el) => acc + el.precio * el.cantidad,
      0
    );
    setTotal(totalCarrito);
    console.log(total);
  };

  useEffect(() => {
    apiCarrito
      .obtenerProductos(usuario.id)
      .then((data) => {
        console.log(carrito);
        setCarrito(data);
        console.log(data);
        precioTotal(data);
      })
      .catch((error) => console.error(error));
  }, [total]);
  return (
    <>
      <b className={clase}>
        {"$ " + total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
      </b>
    </>
  );
};

export default Carrito2;
