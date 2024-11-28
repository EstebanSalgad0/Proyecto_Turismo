import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../styles/AdminPanel.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';

const AdminPanel = () => {
  // Estado para servicios
  const [servicios, setServicios] = useState([]);
  const [mensajeServicios, setMensajeServicios] = useState('');
  const [viewedServices, setViewedServices] = useState({});
  const [selectedService, setSelectedService] = useState(null); // Estado para el servicio seleccionado

  const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local

  const transformTipoOferente = (tipoOferente) => {
    switch (tipoOferente) {
        case 'bienesServicios':
            return 'Bienes y Servicios';
        case 'artesano': 
            return 'Artesano';
            case 'cabanas': 
            return 'Cabañas';
        default:
            return 'Administrador'; // Devuelve el valor original si no se encuentra una coincidencia
    }
};

const transformCategoria = (tipoOferente) => {
  switch (tipoOferente) {
      case 'bienesServicios':
          return 'Servicios';
      case 'artesano': 
          return 'Artesanias';
          case 'cabanas': 
          return 'Cabañas';
      default:
          return 'Servicios'; // Devuelve el valor original si no se encuentra una coincidencia
  }
};

  // Fetch de servicios pendientes
  const fetchServicios = useCallback(async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_SERVICIOS_URL, {
        headers: {
          'Authorization': `Token ${token}`,
        }
      });
      setServicios(response.data);
    } catch (error) {
      console.error('Error al obtener servicios:', error);
    }
  }, [token]); // Se ejecuta cada vez que el token cambia

  // useEffect para obtener servicios al cargar la página
  useEffect(() => {
    fetchServicios();
  }, [fetchServicios]);

  // Manejar servicios (aceptar/rechazar)
  const handleServiceAction = async (servicioId, accion) => {
    try {
      const url = `${import.meta.env.VITE_SERVICIOS_URL}${servicioId}/`;
      await axios.post(url, { accion }, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      setMensajeServicios(`Servicio ${accion} con éxito.`);
      fetchServicios(); // Refresca la lista de servicios
    } catch (error) {
      setMensajeServicios(`Error al ${accion} el servicio.`);
      console.error(`Error al manejar el servicio:`, error);
    }
  };

  const toggleView = (id) => {
    setViewedServices((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    setSelectedService(servicios.find(servicio => servicio.id === id)); // Establece el servicio seleccionado
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  const isViewed = (id) => !!viewedServices[id];

  return (
    <div className="admin-panel-container">
      <Header/>
      <div className='admin-panel'>
        <h5>Oferentes de Servicios</h5>
        <h1>Panel de Administración de Servicios</h1>

        {/* Manejar servicios */}
        <div className="admin-section">
          {mensajeServicios && <p className="admin-message">{mensajeServicios}</p>}
          {servicios.length === 0 ? (
            <p>No hay servicios disponibles.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nombre del Servicio</th>
                  <th>Categoría</th>
                  <th>Estado</th>
                  <th>Administración de solicitudes</th>
                </tr>
              </thead>
              <tbody>
                {servicios.map((servicio) => (
                  <tr key={servicio.id}>
                    <td>{servicio.nombre}</td>
                    <td className='thh'>{transformCategoria(servicio.tipo_oferente) || 'No disponible'}</td>
                    <td className='thh'>{servicio.estado}</td>
                    <td>
                      <div className="admin-buttons">
                        <button
                          className="accept"
                          onClick={() => handleServiceAction(servicio.id, 'aceptar')}
                          disabled={servicio.estado !== 'pendiente'}
                        >
                          Aceptar
                        </button>
                        <button
                          className="reject"
                          onClick={() => handleServiceAction(servicio.id, 'rechazar')}
                          disabled={servicio.estado !== 'pendiente'}
                        >
                          Rechazar
                        </button>
                        <button
                          className="view-toggle"
                          onClick={() => toggleView(servicio.id)}
                        >
                         <i className="bi bi-eye"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      
      {/* Modal para mostrar detalles del servicio en formato de tarjeta */}
      {selectedService && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className='cerrar'>
              <button className="close-modal" onClick={closeModal}>X</button>
            </div>
            
            <div className="modal-details">
              <h2>{selectedService.nombre}</h2>
              <p>
                <strong>Oferente:</strong> 
                {selectedService.first_name && selectedService.last_name 
                ? ` ${selectedService.first_name} ${selectedService.last_name}` 
                : ' Administrador de Servicios'}
              </p>
              <p><strong>Tipo Oferente:</strong> {transformTipoOferente(selectedService.tipo_oferente) || 'Rol no disponible'}</p>
              <p><strong>Estado:</strong> {selectedService.estado}</p>
              <p><strong>Descripción:</strong> {selectedService.descripcion}</p>
              <p><strong>Contacto:</strong> {selectedService.telefono}</p>
              <p><strong>Redes Sociales:</strong> {selectedService.redes_sociales}</p>
            </div>
            {/* Galería de imágenes */}
      <div className="image-gallery2">
      <div className="image-wrapper">
    {selectedService.imagen ? (
      <img 
        src={`${import.meta.env.VITE_BACKEND_URL}${selectedService.imagen}`} 
        alt={`Imagen de ${selectedService.nombre}`} 
        className="gallery-image2" 
      />
    ) : (
      <p className="no-images-message">No hay imagen</p>
    )}
  </div>
        <div className="image-wrapper">
    {selectedService.imagen2 ? (
      <img 
        src={`${import.meta.env.VITE_BACKEND_URL}${selectedService.imagen2}`} 
        alt={`Imagen 2 de ${selectedService.nombre}`} 
        className="gallery-image2" 
      />
    ) : (
      <p className="no-images-message">No hay imagen</p>
    )}
  </div>
        <div className="image-wrapper">
    {selectedService.imagen3 ? (
      <img 
        src={`${import.meta.env.VITE_BACKEND_URL}${selectedService.imagen3}`} 
        alt={`Imagen 3 de ${selectedService.nombre}`} 
        className="gallery-image2" 
      />
    ) : (
      <p className="no-images-message">No hay imagen</p>
    )}
  </div>
        <div className="image-wrapper">
    {selectedService.imagen4 ? (
      <img 
        src={`${import.meta.env.VITE_BACKEND_URL}${selectedService.imagen4}`} 
        alt={`Imagen 4 de ${selectedService.nombre}`} 
        className="gallery-image2" 
      />
    ) : (
      <p className="no-images-message">No hay imagen</p>
    )}
  </div>
        {!selectedService.imagen && !selectedService.imagen2 && !selectedService.imagen3 && !selectedService.imagen4 && (
          <p>No hay imágenes disponibles</p>
        )}
      </div>
    </div>
    
  </div>
  
  
)}
    <SocialSection/>
    <Footer/>
    </div>
  );
};

export default AdminPanel;