import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/RestablecerExito.css';

const SuccessView = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Recuperar correo desde localStorage
    const storedEmail = localStorage.getItem('resetEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleRetry = () => {
    // Redirigir a la misma vista de restablecimiento de contraseña
    navigate('/OlvideContrasena');
  };

  const handleBackToLogin = () => {
    // Redirigir a la página de inicio de sesión
    navigate('/login');
  };

  return (
    <div>
      <Header />
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <div className="success-container2">
        <h1 className='www'>Se envió el correo electrónico</h1>
        <div className="div2">
          <p className="parrafo2">
            Enviamos un correo electrónico a <span id="mail">{email}</span>. Si
            este correo está vinculado a una cuenta de Visita Colbún, podrás restablecer tu contraseña.
          </p>
        </div>
        <p className="parrafo3">
          ¿No recibiste el correo electrónico? Prueba con estos consejos de nuestro{' '}
          <span id="asistencia">Centro de asistencia.</span>
        </p>
        <div className="buttons2">
          <button id="btnRetry" onClick={handleRetry}>
            Intentar de nuevo
          </button>
          <button id="btnBack" onClick={handleBackToLogin}>
            Volver a la página de inicio de sesión
          </button>
        </div>
      </div>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
    </div>
  );
};

export default SuccessView;