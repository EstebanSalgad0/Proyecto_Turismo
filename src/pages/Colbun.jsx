import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Colbun.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import '../components/i18n';
import { useTranslation } from 'react-i18next';
import LeafletMap from '../components/LeafletMap'; // Importa el componente de LeafletMap
import Carousel from '../components/carousel';

const Colbun = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [isFirstMap, setIsFirstMap] = useState(true);
  
  const { t, i18n } = useTranslation();

  const googleMapUrl =
    "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d207723.66152519247!2d-71.70529132972516!3d-35.56154988942582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x9665c6a2ac07d07d%3A0x265657feafdac8b8!2sTalca%2C%20Maule%2C%20Chile!3m2!1d-35.4231882!2d-71.6496958!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!5e0!3m2!1ses-419!2scl!4v1732036047424!5m2!1ses-419!2scl";

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }

    // Fetch data from the Django API
    fetch('https://59d8706a9084d7426b317e87f91aa310.loophole.site/api/lugares/buscar/?nombre=colbun') // Cambia el nombre por el lugar turístico que necesites
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

      <div className="hero21">
        <div className="hero-content21">
          <h5>{t('WhereToGo')}</h5>
          <h1>Colbún</h1>
          <h4>{t('ColbunInfo')}</h4>
        </div>
      </div>

      <div className="info-section1">
        <section className="map-section">
          {lat && lng && isFirstMap ? (
            <LeafletMap latitud={lat} longitud={lng} mapId={"colbunMap"} googleMapUrl={googleMapUrl}/>
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1732042310648!6m8!1m7!1sCAoSLEFGMVFpcE9kV1dxM3UtNXZFaV9MRGptanlNa2RpWFk0SXdiTHRPdUpST1Q3!2m2!1d-35.70207739286842!2d-71.40825538377578!3f200.07091212077665!4f2.224486747264166!5f0.7820865974627469"
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
          <p>{t('ColbunBeauty')}</p>
          <br></br>
          <div className="button-group">
            <button className="btn-blue" onClick={() => window.open("https://www.google.com/maps/embed?pb=!4v1732042310648!6m8!1m7!1sCAoSLEFGMVFpcE9kV1dxM3UtNXZFaV9MRGptanlNa2RpWFk0SXdiTHRPdUpST1Q3!2m2!1d-35.70207739286842!2d-71.40825538377578!3f200.07091212077665!4f2.224486747264166!5f0.7820865974627469", "_blank")}>
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

export default Colbun;
