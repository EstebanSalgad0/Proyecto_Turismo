import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Balnearios.css'; // Estilos específicos para el componente
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';
import LeafletMap from '../components/LeafletMap'; // Componente de mapa con Leaflet
import Carousel from '../components/carousel';

const Balnearios = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [isFirstMap, setIsFirstMap] = useState(true);
  const { t, i18n } = useTranslation();

  const googleMapUrl =
    "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d102706.06242558296!2d-71.47153871413005!3d-35.71551759624855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m5!1s0x96658f79534ee9a7%3A0x97e0e00bb5ae35d5!2sBalneario%20Machicura%2C%20Colb%C3%BAn!3m2!1d-35.719001399999996!2d-71.40558639999999!5e0!3m2!1ses-419!2scl!4v1732040977576!5m2!1ses-419!2scl";

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language'); // Obtener el idioma guardado
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage); // Cambiar el idioma si es necesario
    }

    // Fetch data from the Django API
    fetch('https://190.100.150.2:8000/api/lugares/buscar/?nombre=lago_colbun') // Cambia el nombre por el lugar turístico que necesites
      .then(response => response.json())
      .then(data => {
        setLat(data.latitud);
        setLng(data.longitud);
      })
      .catch(error => console.error('Error fetching location data:', error));
  }, [i18n]); // Añadir el estado del idioma como dependencia

  const toggleMap = () => {
    setIsFirstMap(!isFirstMap);
  };

  return (
    <div className="index-container">
      {/* Navbar */}
      <Header/>

      {/* Hero Section */}
      <div className="hero108">
        <div className="hero-content108">
          <h5>{t('WhereToGo')}</h5>
          <h1>Lago Colbún</h1>
          <h4>{t('LagoColbunInfo')}</h4>
        </div>
      </div>

      <div className="info-section1">
        <section className="map-section">
          {lat && lng && isFirstMap ? (
            <LeafletMap latitud={lat} longitud={lng} mapId={"balnearioMap"} googleMapUrl={googleMapUrl}/>
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1732043529164!6m8!1m7!1sCAoSLEFGMVFpcE5oVTk1NFBqLWJ1R2tRZWhVYVJiSmlkWVpsZ3oxZFFyZlBZWXAt!2m2!1d-35.71966647033331!2d-71.40597379063568!3f128.18017555666262!4f0.4051283386041433!5f0.4000000000000002"
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
          <br></br><br></br><br></br><br></br><br></br>
          <p>{t('LagoColbunRemember')}</p>
          <br></br><br></br><br></br><br></br><br></br>
          <div className="button-group">
            <button className="btn-blue" onClick={() => window.open("https://www.google.com/maps/embed?pb=!4v1732043529164!6m8!1m7!1sCAoSLEFGMVFpcE5oVTk1NFBqLWJ1R2tRZWhVYVJiSmlkWVpsZ3oxZFFyZlBZWXAt!2m2!1d-35.71966647033331!2d-71.40597379063568!3f128.18017555666262!4f0.4051283386041433!5f0.4000000000000002", "_blank")}>
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

export default Balnearios;
