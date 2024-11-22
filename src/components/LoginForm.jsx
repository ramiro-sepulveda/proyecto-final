import { Form, Button } from 'react-bootstrap';
import { useContext, useState, useEffect } from "react";
import { useNavigate, } from 'react-router-dom';
import { MarketContext } from "../context/ContextMarket";
import { apiUsuarios } from '../api/apiUsuarios';

const LoginForm = () => {
  const navigate = useNavigate()
  const { usuario, setUsuario, setIsAuthenticated, isAuthenticated, logout } = useContext(MarketContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleUser = (event) => setFormData({ ...formData, [event.target.name]: event.target.value })

  const handleForm = (event) => {
    event.preventDefault()
    const login = formData

    if (
      !login.email.trim() ||
      !login.password.trim()
    ) {
      return window.alert('Todos los campos son obligatorias.');
    }

    console.log(login)
    apiUsuarios.loginUsuario(login)
      .then((data) => {
        window.alert('login realizado con éxito 😀.')
        console.log(data)
        window.sessionStorage.setItem('token', 'Bearer ' + data.token)
        setIsAuthenticated(true)
        // navigate('/perfil') No es necesario al estar en Login.jsx
      })
      .catch((error) => {
        console.error(error)
        window.alert(`${error.message} 🙁.`)
      })
  }


  return (
    <div className='custom-form mx-4 align-self-center d-flex flex-column align-items-center'>
      <h2 className='white pb-4 text-center fs-46px'>Inicia Sesión</h2>
      <Form onSubmit={handleForm} className='w-100'>

        <Form.Group controlId="formBasicEmail">
          <Form.Control onChange={handleUser}
            type='email'
            name='email'
            className='custom-input rounded-4'
            placeholder='Correo' />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control onChange={handleUser}
            type='password'
            name='password'
            className='custom-input rounded-4'
            placeholder='Contraseña' />
        </Form.Group>
        <div className='mt-3 text-center'>
          <Button variant="warning" type="submit" className='rounded-3'>
            Entrar
          </Button>
        </div>
      </Form>

    </div>
  )
}
export default LoginForm;
