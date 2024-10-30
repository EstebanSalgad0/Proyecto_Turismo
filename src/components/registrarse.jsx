import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Registrarse.css';

const Registrarse = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
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

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/;
    return passwordRegex.test(password);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let validationError = '';

    if (!validateEmail(email)) {
      validationError = 'Por favor ingrese un correo electrónico válido.';
    }

    if (!validatePassword(password)) {
      validationError = 'La contraseña debe tener entre 8 y 15 caracteres, incluir al menos una mayúscula, un número y un símbolo.';
    }

    if (validationError) {
      setErrorMessage(validationError);
      setTimeout(() => setErrorMessage(''), 3000); // Ocultar mensaje después de 3 segundos
      return;
    } else {
      setErrorMessage('');
    }

    try {
      // Obtener el token de reCAPTCHA V3 al hacer clic en el botón
      const recaptchaToken = await window.grecaptcha.execute(captchaKEY, { action: 'submit' });

      // Hacer la solicitud POST al backend para registrar el usuario
      const response = await axios.post(import.meta.env.VITE_REGISTRAR_URL, {
        email,
        password,
        role: 'turista',
        captcha: recaptchaToken, // Enviar el token de reCAPTCHA al backend
      });

      localStorage.setItem('userEmail', email);
      navigate('/Verificacion');
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error || 'Error al registrar el usuario. Inténtelo de nuevo.');
      } else {
        setErrorMessage('Error al registrar el usuario. Inténtelo de nuevo.');
      }
    }
  };

  return (
    <div className="registrarse-container">
      {errorMessage && (
        <div className="alert-float">
          {errorMessage}
        </div>
      )}

      <div className="wrapper-regis">
        <div className='Logo'></div>
        <h1 className='h1-regis'>Te damos la bienvenida a Cultura y Turismo</h1>
        <p className="subtitle-regis">¡Conviértete a Colbún en tu próxima aventura!<br />Te damos la bienvenida a la comuna</p>

        <form onSubmit={handleSubmit}>
          <div className="input-box-regis">
            <label>Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="visitacolbun@turismo.cl"
              required
            />
          </div>

          <div className="input-box-regis">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Crea una contraseña"
              required
            />
          </div>

          <button type="submit" className="btn-regis">Continuar</button>

          <div className="or-section-regis">O</div>

          <div className="divider-regis"></div>

          <div className="login-link-regis">
            <p>¿Ya eres miembro? <Link to="/login">Iniciar Sesión</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registrarse;