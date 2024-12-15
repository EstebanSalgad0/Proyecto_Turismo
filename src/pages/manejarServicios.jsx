import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../styles/AdminPanel.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SocialSection from "../components/SocialSeccion";
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';

const AdminPanel = () => {
  // Estado para servicios
  const [servicios, setServicios] = useState([]);
  const [mensajeServicios, setMensajeServicios] = useState("");
  const [viewedServices, setViewedServices] = useState({});
  const [selectedService, setSelectedService] = useState(null); // Estado para el servicio seleccionado
  const { t, i18n } = useTranslation(); // Hook para usar traducciones

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language'); // Obtener el idioma guardado
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage); // Cambiar el idioma si es necesario
    }
  }, [i18n]);

  const token = localStorage.getItem("token"); // Obtener el token del almacenamiento local

  const transformTipoOferente = (tipoOferente) => {
    switch (tipoOferente) {
      case "bienesServicios":
        return t('bienesServiciosTraducido');
      case "artesano":
        return t('ArtesanoTraducido');
      case "cabanas":
        return t('CabanasTraducido');
      default:
        return "Administrador"; // Devuelve el valor original si no se encuentra una coincidencia
    }
  };

  const transformCategoria = (tipoOferente) => {
    switch (tipoOferente) {
      case "bienesServicios":
        return t('Serviciosxd');
      case "artesano":
        return t('Artesaniasxddd');
      case "cabanas":
        return t('Cabanasxdddd');
      default:
        return "Servicios"; // Devuelve el valor original si no se encuentra una coincidencia
    }
  };

  // Fetch de servicios pendientes
  const fetchServicios = useCallback(async () => {
    try {
      const response = await axios.get('https://18bfca26185c2591440b314da3d75cf4.loophole.site/api/manejar_servicios/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setServicios(response.data);
    } catch (error) {
      console.error("Error al obtener servicios:", error);
    }
  }, [token]); // Se ejecuta cada vez que el token cambia

  // useEffect para obtener servicios al cargar la página
  useEffect(() => {
    fetchServicios();
  }, [fetchServicios]);

  // Manejar servicios (aceptar/rechazar)
  const handleServiceAction = async (servicioId, accion) => {
    try {
      const url = `${'https://18bfca26185c2591440b314da3d75cf4.loophole.site/api/manejar_servicios/'}${servicioId}/`;
      await axios.post(
        url,
        { accion },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
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
    setSelectedService(servicios.find((servicio) => servicio.id === id)); // Establece el servicio seleccionado
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  const isViewed = (id) => !!viewedServices[id];

  return (
    <div className="admin-panel-container">
      <Header />
      <div className="admin-panel">
        <h5>{t("ServiceProviders")}</h5>
        <h1>{t("ServiceManagement")}</h1>

        {/* Manejar servicios */}
        <div className="admin-section">
          {mensajeServicios && (
            <p className="admin-message">{mensajeServicios}</p>
          )}
          {servicios.length === 0 ? (
            <p>{t("ServiciosNoDisponibles")}</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{t("nombreServicio")}</th>
                  <th>{t("categoriaServicios")}</th>
                  <th>{t("EstadoServicio")}</th>
                  <th>{t("Requestmanagement")}</th>
                </tr>
              </thead>
              <tbody>
                {servicios.map((servicio) => (
                  <tr key={servicio.id}>
                    <td>{servicio.nombre}</td>
                    <td className="thh">
                      {transformCategoria(servicio.tipo_oferente) ||
                        "No disponible"}
                    </td>
                    <td className="thh">{servicio.estado}</td>
                    <td>
                      <div className="admin-buttons">
                        <button
                          className="accept"
                          onClick={() =>
                            handleServiceAction(servicio.id, "aceptar")
                          }
                          disabled={servicio.estado !== "pendiente"}
                        >
                          {t('Aceptarxddd')}
                        </button>
                        <button
                          className="reject"
                          onClick={() =>
                            handleServiceAction(servicio.id, "rechazar")
                          }
                          disabled={servicio.estado !== "pendiente"}
                        >
                          {t('Rechazarxddd')}
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
            <div className="cerrar">
              <button className="close-modal" onClick={closeModal}>
                X
              </button>
            </div>

            <div className="modal-details">
              <h2>{selectedService.nombre}</h2>
              <p>
                <strong>{t('Oferenteowo')}</strong>
                {selectedService.first_name && selectedService.last_name
                  ? ` ${selectedService.first_name} ${selectedService.last_name}`
                  : " Administrador de Servicios"}
              </p>
              <p>
                <strong>{t('TipoOferenteowo')}</strong>{" "}
                {transformTipoOferente(selectedService.tipo_oferente) ||
                  "Rol no disponible"}
              </p>
              <p>
                <strong>{t('Statusxdddd')}</strong> {selectedService.estado}
              </p>
              <p>
                <strong>{t('Descripcion')}</strong> {selectedService.descripcion}
              </p>
              <p>
                <strong>{t('Contacto')}</strong> {selectedService.telefono}
              </p>
              <p>
                <strong>{t('RedesSociales')}</strong>{" "}
                {selectedService.redes_sociales}
              </p>
            </div>
            {/* Galería de imágenes */}
            <div className="image-gallery2">
              <div className="image-wrapper">
                {selectedService.imagen ? (
                  <img
                    src={`${'https://18bfca26185c2591440b314da3d75cf4.loophole.site'}${
                      selectedService.imagen
                    }`}
                    alt={`Imagen de ${selectedService.nombre}`}
                    className="gallery-image2"
                  />
                ) : (
                  <p className="no-images-message">{t('notenerimagenes1')}</p>
                )}
              </div>
              <div className="image-wrapper">
                {selectedService.imagen2 ? (
                  <img
                    src={`${'https://18bfca26185c2591440b314da3d75cf4.loophole.site'}${
                      selectedService.imagen2
                    }`}
                    alt={`Imagen 2 de ${selectedService.nombre}`}
                    className="gallery-image2"
                  />
                ) : (
                  <p className="no-images-message">{t('notenerimagenes1')}</p>
                )}
              </div>
              <div className="image-wrapper">
                {selectedService.imagen3 ? (
                  <img
                    src={`${'https://18bfca26185c2591440b314da3d75cf4.loophole.site'}${
                      selectedService.imagen3
                    }`}
                    alt={`Imagen 3 de ${selectedService.nombre}`}
                    className="gallery-image2"
                  />
                ) : (
                  <p className="no-images-message">{t('notenerimagenes1')}</p>
                )}
              </div>
              <div className="image-wrapper">
                {selectedService.imagen4 ? (
                  <img
                    src={`${'https://18bfca26185c2591440b314da3d75cf4.loophole.site'}${
                      selectedService.imagen4
                    }`}
                    alt={`Imagen 4 de ${selectedService.nombre}`}
                    className="gallery-image2"
                  />
                ) : (
                  <p className="no-images-message">{t('notenerimagenes1')}</p>
                )}
              </div>
              {!selectedService.imagen &&
                !selectedService.imagen2 &&
                !selectedService.imagen3 &&
                !selectedService.imagen4 && <p>{t('notenerimagenes')}</p>}
            </div>
          </div>
        </div>
      )}
      <SocialSection />
      <Footer />
    </div>
  );
};

export default AdminPanel;
