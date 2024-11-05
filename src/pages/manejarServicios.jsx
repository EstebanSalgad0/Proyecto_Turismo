import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminPanel.css';
import Header from '../components/Header';

const AdminPanel = () => {
  // Estado para servicios
  const [servicios, setServicios] = useState([]);
  const [mensajeServicios, setMensajeServicios] = useState('');

  const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local

  // Fetch de servicios pendientes
  const fetchServicios = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/manejar_servicios/`, { // Cambia aquí
        headers: {
          'Authorization': `Token ${token}`,
        }
      });
      setServicios(response.data);
    } catch (error) {
      console.error('Error al obtener servicios:', error);
    }
  };

  // useEffect para obtener servicios al cargar la página
  useEffect(() => {
    fetchServicios();
  }, []);

  // Manejar servicios (aceptar/rechazar)
  const handleServiceAction = async (servicioId, accion) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/manejar_servicios/${servicioId}/`, { accion }, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      setMensajeServicios(`Servicio ${accion} con éxito.`); // Mensaje de éxito
      fetchServicios(); // Refresca la lista de servicios
    } catch (error) {
      setMensajeServicios(`Error al ${accion} el servicio.`); // Mensaje de error
      console.error(`Error al manejar el servicio:`, error);
    }
  };

  return (
    <div className="admin-panel-container">
      <Header/>
      <br></br>
      <h1>Panel de Administración de Servicios</h1>

      {/* Manejar servicios */}
      <div className="admin-section">
        <h2>Servicios</h2>
        {mensajeServicios && <p className="admin-message">{mensajeServicios}</p>}
        {servicios.length === 0 ? (
          <p>No hay servicios disponibles.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nombre del Servicio</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {servicios.map(servicio => (
                <tr key={servicio.id}>
                  <td>{servicio.nombre}</td>
                  <td>{servicio.estado}</td>
                  <td>
                    <button className="accept" onClick={() => handleServiceAction(servicio.id, 'aceptar')} disabled={servicio.estado !== 'pendiente'}>
                      Aceptar
                    </button>
                    <button className="reject" onClick={() => handleServiceAction(servicio.id, 'rechazar')} disabled={servicio.estado !== 'pendiente'}>
                      Rechazar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;