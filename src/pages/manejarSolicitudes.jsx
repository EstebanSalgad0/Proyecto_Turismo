import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminPanel.css';
import Header from '../components/Header';

const AdminPanel = () => {
  // Estado para solicitudes
  const [solicitudes, setSolicitudes] = useState([]);
  const [mensajeSolicitudes, setMensajeSolicitudes] = useState('');

  const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local

  // Fetch de solicitudes
  const fetchSolicitudes = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_SOLICITUDES_URL, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setSolicitudes(response.data);
    } catch (error) {
      console.error('Error al obtener las solicitudes:', error);
    }
  };

  // useEffect para obtener solicitudes y servicios al cargar la página
  useEffect(() => {
    fetchSolicitudes();
  }, []);

  // Manejar solicitudes de oferentes (aceptar/rechazar)
  const manejarSolicitud = async (id, accion) => {
    try {
      const response = await axios.post(import.meta.env.VITE_SOLICITUDES_ID_URL, { accion }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setMensajeSolicitudes(response.data.mensaje); // Mensaje de éxito o error
      setSolicitudes((prev) => prev.filter((solicitud) => solicitud.id !== id));
    } catch (error) {
      console.error('Error al manejar la solicitud:', error);
      setMensajeSolicitudes('Error al manejar la solicitud. Intenta nuevamente.');
    }
  };

  return (
    <div className="admin-panel-container">
      <Header/>
      <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
    <h1>Panel de Administración de Oferentes</h1>

    {/* Manejar solicitudes */}
    <div className="admin-section">
      <h2>Manejar Solicitudes de Oferentes</h2>
      {mensajeSolicitudes && <p className="admin-message">{mensajeSolicitudes}</p>}
      <table className="admin-table">
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
                <button className="accept" onClick={() => manejarSolicitud(solicitud.id, 'aceptar')} disabled={solicitud.estado !== 'pendiente'}>Aceptar</button>
                <button className="reject" onClick={() => manejarSolicitud(solicitud.id, 'rechazar')} disabled={solicitud.estado !== 'pendiente'}>Rechazar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  );
};

export default AdminPanel;