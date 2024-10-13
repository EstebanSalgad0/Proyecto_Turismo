import React, { useState, useEffect } from 'react';
import '../styles/Verificacion.css';
import { useNavigate } from 'react-router-dom';

const Verificacion = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(''); // Agregar el estado para el rol

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedRole = localStorage.getItem('userRole'); // Recuperar el rol
    if (storedEmail) {
      setEmail(storedEmail);
    }
    if (storedRole) {
      setRole(storedRole); // Establecer el rol
    }
  }, []);

  const getInitial = (email) => {
    return email ? email.charAt(0).toUpperCase() : '';
  };

  const navigate = useNavigate();

  return (
    <div className='wrapper-container-veri'>
      <div className="verificacion-container">
        <div className="avatar">
          <span className="avatar-text">{getInitial(email)}</span>
        </div>

        <h1 className='h1-veri'>Te damos la bienvenida <br /> a Cultura y Turismo</h1>

        <p className="subtitle">¡Conviértete a Colbún en tu próxima aventura!<br />
          Te damos la bienvenida a la comuna
        </p>

        {role === 'admin' && ( // Solo mostrar el botón si el rol es admin
          <button onClick={() => navigate('/Index')} className="start-btn">
            ¡Comienza tu aventura!
          </button>
        )}
      </div>
    </div>
  );
};

export default Verificacion;