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

        <h1 className='h1-veri'>Verifique su Correo Electronico</h1>

        <p className="subtitle">¡Conviérte a Colbún en tu próxima aventura!</p>
        
        <p className='subtitle'>Te damos la bienvenida a la comuna, por favor verifique su correo electronico
          para saber que es una persona real y conocer los lugares turisticos que Colbún 
          tiene para ofrecer.</p>

          <button onClick={() => navigate('/login')} className="start-btn">
            Regresar al Login
          </button>
        
      </div>
    </div>
  );
};

export default Verificacion;