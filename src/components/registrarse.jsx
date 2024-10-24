import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';  // Importar el componente de reCAPTCHA
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Registrarse.css';

const Registrarse = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');  // Estado para almacenar el token de reCAPTCHA
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Función para manejar la respuesta de reCAPTCHA
  const handleCaptcha = (token) => {
    setCaptchaToken(token);  // Guardar el token de reCAPTCHA en el estado
  };

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

    let validationError = "";

    if (!validateEmail(email)) {
      validationError = "Por favor ingrese un correo electrónico válido.";
    }

    if (!validatePassword(password)) {
      validationError = "La contraseña debe tener entre 8 y 15 caracteres, incluir al menos una mayúscula, un número y un símbolo.";
    }

    if (!captchaToken) {
      validationError = "Por favor completa el reCAPTCHA para continuar.";
    }

    if (validationError) {
      setErrorMessage(validationError);
      setTimeout(() => setErrorMessage(''), 3000); // Ocultar mensaje después de 3 segundos
    } else {
      setErrorMessage('');

      try {
        // Hacer la solicitud POST al backend para registrar el usuario
        const response = await axios.post('http://localhost:8000/api/register/', {
          email: email,
          password: password,
          role: 'turista',  // Asignamos el rol "turista"
          captcha: captchaToken  // Enviar el token del reCAPTCHA al backend
        });

        // Almacenar el correo del usuario en localStorage
        localStorage.setItem('userEmail', email);

        // Si el registro es exitoso, redirigir a la página de verificación
        navigate('/Verificacion');
      } catch (error) {
        // Mostrar el mensaje de error recibido del backend
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data.error || 'Error al registrar el usuario. Inténtelo de nuevo.');
        } else {
          setErrorMessage('Error al registrar el usuario. Inténtelo de nuevo.');
        }
      }
    }
  };

  return (
    <div className="registrarse-container">
      {/* Alerta flotante */}
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

          {/* Integración de reCAPTCHA */}
          <div className="recaptcha-container">
            <ReCAPTCHA
              sitekey="6LdasmIqAAAAAF4N767_sMTOr62p9lsJOLqLzXYu"  // Reemplaza con tu clave del sitio reCAPTCHA
              onChange={handleCaptcha}
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