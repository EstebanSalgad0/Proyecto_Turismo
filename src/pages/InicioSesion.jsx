import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; // Importa Google OAuth
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import 'boxicons/css/boxicons.min.css'; // Importa los iconos de Boxicons
import "../styles/InicioSesion.css"; // Importa el archivo CSS de estilos personalizados para el formulario

// Componente de inicio de sesión
const InicioSesion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook de React Router para redirigir a otras rutas

  // Función para validar el formato del correo electrónico
  const validateEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);

  // Función para validar que la contraseña cumpla con ciertos requisitos
  const validatePassword = (password) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/.test(password);

  // Función para manejar el envío del formulario y la comunicación con el backend
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (validateEmail(email) && validatePassword(password)) {
      try {
        // Enviar solicitud al backend de Django
        const response = await fetch('http://127.0.0.1:8000/inicio-sesion/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }), // Usamos email en lugar de username
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('Inicio de sesión exitoso:', data);
          // Redirigir al usuario a la página deseada
          navigate('/Index');
        } else {
          const errorData = await response.json();
          console.log('Error en el inicio de sesión:', errorData);
          alert('Credenciales inválidas');
        }
      } catch (error) {
        console.log('Error en la solicitud:', error);
        alert('Ocurrió un error al iniciar sesión');
      }
    } else {
      alert('Por favor ingrese un correo y contraseña válidos');
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

          <p className='O'>O</p>


          <div className="register-link">
            <p>¿Aún no estás en Turismo y Cultura? <Link to="/registrarse">Regístrate</Link></p>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default InicioSesion;
