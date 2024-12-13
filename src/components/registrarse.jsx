import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Registrarse.css';

const Registrarse = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const captchaKEY = "6LcH3o4qAAAAAKlHasSy5RQD2oxcvtAkHXR29WrP";
  const [tipoOferente, setTipoOferente] = useState("");

  const handleTipoOferenteChange = (e) => {
    console.log(`Tipo de Oferente cambiado: ${e.target.value}`);
    setTipoOferente(e.target.value);
  };

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
    const isValid = passwordRegex.test(password);
    console.log(`Validación de contraseña: ${isValid}`);
    return isValid;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const isValid = emailRegex.test(email);
    console.log(`Validación de correo electrónico: ${isValid}`);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Formulario enviado');

    let validationError = '';

    if (!validateEmail(email)) {
      validationError = 'Por favor ingrese un correo electrónico válido.';
      console.log('Error de validación:', validationError);
    }

    if (!validatePassword(password)) {
      validationError = 'La contraseña debe tener entre 8 y 15 caracteres, incluir al menos una mayúscula, un número y un símbolo.';
      console.log('Error de validación:', validationError);
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
      console.log('Token reCAPTCHA obtenido:', recaptchaToken);

      // Hacer la solicitud POST al backend para registrar el usuario
      const response = await axios.post('https://9616ee88920d1f74470820c9ce8b36a3.loophole.site/api/register/', {
        first_name,
        last_name,
        email,
        password,
        role: 'oferente',
        tipo_oferente: tipoOferente, // Enviar tipoOferente aquí
        captcha: recaptchaToken,
      });
      console.log('Respuesta del servidor:', response.data);

      localStorage.setItem('userEmail', email);
      navigate('/Verificacion');
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
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
        <h1 className='h1-regis'>Te damos la Bienvenida a Visita Colbún</h1>
        <p className="subtitle-regis">¡Conviértete a Colbún en tu próxima aventura!<br />Te damos la bienvenida a la comuna</p>

        <form onSubmit={handleSubmit}>

        <div className="input-box-regis">
            <label>Nombres</label>
            <input
              type="text"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Eduardo Alexis"
              required
            />
          </div>

          <div className="input-box-regis">
            <label>Apellidos</label>
            <input
              type="text"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Guerrero Cabello"
              required
            />
          </div>

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
            <label htmlFor="tipoOferente">Seleccione su servicio:</label>
            <select id="tipoOferente" value={tipoOferente} onChange={handleTipoOferenteChange} required>
                <option value="">Seleccione una opción</option>
                <option value="artesano">Artesano/a</option>
                <option value="bienesServicios">Bienes y Servicios</option>
                <option value="cabanas">Cabañas</option>
            </select>
          </div>

          <button type="submit" className="btn-regis">Continuar</button>

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