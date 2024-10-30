import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import "../styles/InicioSesion.css";

const InicioSesion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Estado para manejar errores
  const navigate = useNavigate();
  const captchaKEY = import.meta.env.VITE_CAPTCHA_KEY;

  useEffect(() => {
    // Cargar el script de reCAPTCHA
    const loadRecaptcha = () => {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${captchaKEY}`;
      script.async = true;
      script.onload = () => {
        console.log('reCAPTCHA script loaded');
      };
      document.body.appendChild(script);
    };

    loadRecaptcha();
  }, [captchaKEY]);

  // Función para validar el formato del correo electrónico
  const validateEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);

  // Función para validar la contraseña
  const validatePassword = (password) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/.test(password);

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar formato de email y contraseña antes de enviar
    if (!validateEmail(email)) {
      setErrorMessage('Por favor ingrese un correo electrónico válido.');
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage('La contraseña debe tener entre 8 y 15 caracteres, incluir al menos una mayúscula, un número y un símbolo.');
      return;
    }

    // Obtener el token de reCAPTCHA V3
    try {
      const captchaToken = await window.grecaptcha.execute(captchaKEY, { action: 'login' }); // Acción asociada con 'login'

      const response = await axios.post(import.meta.env.VITE_LOGIN_URL, {
        email: email,
        password: password,
        captcha: captchaToken, // Enviar el token del captcha al backend
      });

      const { token, role } = response.data; // Asegurarse de que el backend devuelva el token y rol correctamente
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role); // Guardar el rol en el localStorage
      navigate('/Index');
    } catch (error) {
      setErrorMessage('Credenciales incorrectas o error en la verificación del captcha. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="inicio-sesion-container">
      <div className="wrapper-is">
        <form onSubmit={handleSubmit}>
          <div className='Logo'></div>

          <h1>Te damos la bienvenida a Cultura y Turismo</h1>

          {/* Alerta flotante para mostrar errores */}
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

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

          <button type="submit" className="btn-is">Iniciar sesión</button>

          <div className="remember-forgot">
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>

          <div className="register-link">
            <p>¿Aún no estás en Turismo y Cultura? <Link to="/registrarse">Regístrate</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InicioSesion;