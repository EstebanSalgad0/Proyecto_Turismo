import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/mostrarServicios.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SocialSection from "../components/SocialSeccion";
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';

const ListarServicios = () => {
  const [servicios, setServicios] = useState([]);
  const [expandedServicio, setExpandedServicio] = useState(null); // Estado para gestionar la expansión
  const { t, i18n } = useTranslation(); // Hook para usar traducciones

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language'); // Obtener el idioma guardado
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage); // Cambiar el idioma si es necesario
    }
  }, [i18n]);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await axios.get(
          'https://c61a7d0a26cfe25ef240d4257ce62807.loophole.site/api/listar_servicios_aceptados/'
        );

        // Agregar console.log para inspeccionar la respuesta
        console.log("Servicios recibidos:", response.data);

        setServicios(response.data);
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      }
    };

    fetchServicios();
  }, []);

  // Función para transformar el tipo de oferente
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

  const toggleExpand = (id) => {
    setExpandedServicio(expandedServicio === id ? null : id); // Alterna el estado de expansión
  };

  return (
    <div className="services-list-container">
      <Header />
      <div className="services-list">
        <br />
        <h1 className="services-title">{t("ServiciosDisponibles")}</h1>
        <br />
        <div className="services">
          {servicios.length === 0 ? (
            <p>{t("ServiciosNoDisponibles")}</p>
          ) : (
            servicios.map((servicio) => (
              <div key={servicio.id} className="service-container">
                <div
                  className={`service-card ${
                    expandedServicio === servicio.id ? "expanded" : "closed"
                  }`}
                  onClick={() => toggleExpand(servicio.id)}
                >
                  {/* Mostrar imagen en la tarjeta cerrada */}
                  <div className="image-gallery">
                    {servicio.imagen ? (
                      <img
                        src={`${'https://c61a7d0a26cfe25ef240d4257ce62807.loophole.site'}${servicio.imagen}`}
                        alt={`Imagen de ${servicio.nombre}`}
                        className="gallery-image"
                        onError={() =>
                          console.error(
                            `Error al cargar la imagen: ${servicio.imagen}`
                          )
                        }
                      />
                    ) : (
                      <div className="gallery-placeholder">{t("SinImagen")}</div>
                    )}
                  </div>
  
                  {expandedServicio === servicio.id && (
                    <>
                      <div className="service-header">
                        <h1 className="service-title">{servicio.nombre}</h1>
                        <button
                          className="close-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(null);
                          }}
                        >
                          <p>X</p>
                        </button>
                      </div>
  
                      <div
                        className={`expanded-gallery1 ${
                          servicio.imagen &&
                          !servicio.imagen2 &&
                          !servicio.imagen3 &&
                          !servicio.imagen4
                            ? "single-image"
                            : servicio.imagen &&
                              servicio.imagen2 &&
                              !servicio.imagen3 &&
                              !servicio.imagen4
                            ? "two-images"
                            : servicio.imagen &&
                              servicio.imagen2 &&
                              servicio.imagen3 &&
                              !servicio.imagen4
                            ? "three-images"
                            : "four-images"
                        }`}
                      >
                        {/* Galería expandida */}
                        {servicio.imagen && (
                          <img
                            src={`${'https://c61a7d0a26cfe25ef240d4257ce62807.loophole.site'}${servicio.imagen}`}
                            alt={`Imagen 1 de ${servicio.nombre}`}
                            className="expanded-gallery-image1"
                            onError={() =>
                              console.error(
                                `Error al cargar la imagen: ${servicio.imagen}`
                              )
                            }
                          />
                        )}
                        {servicio.imagen2 && (
                          <img
                            src={`${'https://c61a7d0a26cfe25ef240d4257ce62807.loophole.site'}${servicio.imagen2}`}
                            alt={`Imagen 2 de ${servicio.nombre}`}
                            className="expanded-gallery-image1"
                            onError={() =>
                              console.error(
                                `Error al cargar la imagen: ${servicio.imagen2}`
                              )
                            }
                          />
                        )}
                        {servicio.imagen3 && (
                          <img
                            src={`${'https://c61a7d0a26cfe25ef240d4257ce62807.loophole.site'}${servicio.imagen3}`}
                            alt={`Imagen 3 de ${servicio.nombre}`}
                            className="expanded-gallery-image1"
                            onError={() =>
                              console.error(
                                `Error al cargar la imagen: ${servicio.imagen3}`
                              )
                            }
                          />
                        )}
                        {servicio.imagen4 && (
                          <img
                            src={`${'https://c61a7d0a26cfe25ef240d4257ce62807.loophole.site'}${servicio.imagen4}`}
                            alt={`Imagen 4 de ${servicio.nombre}`}
                            className="expanded-gallery-image1"
                            onError={() =>
                              console.error(
                                `Error al cargar la imagen: ${servicio.imagen4}`
                              )
                            }
                          />
                        )}
                      </div>
  
                      <div className="service-details">
                        <p className="service-description">
                          <strong>{t("Descripcion")}</strong>{" "}
                          <span>{servicio.descripcion}</span>
                        </p>
  
                        <div className="service-contact">
                          <strong>{t("RedesSociales")}</strong>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: servicio.redes_sociales.replace(
                                /\n/g,
                                "<br />"
                              ),
                            }}
                          />
                        </div>
                        <p className="service-email">
                          <strong>{t("Contacto")}</strong>{" "}
                          <span>{servicio.telefono || "No disponible"}</span>
                        </p>
                        <p className="service-price">
                          <strong>{t("Valor")}</strong>{" "}
                          <span>
                            $
                            {servicio.precio
                              ? Math.round(servicio.precio)
                              : "No disponible"}
                          </span>
                        </p>
                      </div>
                    </>
                  )}
                </div>
                <div className="DownCard-MS">
                  <h3 className="service-title">{servicio.nombre}</h3>
                  <h5 className="TipoOferente">
                    {transformTipoOferente(servicio.tipo_oferente) ||
                      "Tipo no disponible"}
                  </h5>
                  <p className="ser-descripcion">
                    {servicio.descripcion.slice(0, 50)}...
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <SocialSection />
      <Footer />
    </div>
  );
  
  
};

export default ListarServicios;
