import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../styles/Registrarse.css';

const Registrarse = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Para almacenar mensajes de error
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/;
    return passwordRegex.test(password);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  // Enviar los datos al backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage("Por favor ingrese un correo electrónico válido.");
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage("La contraseña debe tener entre 8 y 15 caracteres, incluir al menos una mayúscula, un número y un símbolo.");
      return;
    }

    try {
      // Hacer la petición POST al backend para registrar al usuario
      const response = await fetch('http://127.0.0.1:8000/registrar-usuario/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Usuario registrado:', data);
        // Redirigir a la página de verificación o inicio de sesión
        navigate('/Verificacion');
      } else {
        const errorData = await response.json();
        console.log('Error en el registro:', errorData);
        setErrorMessage('Ocurrió un error durante el registro.');
      }
    } catch (error) {
      console.log('Error en la solicitud:', error);
      setErrorMessage('Ocurrió un error en el servidor.');
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

          <button type="submit" className="btn-regis">Registrarse</button>

          <div className="login-link-regis">
            <p>¿Ya eres miembro? <Link to="/login">Iniciar Sesión</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registrarse;
