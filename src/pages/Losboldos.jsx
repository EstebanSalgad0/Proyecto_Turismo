import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Losboldos.css'; // Estilos específicos para el componente
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';
import Carousel from '../components/carousel';
import LeafletMap from '../components/LeafletMap'; //Importa el componente de LeafletMap
import { API_BASE_URL } from "../config"; // Importar la URL base

const Losboldos = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [isFirstMap, setIsFirstMap] = useState(true);

  const { t, i18n } = useTranslation();

  const googleMapUrl =
    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d34658.21738779996!2d-71.43264459364279!3d-35.69573001831012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-35.7019923!2d-71.3888944!5e0!3m2!1ses-419!2scl!4v1732039710503!5m2!1ses-419!2scl";

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }

    // Fetch data from the Django API
    fetch(`${API_BASE_URL}/api/lugares/buscar/?nombre=los_boldos`) // Cambia el nombre por el lugar turístico que necesites
      .then(response => response.json())
      .then(data => {
        setLat(data.latitud);
        setLng(data.longitud);
      })
      .catch(error => console.error('Error fetching location data:', error));
  }, [i18n]);

  const toggleMap = () => {
    setIsFirstMap(!isFirstMap);
  };

  return (
    <div className="index-container">
      <Header />

      <div className="hero103">
        <div className="hero-content103">
          <h5>{t('WhereToGo')}</h5>
          <h1>Los Boldos</h1>
          <h4>{t('BoldosInfo')}</h4>
        </div>
      </div>

    <div className="info-section1">
            <section className="map-section">
              {lat && lng && isFirstMap ? (
                <LeafletMap latitud={lat} longitud={lng} mapId={"boldosMap"} googleMapUrl={googleMapUrl}/>
              ) : (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!4v1732042933321!6m8!1m7!1sCAoSLEFGMVFpcE1OSWxLSnNYNElLaTJPQmNxbkl3bEdJTTNGRVRUZC1ZbmdteFVD!2m2!1d-35.6993725570952!2d-71.38486855534453!3f166.60736220677663!4f6.49275544898525!5f0.7820865974627469"
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
              <p>{t('BoldosRemember')}</p>
              <br></br>
              <div className="button-group">
                <button className="btn-blue" onClick={() => window.open("https://www.google.com/maps/embed?pb=!4v1732042933321!6m8!1m7!1sCAoSLEFGMVFpcE1OSWxLSnNYNElLaTJPQmNxbkl3bEdJTTNGRVRUZC1ZbmdteFVD!2m2!1d-35.6993725570952!2d-71.38486855534453!3f166.60736220677663!4f6.49275544898525!5f0.7820865974627469", "_blank")}>
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

export default Losboldos;
