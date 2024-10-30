import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/solicitudOferente.css';
import Header from '../components/Header';

const SolicitudOferente = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [servicio, setServicio] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Enviar solicitud al backend
      const response = await axios.post(import.meta.env.VITE_SOLICITUD_OFERENTE_URL, {
        email,
        password,
        servicio,
      });

      // Manejar la respuesta del servidor
      if (response.data.success) {
        setMensaje('Solicitud enviada correctamente, espera la respuesta del administrador.');
      } else {
        setMensaje('Tu solicitud para ser oferente ha sido rechazada.');
      }

      // Redirigir o realizar otra acción si es necesario
      // navigate('/otra-ruta');
    } catch (error) {
      setMensaje('Error al enviar la solicitud. Por favor, intenta de nuevo.');
      console.error(error);
    }
  };

  return (
    <div className="solicitud-oferente">
      <h1>¿Quieres ser Oferente? <br /> envia tu solicitud.</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Correo electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Selecciona un servicio:</label>
          <select value={servicio} onChange={(e) => setServicio(e.target.value)} required>
            <option value="">Seleccionar...</option>
            <option value="artesania">Artesanía</option>
            <option value="bienes">Bienes y Servicios</option>
            <option value="alojamiento">Alojamiento</option>
          </select>
        </div>
        <button type="submit">Enviar Solicitud</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default SolicitudOferente;