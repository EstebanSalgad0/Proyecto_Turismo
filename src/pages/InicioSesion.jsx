import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; // Importa Google OAuth
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import 'boxicons/css/boxicons.min.css'; // Importa los iconos de Boxicons
import "../styles/InicioSesion.css"; // Importa el archivo CSS de estilos personalizados para el formulario

// Componente de inicio de sesión
const InicioSesion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook de React Router para redirigir a otras rutas

  // Inicializa el SDK de Facebook cuando el componente se carga
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '484575820957696', // Reemplaza con tu App ID de Facebook
        cookie: true,
        xfbml: true,
        version: 'v12.0'
      });
    };

    // Cargar el SDK de Facebook
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  // Manejar el inicio de sesión con Facebook
  const handleFacebookLogin = () => {
    window.FB.login(function (response) {
      if (response.authResponse) {
        console.log('Bienvenido! Fetching your information.... ');
        window.FB.api('/me', function (response) {
          console.log('Good to see you, ' + response.name + '.');
        });
        // Redirigir a la página en blanco (Index)
        navigate('/Index');
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    });
  };

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
      <div className="wrapper">
        {/* Formulario de inicio de sesión */}
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          
          <div className="input-box">
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email" 
              required 
            />
            <i className='bx bx-user'></i>
          </div>

          <div className="input-box">
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña" 
              required 
            />
            <i className='bx bx-lock-alt'></i>
          </div>

          <div className="remember-forgot">
            <label><input type="checkbox" /> Recordar</label>
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit" className="btn">Ingresar</button>

          <div className="register-link">
            <p>No tienes cuenta? <a href="#">Regístrate</a></p>
          </div>

          {/* Facebook Login Button */}
          <div className="fb-login-container">
            <button onClick={handleFacebookLogin} className="fb-login-button">
              Iniciar con Facebook
            </button>
          </div>

          {/* Google Login Button */}
          <GoogleOAuthProvider clientId="665073710932-rnt0p38keoc3dtipen1t7vac08fq9k7a.apps.googleusercontent.com">
            <div className="google-login-container">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
                useOneTap={true}
                width="300"
              />
            </div>
          </GoogleOAuthProvider>
        </form>
      </div>
    </div>
  );
};

export default InicioSesion;
