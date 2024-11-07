import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import "../styles/InicioSesion.css";

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const captchaKEY = import.meta.env.VITE_CAPTCHA_KEY;

  useEffect(() => {
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

  const validateEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage('Por favor ingrese un correo electrónico válido.');
      return;
    }

    try {
      const captchaToken = await window.grecaptcha.execute(captchaKEY, { action: 'password_reset' });

      const response = await axios.post(import.meta.env.VITE_RESET_PASSWORD_URL, {
        email: email,
        captcha: captchaToken,
      });

      if (response.status === 200) {
        setSuccessMessage('Se ha enviado un correo para restablecer la contraseña.');
        setErrorMessage('');
      }
    } catch (error) {
      const errorMsg = error.response && error.response.data.error ? error.response.data.error : 'Error al procesar la solicitud. Verifique el correo electrónico e intente de nuevo.';
      setErrorMessage(errorMsg);
      setSuccessMessage('');
    }
  };

  return (
    <div className="inicio-sesion-container">
      <div className="wrapper-is">
        <form onSubmit={handleSubmit}>
          <div className='Logo'></div>

          <h1>Recupere su cuenta mediante su correo electrónico</h1>

          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}

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

          <button type="submit" className="btn-is">Enviar Correo</button>

          <div className="remember-forgot1">
            <Link to="/login">¿Recordaste tu contraseña? Regresar</Link>
          </div>

          <div className="register-link">
            <p>¿Aún no estás en Turismo y Cultura? <Link to="/registrarse">Regístrate</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;