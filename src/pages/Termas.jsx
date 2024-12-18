import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Termas.css?v=1.6'; // Estilos específicos para el componente
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';
import Carousel from '../components/carousel';
import LeafletMap from '../components/LeafletMap'; // Componente de mapa
import { API_BASE_URL } from "../config"; // Importar la URL base

const Termas = () => {
  // Mapa Termas
  const [latTermas, setLatTermas] = useState(null);
  const [lngTermas, setLngTermas] = useState(null);
  const [isFirstMapTermas, setIsFirstMapTermas] = useState(true);

  const googleMapUrl =
    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d207285.59423382708!2d-71.57971686533725!3d-35.73021700110752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-35.7620407!2d-71.4205389!5e0!3m2!1ses-419!2scl!4v1732052571517!5m2!1ses-419!2scl";
  
  // Mapa Embalse Machicura
  const [latEmbalse, setLatEmbalse] = useState(null);
  const [lngEmbalse, setLngEmbalse] = useState(null);
  const [isFirstMapEmbalse, setIsFirstMapEmbalse] = useState(true);

  const googleMapUrl2 =
    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d103668.64366818257!2d-71.48513399411713!3d-35.710349798223056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-35.717444199999996!2d-71.3920626!5e0!3m2!1ses-419!2scl!4v1732052648526!5m2!1ses-419!2scl";

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language'); // Obtener el idioma guardado
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage); // Cambiar el idioma si es necesario
    }
    
    // Fetch data from the Django API (Termas)
    fetch(`${API_BASE_URL}/api/lugares/buscar/?nombre=termas_rutas`) // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatTermas(data.latitud);
      setLngTermas(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));
    
    // Fetch data from the Django API (Emblase Machicura)
    fetch(`${API_BASE_URL}/api/lugares/buscar/?nombre=embalse_machicura`) // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatEmbalse(data.latitud);
      setLngEmbalse(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));
  }, [i18n]); // Añadir el estado del idioma como dependencia

  // Toggle mapa Termas
  const toggleMapTermas = () => {
    setIsFirstMapTermas(!isFirstMapTermas);
  };
  
  // Toggle mapa Embalse Machicura
  const toggleMapEmbalse = () => {
    setIsFirstMapEmbalse(!isFirstMapEmbalse);
  };

  return (
    <div className="index-container">
      {/* Navbar */}
      <Header/>

      {/* Hero Section 1 */}
      <div className="hero17">
        <div className="hero-content17">
          <h5>{t('Routes')}</h5>
          <h1>{t('HotSprings')}</h1>
          <h4>{t('HotSpringsInfo')}</h4>
        </div>
      </div>

      {/* Termas */}
      <div className="info-section1">
        <section className="map-section">
          {latTermas && lngTermas && isFirstMapTermas ? (
            <LeafletMap latitud={latTermas} longitud={lngTermas} mapId={"termasMap"} googleMapUrl={googleMapUrl}/>
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1732110618945!6m8!1m7!1sCAoSLEFGMVFpcE1JR0xTYXIxMnlhRUU5dmhSbThOMmRIejJrRXhMWG0zTzdlVW5J!2m2!1d-35.76229748808326!2d-71.41611645995395!3f243.30473999789757!4f-2.409956286158689!5f0.7820865974627469"
              width="100%"
              height="1200"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          )}
        </section>

        {/* Existing Content Section */}
        <section className="info-content">
          <h5>{t('UnforgettablePlaces')}</h5>
          <h1>{t('Remember')}</h1>
          <br></br>
          <p>{t('HotSpringsRemember')}</p>
          <br></br>
          <div className="button-group">
            <button className="btn-blue" onClick={() => window.open("https://www.google.com/maps/embed?pb=!4v1732110618945!6m8!1m7!1sCAoSLEFGMVFpcE1JR0xTYXIxMnlhRUU5dmhSbThOMmRIejJrRXhMWG0zTzdlVW5J!2m2!1d-35.76229748808326!2d-71.41611645995395!3f243.30473999789757!4f-2.409956286158689!5f0.7820865974627469", "_blank")}>
              {t('Discover')}
            </button>
            <button className="btn-blue2" onClick={toggleMapTermas}>
              <i className="bi bi-geo-alt"></i>
            </button>
          </div>
        </section>
      </div>

      {/* Hero Section 2 */}
      <div className="hero555">
        <div className="hero-content555">
          <h5>{t('Routes')}</h5>
          <h1>{t('Reservoir')}</h1>
          <h4>{t('EmbalseInfo')}</h4>
        </div>
      </div>

      {/* Embalse Machicura */}
      <div className="info-section1">
        <section className="map-section">
          {latEmbalse && lngEmbalse && isFirstMapEmbalse ? (
            <LeafletMap latitud={latEmbalse} longitud={lngEmbalse} mapId={"embalseMap"} googleMapUrl={googleMapUrl2}/>
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1732110696921!6m8!1m7!1sCAoSLEFGMVFpcE9jM21vSlY0dlA4UDl5LVB3YjRfbElqZjhIOEhJMHpCSkZpZFJz!2m2!1d-35.71810350482917!2d-71.39611242119145!3f69.1276459279471!4f-17.004003712035995!5f0.7820865974627469"
              width="100%"
              height="1200"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          )}
        </section>

        {/* Existing Content Section */}
        <section className="info-content">
          <h5>{t('UnforgettablePlaces')}</h5>
          <h1>{t('Remember')}</h1>
          <br></br>
          <p>{t('EmbalseRemember')}</p>
          <div className="button-group">
            <button className="btn-blue" onClick={() => window.open("https://www.google.com/maps/embed?pb=!4v1732110696921!6m8!1m7!1sCAoSLEFGMVFpcE9jM21vSlY0dlA4UDl5LVB3YjRfbElqZjhIOEhJMHpCSkZpZFJz!2m2!1d-35.71810350482917!2d-71.39611242119145!3f69.1276459279471!4f-17.004003712035995!5f0.7820865974627469", "_blank")}>
              {t('Discover')}
            </button>
            <button className="btn-blue2" onClick={toggleMapEmbalse}>
              <i className="bi bi-geo-alt"></i>
            </button>
          </div>
        </section>
      </div>

      <Carousel/>
      <SocialSection/>
      <Footer/>
      
    </div>
  );
};

export default Termas;
