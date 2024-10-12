import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../styles/Registrarse.css';

const Registrarse = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Para almacenar mensajes de error
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/;
    return passwordRegex.test(password);
  };

  const validateBirthDate = (birthDate) => {
    const currentDate = new Date();
    const [day, month, year] = birthDate.split('/');
    const inputDate = new Date(`${year}-${month}-${day}`);
    return inputDate <= currentDate;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let validationError = "";

    if (!validateEmail(email)) {
      validationError = "Por favor ingrese un correo electrónico válido.";
    }

    if (!validatePassword(password)) {
      validationError = "La contraseña debe tener entre 8 y 15 caracteres, incluir al menos una mayúscula, un número y un símbolo.";
    }

    if (!validateBirthDate(birthDate)) {
      validationError = "La fecha de nacimiento debe ser anterior o igual a la fecha actual.";
    }

    if (validationError) {
      setErrorMessage(validationError);
      setTimeout(() => setErrorMessage(''), 3000); // Ocultar mensaje después de 3 segundos
    } else {
      setErrorMessage('');
      navigate('/Verificacion');
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
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

          <div className="input-box-regis">
            <label>Fecha de nacimiento</label>
            <input 
              type="text" 
              value={birthDate} 
              onChange={(e) => setBirthDate(e.target.value)}
              placeholder="dd/mm/aaaa" 
              required 
            />
          </div>

          <button type="submit" className="btn-regis">Continuar</button>

          <div className="or-section-regis">O</div>

          <GoogleOAuthProvider clientId="tu-google-client-id">
            <div className="google-login-container">
              <GoogleLogin 
                onSuccess={() => navigate('/Index')}
                onError={() => console.log('Error al iniciar sesión con Google')}
                size="large" 
                shape="pill"
                width="250" 
              />
            </div>
          </GoogleOAuthProvider>

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
