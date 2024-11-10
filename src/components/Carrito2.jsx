import { useContext, useEffect } from "react";
import { MarketContext } from "../context/ContextMarket";

const Carrito2 = ({ clase }) => {
  const { carrito, setCarrito, pizzas } = useContext(MarketContext);

  let total = 0;
  const precioTotal = (array) => {
    array.forEach((el) => {
      total += el.precio * el.cant;
    });
    console.log(total);
    return total;
  };

  precioTotal(carrito);

  return (
    <>
      <b className={clase}>
        {"$ " + total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
      </b>
    </>
  );
};

export default Carrito2;
