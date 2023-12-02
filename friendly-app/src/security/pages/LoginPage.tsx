import {FormEvent, ReactElement, useState, useEffect} from "react";
import './LoginPage.css'
import { useNavigate } from "react-router-dom";

export const LoginPage = (): ReactElement => {

  const navigate = useNavigate()

  const [data, setData] = useState({
    valid: false,
    data: {
      username:'',
      email: '',
      first_name: '',
      last_name: '',
      date_of_birth: '',
      country: '',
      phone_number: '',
      password: ''
    }
  })


  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const handleInputChange =(event: React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleLogin = async (event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    try{
      const response = await fetch('http://127.0.0.1:8000/login/' + formData.username + '/' + formData.password)
      const data =  await response.json()
      setData(data)
    }
    catch(error){
      console.error('Error during login: ', error)
    }
    console.log(data)
  }

  useEffect(() => {
    if (data.valid) {
      localStorage.setItem('user', formData.username);
      localStorage.setItem('email', data.data.email);
      localStorage.setItem('bird_date', data.data.date_of_birth);
      navigate('/home'); 
    }
  }, [data, formData.username]);


  return (
    <>
    <div className="login-body">
        <main>
            <div className="contenedor__todo">
                <div className="_caja__trasera">   
                    <div className="_caja__trasera-login">
                        <h3>¿Ya tienes una cuenta?</h3>
                        <p>Inicia sesión para entrar en la página</p>
                        <button id="btn__iniciar-seccion">Iniciar Sesión</button>
                    </div>
                    <div className="_caja__trasera-register">
                        <h3>¿Aún no tienes una cuenta?</h3>
                        <p>Regístrate para que puedas iniciar sesión</p>
                        <button id="btn__registrarse">Registrarse</button>
                    </div>
                </div>

                <div className="contenedor__login-register">
                    <form onSubmit={handleLogin}  className="formulario__login">
                        <h2>Iniciar Sesión</h2>
                        <input type="text" onChange={handleInputChange} name="username"  placeholder="Correo Electrónico" required/>
                        <input type="password"  onChange={handleInputChange} name = "password" placeholder="Contraseña" required/>
                        <button type="submit">Entrar</button>
                    </form>

                    <form action="" className="formulario__register">
                        <h2>Registrarse</h2>
                        <input type="text" placeholder="Nombre completo" required/>
                        <input type="text" placeholder="Correo Electrónico" required/>
                        <input type="text" placeholder="Usuario" required/>
                        <input type="password" placeholder="Contraseña" required/> 
                        <button type="submit">Registrarse</button>
                    </form>
                </div>
            </div>
        </main>
    </div>
    <script src='Login.js'> </script>
    </>
  );
};