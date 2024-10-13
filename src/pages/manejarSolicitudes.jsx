import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ManejarSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/solicitudes/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setSolicitudes(response.data);
      } catch (error) {
        console.error('Error al obtener las solicitudes:', error);
      }
    };

    fetchSolicitudes();
  }, []);

  const manejarSolicitud = async (id, accion) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:8000/api/manejar_solicitud/${id}/`, { accion }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setMensaje(response.data.mensaje); // Mensaje de éxito o error
      setSolicitudes((prev) => prev.filter((solicitud) => solicitud.id !== id));
    } catch (error) {
      console.error('Error al manejar la solicitud:', error);
      setMensaje('Error al manejar la solicitud. Intenta nuevamente.');
    }
  };

  return (
    <div>
      <h1>Manejar Solicitudes</h1>
      {mensaje && <p>{mensaje}</p>}
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Servicio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((solicitud) => (
            <tr key={solicitud.id}>
              <td>{solicitud.user}</td>
              <td>{solicitud.servicio}</td>
              <td>{solicitud.estado}</td>
              <td>
                <button onClick={() => manejarSolicitud(solicitud.id, 'aceptar')} disabled={solicitud.estado !== 'pendiente'}>Aceptar</button>
                <button onClick={() => manejarSolicitud(solicitud.id, 'rechazar')} disabled={solicitud.estado !== 'pendiente'}>Rechazar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManejarSolicitudes;
