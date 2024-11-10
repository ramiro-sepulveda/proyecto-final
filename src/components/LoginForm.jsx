import { Form, Button } from 'react-bootstrap';
import { useContext } from "react";
import { MarketContext } from "../context/ContextMarket";



const LoginForm = () => {
  const { usuario, setUsuario } = useContext(MarketContext);
  return (
    <div className='custom-form mx-4 align-self-center'>
      <h2 className='pb-4 text-center fs-46px'>Inicia Sesión</h2>
      <Form>

        <Form.Group controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Correo" className='custom-input rounded-4' />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Contraseña" className='custom-input rounded-4' />
        </Form.Group>

      </Form>
      <div className='mt-3 text-end'>
        <Button variant="primary" type="submit" className='rounded-3'>
          Entrar
        </Button>
      </div>
    </div>
  )
}
export default LoginForm;
