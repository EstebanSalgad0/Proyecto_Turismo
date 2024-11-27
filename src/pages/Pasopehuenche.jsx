import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Pasopehuenche.css?v=1.1'; // Estilos específicos para el componente
import LeafletMap from '../components/LeafletMap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';
import Carousel from '../components/carousel';

const Pasopehuenche = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [isFirstMap, setIsFirstMap] = useState(true);

  const { t, i18n } = useTranslation(); // Hook para usar traducciones

  const googleMapUrl =
    "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d1108478.6717723121!2d-71.32518061235452!3d-35.73772205635922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m5!1s0x96701f913862b461%3A0xf2ad86477ad16bdb!2sPaso%20Pehuenche%2C%20San%20Clemente!3m2!1d-35.9833333!2d-70.39999999999999!5e0!3m2!1ses-419!2scl!4v1732029936487!5m2!1ses-419!2scl";


  useEffect(() => {
    const savedLanguage = localStorage.getItem('language'); // Obtener el idioma guardado
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage); // Cambiar el idioma si es necesario
    }

    // Fetch data from the Django API
    fetch('http://localhost:8000/api/lugares/buscar/?nombre=paso_pehuenche') // Cambia el nombre por el lugar turístico que necesites
      .then(response => response.json())
      .then(data => {
        setLat(data.latitud);
        setLng(data.longitud);
      })
      .catch(error => console.error('Error fetching location data:', error));
  }, [i18n]); // Añadir el estado del idioma como dependencia


  
    // Función para alternar entre los mapas
    // To Apply
  const toggleMap = () => {
    setIsFirstMap(!isFirstMap);
  };


  return (
    <div className="index-container">
      {/* Navbar */}
      <Header/>
      {/* Hero Section */}
      <div className="hero12">
        <div className="hero-content12">
          <h5>{t('WhereToGo')}</h5>
          <h1>Paso Pehuenche</h1>
          <h4>{t('PehuencheInfo')}</h4>
        </div>
      </div>

      <div className="info-section1">
        <section className="map-section">
          {lat && lng && isFirstMap ? (
            <LeafletMap latitud={lat} longitud={lng} mapId={"pehuencheMap"} googleMapUrl={googleMapUrl}/>
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1732042052500!6m8!1m7!1sCAoSLEFGMVFpcFA2T05WMFdOakE5TEJqQzFfcWFIWEpQTElBUWE3MEJWMGUtZl9G!2m2!1d-35.98140279183212!2d-70.39538364127658!3f211.50117874263907!4f-7.133985422908111!5f0.7820865974627469"
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
          <p>{t('ColbunBeauty')}</p>
          <br></br>
          <div className="button-group">
            <button className="btn-blue" onClick={() => window.open("https://www.google.com/maps/embed?pb=!4v1732042052500!6m8!1m7!1sCAoSLEFGMVFpcFA2T05WMFdOakE5TEJqQzFfcWFIWEpQTElBUWE3MEJWMGUtZl9G!2m2!1d-35.98140279183212!2d-70.39538364127658!3f211.50117874263907!4f-7.133985422908111!5f0.7820865974627469", "_blank")}>
              {t('Discover')}
            </button>
            <button className="btn-blue2" onClick={toggleMap}>
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

export default Pasopehuenche;