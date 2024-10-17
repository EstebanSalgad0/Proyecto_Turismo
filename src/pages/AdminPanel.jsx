import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  // Estado para solicitudes
  const [solicitudes, setSolicitudes] = useState([]);
  const [mensajeSolicitudes, setMensajeSolicitudes] = useState('');

  // Estado para servicios
  const [servicios, setServicios] = useState([]);
  const [mensajeServicios, setMensajeServicios] = useState('');

  const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local

  // Fetch de solicitudes
  const fetchSolicitudes = async () => {
    try {
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

  // Fetch de servicios pendientes
  const fetchServicios = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/manejar_servicios/', {
        headers: {
          'Authorization': `Token ${token}`,
        }
      });
      setServicios(response.data);
    } catch (error) {
      console.error('Error al obtener servicios:', error);
    }
  };

  // useEffect para obtener solicitudes y servicios al cargar la página
  useEffect(() => {
    fetchSolicitudes();
    fetchServicios();
  }, []);

  // Manejar solicitudes de oferentes (aceptar/rechazar)
  const manejarSolicitud = async (id, accion) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/manejar_solicitud/${id}/`, { accion }, {
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
    <div>
      <h1>Panel de Administración</h1>

      {/* Manejar solicitudes */}
      <div>
        <h2>Manejar Solicitudes de Oferentes</h2>
        {mensajeSolicitudes && <p>{mensajeSolicitudes}</p>}
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

      {/* Manejar servicios */}
      <div>
        <h2>Servicios</h2>
        {mensajeServicios && <p>{mensajeServicios}</p>}
        {servicios.length === 0 ? (
          <p>No hay servicios disponibles.</p>
        ) : (
          <table>
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
                    <button 
                      onClick={() => handleServiceAction(servicio.id, 'aceptar')}
                      disabled={servicio.estado !== 'pendiente'}
                    >
                      Aceptar
                    </button>
                    <button 
                      onClick={() => handleServiceAction(servicio.id, 'rechazar')}
                      disabled={servicio.estado !== 'pendiente'}
                    >
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
