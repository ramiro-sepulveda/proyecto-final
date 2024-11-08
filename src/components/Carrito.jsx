import { useContext, useEffect } from "react";
import { PizzasContext } from "../context/ContextPizzas";

const Carrito = ({ clase }) => {
  const { carrito, setCarrito, pizzas } = useContext(PizzasContext);

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

export default Carrito;
