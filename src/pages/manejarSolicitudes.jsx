import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../styles/AdminPanel.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';

const AdminPanel = () => {
  // Estado para solicitudes
  const [solicitudes, setSolicitudes] = useState([]);
  const [mensajeSolicitudes, setMensajeSolicitudes] = useState('');

  const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local

  // Fetch de solicitudes
  const fetchSolicitudes = useCallback(async () => {
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
  }, [token]);

  // useEffect para obtener solicitudes y servicios al cargar la página
  useEffect(() => {
    fetchSolicitudes();
  }, [fetchSolicitudes]);

  // Manejar solicitudes de oferentes (aceptar/rechazar)
  const manejarSolicitud = async (id, accion) => {
    try {
      const url = `${import.meta.env.VITE_SOLICITUDES_ID_URL}${id}/`;
      // Aqui SÍ usamos response
      const response = await axios.post(url, { accion }, {
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
    <div className='admin-panel'>
      <h5>Oferentes de Servicios</h5>
      <h1>Panel de Administración de Oferentes</h1>

      {/* Manejar solicitudes */}
      <div className="admin-section">

        {mensajeSolicitudes && <p className="admin-message">{mensajeSolicitudes}</p>}
        <table className="admin-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Servicio y Categorias</th>
              <th>Estado</th>
              <th>Administración de solicitudes</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((solicitud) => (
              <tr key={solicitud.id}>
                <td>{solicitud.user}</td>
                <td className='thh'>{solicitud.servicio}</td>
                <td className='thh'>{solicitud.estado}</td>
                <td>
                  <div className="admin-buttons">
                    <button
                      className="accept"
                      onClick={() => manejarSolicitud(solicitud.id, 'aceptar')}
                      disabled={solicitud.estado !== 'pendiente'}
                    >
                      Aceptar
                    </button>
                    <button
                      className="reject"
                      onClick={() => manejarSolicitud(solicitud.id, 'rechazar')}
                      disabled={solicitud.estado !== 'pendiente'}
                    >
                      Rechazar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <SocialSection/>
    <Footer/>
  </div>

  );
};

export default AdminPanel;