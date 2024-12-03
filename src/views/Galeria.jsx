// import { Card, Container } from "react-bootstrap";
import React, { useState } from 'react';
import TarjetasProductos from "../components/TarjetasProductos";
import SearchBar from "../components/SearchBar";

const Galeria = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <SearchBar handleSearch={handleSearch}/>
      <TarjetasProductos searchTerm={searchTerm}/>
    </>
  );
};

export default Galeria;
