import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const SearchBar = ({ handleSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    handleSearch(value); // Comunica el término de búsqueda al componente padre
  };

  return (
    <header className="searchBar-container bg-light d-flex justify-content-between align-items-center p-3">
      {/* Campo de búsqueda */}
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
              onChange={onSearchChange} // Maneja cambios en el input
            />
          </FloatingLabel>
        </div>
      </div>
    </header>
  );
};

export default SearchBar;
