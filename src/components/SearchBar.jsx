import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const SearchBar = () => {
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
                <Form.Control type="text" placeholder="Buscar" className='searchInput'/>
                </FloatingLabel>
            </div>
          </div>
          <div>
          <Form.Select aria-label="Default select example">
            <option>Filtrar por:</option>
            <option value="1">opcion 1</option>
            <option value="2">opcion 2</option>
            <option value="3">opcion 3</option>
          </Form.Select>
          </div>
        </header>
      </>
    );
  };
  
  export default SearchBar;
  