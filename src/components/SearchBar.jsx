import React, { useState, useContext } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { MarketContext } from "../context/ContextMarket";

const SearchBar = ({ handleSearch }) => {


  const { categorias, setFiltro, filtro } = useContext(MarketContext)
  const [searchInput, setSearchInput] = useState("");
  const handleFiltro = (e) => { setFiltro(e.target.value) }


  // Maneja cambios en el término de búsqueda
  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    handleSearch(value); // Comunica el término de búsqueda al componente padre
  };

  // Maneja cambios en el filtro de categoría
  const handleFiltro = (e) => {
    setFiltro(e.target.value);
  };

  return (
    <header className="searchBar-container bg-light d-flex justify-content-between align-items-center p-3">
      {/* Sección de búsqueda */}
      <div className="searchBar-content w-50">
        <div className="m-4">
          <h3>Buscar:</h3>
        </div>
        <div className="m-3">
          <FloatingLabel
            controlId="floatingInput"
            label="Indica el nombre del producto"
          >
            <Form.Control
              type="text"
              placeholder="Buscar"
              className="searchInput"
              value={searchInput}
              onChange={onSearchChange}
            />
          </FloatingLabel>
        </div>
      </div>

      {/* Sección de filtro de categorías */}
      <div>
        <Form.Select
          aria-label="Default select example"
          onChange={handleFiltro}
          value={filtro}
        >
          <option value="">Filtrar por:</option>
          {categorias.map((el) => (
            <option key={el.id} value={el.id}>
              {el.nombre}
            </option>
          ))}

        </Form.Select>
      </div>
    </header>
  );
};

export default SearchBar;
