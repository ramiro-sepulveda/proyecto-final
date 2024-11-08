import { useContext } from "react";
import { PizzasContext } from "../context/ContextPizzas";
import { Table } from "react-bootstrap";
import Carrito from "../components/Carrito";
Table;

const CarritoList = () => {
  const { carrito, setCarrito } = useContext(PizzasContext);

  function primeraMayuscula(str) {
    return str
      .split(" ")
      .map((word) => {
        if (word.length === 0) {
          return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }

  const handleAumentar = (tipo) => {
    setCarrito(
      carrito.map((el) =>
        el.tipo === tipo ? { ...el, cant: el.cant + 1 } : el
      )
    );
  };

  const handleDisminuir = (tipo, cant) => {
    if (cant == 1) {
      setCarrito(carrito.filter((el) => el.tipo !== tipo));
    } else {
      setCarrito(
        carrito.map((el) =>
          el.tipo === tipo ? { ...el, cant: el.cant - 1 } : el
        )
      );
    }
  };

  return (
    <>
      <Table
        className="tabla-carrito m-auto mt-5"
        variant="dark"
        striped
        responsive
        hover
      >
        <tbody>
          {carrito.map((el, i) => (
            <tr key={i}>
              <td style={{ width: "10%" }}>
                <img src={el.img} style={{ width: "100px" }}></img>
              </td>
              <td style={{ width: "65%" }}>{primeraMayuscula(el.tipo)}</td>
              <td style={{ width: "0%" }}>
                {"$" +
                  (el.precio * el.cant)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </td>
              <td className=" text-center" style={{ width: "20%" }}>
                <button
                  style={{ width: "40px" }}
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    handleDisminuir(el.tipo, el.cant);
                  }}
                >
                  -
                </button>

                <span className="px-3">{el.cant}</span>

                <button
                  style={{ width: "40px" }}
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    handleAumentar(el.tipo);
                  }}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={4}>
              <span className="text-white fs-1">{"Total: "}</span>
              <Carrito clase={"text-white fs-1"}></Carrito>
            </td>
          </tr>
          <button type="button" className="btn btn-success mt-3">
            Pagar
          </button>
        </tbody>
      </Table>
      <div className="d-flex"></div>
    </>
  );
};

export default CarritoList;
