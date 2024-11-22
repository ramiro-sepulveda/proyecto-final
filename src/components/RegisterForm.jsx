import { Form, Button } from 'react-bootstrap';
import { useContext, useState } from "react";
import { MarketContext } from "../context/ContextMarket";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiUsuarios } from '../api/apiUsuarios';


const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    password: "",

  })
  const { usuario, setUsuario, regitro, setRegistro, setIsAuthenticated } = useContext(MarketContext);
  const handleUser = (event) => setFormData({ ...formData, [event.target.name]: event.target.value })

  const handleForm = (event) => {
    event.preventDefault()
    const usuario = formData

    if (
      !usuario.nombre.trim() ||
      !usuario.apellido.trim() ||
      !usuario.email.trim() ||
      !usuario.telefono.trim() ||
      !usuario.password.trim()
    ) {
      return window.alert('Todos los campos son obligatorias.');
    }


    if (!emailRegex.test(usuario.email)) {
      return window.alert('El formato del email no es correcto!')
    }

    console.log(usuario)
    apiUsuarios.crearUsuario(usuario)
      .then((data) => {
        window.alert('Usuario registrado con éxito 😀.')
        window.sessionStorage.setItem('token', 'Bearer ' + data.token)
        setIsAuthenticated(true)
        // navigate('/login')
      })
      .catch((error) => {
        console.error(error)
        window.alert(`${error.message} 🙁.`)
      })
  }


  // useEffect(() => {
  //   if (window.sessionStorage.getItem('token')) {
  //     navigate('/perfil')
  //   }
  // }, [])

  return (
    <div className='custom-form mx-4 align-self-center'>
      <h2 className='white pb-4 text-center fs-46px'>Regístrate</h2>
      <Form onSubmit={handleForm}>
        <Form.Group controlId="formBasicName">
          <Form.Control
            onChange={handleUser}
            type='name'
            name='nombre'
            className='custom-input rounded-4'
            placeholder='Nombre' />
        </Form.Group>

        <Form.Group controlId="formBasicLastname">
          <Form.Control onChange={handleUser}
            type='name'
            name='apellido'
            className='custom-input rounded-4'
            placeholder='Apellido' />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Control onChange={handleUser}
            type='email'
            name='email'
            className='custom-input rounded-4'
            placeholder='Correo' />
        </Form.Group>

        <Form.Group controlId="formBasicPhone">
          <Form.Control onChange={handleUser}
            type='phone'
            name='telefono'
            className='custom-input rounded-4'
            placeholder='Teléfono' />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control onChange={handleUser}
            type='password'
            name='password'
            className='custom-input rounded-4'
            placeholder='Contraseña' />
        </Form.Group>

        <Form.Group controlId="formBasicPassword2">
          <Form.Control onChange={handleUser}
            type='password'
            name='img_perfil'
            className='custom-input rounded-4'
            placeholder='Repita su Contraseña' />
        </Form.Group>
        <div className='mt-3 text-end'>
          <Button variant="warning" type="submit" className='rounded-3'>
            Registrarse
          </Button>
        </div>

      </Form>

    </div>
  )
}
export default RegisterForm;
