import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import '../styles/PasswordReset.css';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const captchaKEY = import.meta.env.VITE_CAPTCHA_KEY;

  const navigate = useNavigate();

  useEffect(() => {
    const loadRecaptcha = () => {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${captchaKEY}`;
      script.async = true;
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
        email,
        captcha: captchaToken,
      });

      if (response.status === 200) {
        setSuccessMessage('Se ha enviado un correo para restablecer la contraseña.');
        setErrorMessage('');
        // Redirigir a otra vista después de 2 segundos
        setTimeout(() => navigate('/RestablecerExito'), 2000);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Error al procesar la solicitud. Verifique el correo electrónico e intente de nuevo.';
      setErrorMessage(errorMsg);
      setSuccessMessage('');
    }
  };

  return (
    <div className="wrapper-is2">
      <Header/>
      <form onSubmit={handleSubmit}>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <h1 className='uwu'>Restablecer contraseña</h1>
        <p className='owo'>¿Cuál es tu correo electrónico?</p>

        {errorMessage && <div className="alert2 alert-danger">{errorMessage}</div>}
        {successMessage && <div className="alert2 alert-success">{successMessage}</div>}

        <div className="input-box-is2">
          <label className='xd'>Correo electrónico</label>
          <div className="input-box-email2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Escribe tu correo"
              required
            />
          </div>
        </div>

        <button type="submit" className="btn-is2">Enviar correo electrónico de restablecimiento</button>
      </form>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
    </div>
  );
};

export default PasswordReset;