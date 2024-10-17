import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const ListarServiciosPendientes = () => {
  const [servicios, setServicios] = useState([]);
  const [mensaje, setMensaje] = useState('');

  const fetchServicios = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/manejar_servicios/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setServicios(response.data);
    } catch (error) {
      console.error('Error al obtener servicios:', error);
    }
  };

  useEffect(() => {
    fetchServicios(); // Llamar a fetchServicios al cargar el componente
  }, []);

  const handleServiceAction = async (servicioId, accion) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:8000/api/manejar_servicios/${servicioId}/`, { accion }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setMensaje(`Servicio ${accion} con éxito.`);
      fetchServicios(); // Refresca la lista de servicios
    } catch (error) {
      setMensaje(`Error al ${accion} el servicio.`);
      console.error(`Error al manejar el servicio:`, error);
    }
  };

  return (
    <div>
      <Header />
      <br /><br /><br /><br /><br /><br />
      <h1>Servicios Pendientes</h1>
      {mensaje && <p>{mensaje}</p>}
      {servicios.length === 0 ? (
        <p>No hay servicios pendientes.</p> // Mensaje si no hay servicios
      ) : (
        <ul>
          {servicios.map(servicio => (
            <div key={servicio.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div>
                <p><strong>Nombre del Servicio:</strong> {servicio.nombre}</p>
                <p><strong>Correo:</strong> {servicio.correo}</p>
                <p><strong>Descripción:</strong> {servicio.descripcion}</p>
                <p><strong>Estado:</strong> {servicio.estado}</p>
              </div>
              <div>
                <button 
                  onClick={() => handleServiceAction(servicio.id, 'aceptar')}
                  disabled={servicio.estado !== 'pendiente'} // Deshabilitar si no está pendiente
                >
                  Aceptar
                </button>
                <button 
                  onClick={() => handleServiceAction(servicio.id, 'rechazar')}
                  style={{ marginLeft: '10px' }}
                  disabled={servicio.estado !== 'pendiente'} // Deshabilitar si no está pendiente
                >
                  Rechazar
                </button>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListarServiciosPendientes;