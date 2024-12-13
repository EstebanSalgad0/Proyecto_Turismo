import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Losbellotos.css?v=1.1'; // Estilos específicos para el componente
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';
import Carousel from '../components/carousel';
import LeafletMap from '../components/LeafletMap'; // Componente para mostrar el mapa

const Losbellotos = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [isFirstMap, setIsFirstMap] = useState(true);

  const { t, i18n } = useTranslation();

  const googleMapUrl =
    "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d553919.8936124383!2d-71.3651288217441!3d-35.78358924692016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m5!1s0x966f81514b08c1e3%3A0xaba4f8fd4989bd09!2sLos%20Bellotos%2C%20Colb%C3%BAn!3m2!1d-35.857926!2d-71.1045055!5e0!3m2!1ses-419!2scl!4v1732040869478!5m2!1ses-419!2scl";

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }
    // Fetch data from the Django API
    fetch('https://9616ee88920d1f74470820c9ce8b36a3.loophole.site/api/lugares/buscar/?nombre=los_bellotos') // Cambia el nombre por el lugar turístico que necesites
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
      {/* Navbar */}
      <Header />

      {/* Hero Section */}
      <div className="hero7">
        <div className="hero-content7">
          <h5>{t('WhereToGo')}</h5>
          <h1>Los Bellotos</h1>
          <h4>{t('BellotosInfo')}</h4>
        </div>
      </div>

      <div className="info-section1">
        <section className="map-section">
          {lat && lng && isFirstMap ? (
            <LeafletMap latitud={lat} longitud={lng} mapId={"bellotosMap"} googleMapUrl={googleMapUrl}/>
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1732043442764!6m8!1m7!1sCAoSLEFGMVFpcE8zRy1Ub3I3d1JTcDlnQ2l6ZVBFNFEyX21ickZZZm5vQzZjdTQy!2m2!1d-35.86444467397325!2d-71.09083558371711!3f56.09048807938566!4f20.45590779080709!5f0.7820865974627469"
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
          <p>{t('BellotosRemember')}</p>
          <br></br>
          <div className="button-group">
            <button className="btn-blue" onClick={() => window.open("https://www.google.com/maps/embed?pb=!4v1732043442764!6m8!1m7!1sCAoSLEFGMVFpcE8zRy1Ub3I3d1JTcDlnQ2l6ZVBFNFEyX21ickZZZm5vQzZjdTQy!2m2!1d-35.86444467397325!2d-71.09083558371711!3f56.09048807938566!4f20.45590779080709!5f0.7820865974627469", "_blank")}>
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

export default Losbellotos;
