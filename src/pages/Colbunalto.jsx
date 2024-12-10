import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Colbunalto.css'; // Estilos específicos para el componente
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';
import LeafletMap from '../components/LeafletMap'; // Componente de mapa
import Carousel from '../components/carousel';

const Colbunalto = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [isFirstMap, setIsFirstMap] = useState(true);

  const { t, i18n } = useTranslation();

  const googleMapUrl =
    "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d554767.6211775456!2d-71.6912542124028!3d-35.66175589940838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m5!1s0x966581b5fd9bce4f%3A0x8e04ff3ffb883b8c!2zQ29sYsO6biBBbHRvLCBDb2xiw7pu!3m2!1d-35.75!2d-71.216667!5e0!3m2!1ses-419!2scl!4v1732037184335!5m2!1ses-419!2scl";


  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }

    // Fetch data from the Django API
    fetch('https://59d8706a9084d7426b317e87f91aa310.loophole.site/api/lugares/buscar/?nombre=colbun_alto') // Cambia el nombre por el lugar turístico que necesites
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

      <div className="hero22">
        <div className="hero-content22">
          <h5>{t('WhereToGo')}</h5>
          <h1>Colbun Alto</h1>
          <h4>{t('ColbunAltoInfo')}</h4>
        </div>
      </div>

      <div className="info-section1">
        <section className="map-section">
          {lat && lng && isFirstMap ? (
            <LeafletMap latitud={lat} longitud={lng} mapId="colbunAltoMap" googleMapUrl={googleMapUrl}/>
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1732042470056!6m8!1m7!1sCAoSLEFGMVFpcE93WGlUUlZSdkYwR2xoenFpdUFMbDZ4TUdFemkwRmhXd0dHUkVT!2m2!1d-35.72389261564005!2d-71.2123527910019!3f349.7109854124092!4f0.6778411991338089!5f0.7820865974627469"
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
          <p>{t('ColbunAltoRemember')}</p>
          <br></br>
          <div className="button-group">
            <button className="btn-blue" onClick={() => window.open("https://www.google.com/maps/embed?pb=!4v1732042470056!6m8!1m7!1sCAoSLEFGMVFpcE93WGlUUlZSdkYwR2xoenFpdUFMbDZ4TUdFemkwRmhXd0dHUkVT!2m2!1d-35.72389261564005!2d-71.2123527910019!3f349.7109854124092!4f0.6778411991338089!5f0.7820865974627469", "_blank")}>
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

export default Colbunalto;
