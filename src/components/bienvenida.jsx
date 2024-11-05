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

        <br></br>
        <h1 className='h1-veri'>Te damos la bienvenida a nuestra comunidad de oferentes</h1>
        <br></br>
        <p className='subtitle'>¡Gracias por registrarte y ser parte de nuestra red!
                                Te damos la bienvenida a nuestro espacio de Artesanas/os,
                                Bienes, Servicios y Cabañas </p>
                                <br></br>

          <button onClick={() => navigate('/Index')} className="start-btn">
            ¡Comienza tu aventura!
          </button>
        
      </div>
    </div>
  );
};

export default Verificacion;