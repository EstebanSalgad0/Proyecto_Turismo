import React, { useState, useEffect } from 'react';
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


  // Manejar el inicio de sesión con Google
  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log('Google Login Success:', credentialResponse);
    // Redirigir a la página en blanco (Index)
    navigate('/Index');
  };

  const handleGoogleLoginError = () => {
    console.log('Google Login Failed');
  };

  // Función para validar el formato del correo electrónico
  const validateEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);

  // Función para validar que la contraseña cumpla con ciertos requisitos
  const validatePassword = (password) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/.test(password);

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault(); // Previene que el formulario recargue la página al ser enviado
    if (validateEmail(email) && validatePassword(password)) {
      console.log("Formulario válido, redirigiendo...");
      // Redirigir a la página en blanco (Index)
      navigate('/Index');
    } else {
      alert("Por favor ingrese un correo y contraseña válidos");
    }
  };

  return (
    <div className="inicio-sesion-container">
      <div className="wrapper-is">
        {/* Formulario de inicio de sesión */}
        <form onSubmit={handleSubmit}>
          <div className='Logo'></div>

          <h1>Te damos la bienvenida
          a Cultura y Turismo</h1>
          
          <div className="input-box-is"> <label >Correo electrónico</label>
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
            <div className='input-box-password'><label>Contraseña</label>
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

          {/* Google Login Button */}
          <GoogleOAuthProvider clientId="665073710932-rnt0p38keoc3dtipen1t7vac08fq9k7a.apps.googleusercontent.com">
            <div className="google-login-container">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
                useOneTap={true}
                size="large" 
                shape="pill"
                width="250" 
              />
            </div>
          </GoogleOAuthProvider>

          <div className="register-link">
            
            <p>¿Aún no estás en Turismo y Cultura? <Link to="/registrarse">Regístrate</Link></p>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default InicioSesion;
