import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Importa Axios
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import "../styles/InicioSesion.css";

const InicioSesion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Función para validar el formato del correo electrónico
  const validateEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);

  // Función para validar que la contraseña cumpla con ciertos requisitos
  const validatePassword = (password) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/.test(password);

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateEmail(email) && validatePassword(password)) {
      try {
        const response = await axios.post('http://localhost:8000/api/login/', {
          email: email,
          password: password,
        });
  
        const { token, role } = response.data; // Asegúrate de que el backend devuelva el rol correctamente
        console.log("Rol recibido del servidor: ", role); // Log para verificar el rol
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', role); // Guardar el rol
        console.log("Email almacenado: ", email);
        console.log("Rol almacenado: ", role); // Verifica que imprima el rol correcto
  
        navigate('/Index');
      } catch (error) {
        alert('Credenciales incorrectas. Inténtalo de nuevo.'); // Mostrar el error como alert
      }
    } else {
      alert('Por favor ingrese un correo y contraseña válidos'); // Mostrar el error de validación como alert
    }
  };
  
  return (
    <div className="inicio-sesion-container">
      <div className="wrapper-is">
        {/* Formulario de inicio de sesión */}
        <form onSubmit={handleSubmit}>
          <div className='Logo'></div>

          <h1>Te damos la bienvenida a Cultura y Turismo</h1>
          
          <div className="input-box-is">
            <label>Correo electrónico</label>
            <div className='input-box-email'>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="visitacolbun@turismo.cl" 
                required 
              />
              <i className='bx bx-user'></i>
            </div>
          </div>

          <div className="input-box-is">
            <div className='input-box-password'>
              <label>Contraseña</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña" 
                required 
              />
              <i className='bx bx-lock-alt'></i>
            </div>
          </div>

          <div className="remember-forgot">
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit" className="btn-is">Iniciar sesión</button>

          <div className="register-link">
            <p>¿Aún no estás en Turismo y Cultura? <Link to="/registrarse">Regístrate</Link></p>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default InicioSesion;