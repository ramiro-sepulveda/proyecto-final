import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useContext } from 'react';
import { MarketContext } from '../context/ContextMarket';

const SearchBar = () => {

  const { categorias, setFiltro, filtro } = useContext(MarketContext)

  const handleFiltro = (e) => { setFiltro(e.target.value) }

  return (
    <>
      <header className="searchBar-container bg-light d-flex justify-content-between align-items-center p-3">
        <div className="searchBar-content w-50">
          <div className='m-4'>
            <h3>Buscar:</h3>
          </div>
          <div className="m-3">
            <FloatingLabel
              controlId="floatingInput"
              label="Indica el nombre del producto"
              className=""
            >
              <Form.Control type="text" placeholder="Buscar" className='searchInput' />
            </FloatingLabel>
          </div>
        </div>
        <div>
          <Form.Select aria-label="Default select example" onChange={handleFiltro} value={filtro}>
            <option value="">Filtrar por:</option>{
              categorias.map((el) => (<option key={el.id} value={el.id}>{el.nombre}</option>))}

          </Form.Select>
        </div>
      </header>
    </>
  );
};

export default SearchBar;
