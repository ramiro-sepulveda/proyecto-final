import { Form, Button } from 'react-bootstrap';
import { useContext, useState, useEffect } from "react";
import { useNavigate, } from 'react-router-dom';
import { MarketContext } from "../context/ContextMarket";
import { apiUsuarios } from '../api/apiUsuarios';

const LoginForm = () => {
  const navigate = useNavigate()
  const { usuario, setUsuario, setIsAuthenticated, isAuthenticated, login, logout } = useContext(MarketContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleUser = (event) => {
    if (event.target.name === "email") {
      setFormData({ ...formData, [event.target.name]: event.target.value.toLowerCase() })
    }
    else {
      setFormData({ ...formData, [event.target.name]: event.target.value })
    }
  }

  const handleForm = (event) => {
    event.preventDefault()
    const loginInfo = formData

    if (
      !loginInfo.email.trim() ||
      !loginInfo.password.trim()
    ) {
      return window.alert('Todos los campos son obligatorias.');
    }

    apiUsuarios.loginUsuario(loginInfo)
      .then((data) => {
        window.alert('login realizado con éxito 😀.')
        login(data.token)
        setUsuario(data.user)
        console.log(data)
        navigate(`/usuarios/perfil/${data.user.id}`)
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
