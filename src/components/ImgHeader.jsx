const ImgHeader = () => {
  return (
    <>
      <header className="header-container">
        <div className="header-content">
          <img
            src="/mamma-mia/pizza-header.jpg"
            alt="Header Image"
            className="header-image"
          />
          <div className="header-title text-center">
            <h1>¡Pizzería Mamma Mia!</h1>
            <p className=" fs-4">
              ¡Tenemos las mejores pizzas que podras encontrar!
            </p>
          </div>
        </div>
      </header>
    </>
  );
};

export default ImgHeader;
