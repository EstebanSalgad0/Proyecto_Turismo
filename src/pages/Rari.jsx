import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Rari.css?v=1.1';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import '../components/i18n';
import { useTranslation } from 'react-i18next';
import Carousel from '../components/carousel';
import LeafletMap from '../components/LeafletMap';

const Rari = () => { 
  const [ lat, setLat ] = useState(null);
  const [ lng, setLng ] = useState(null);
  const [ isFirstMap, setIsFirstMap ] = useState(true);
  const { t, i18n } = useTranslation();

  const googleMapUrl =
    "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d138584.6138673503!2d-71.53367680026096!3d-35.72347957336525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m5!1s0x966588e8188d3915%3A0x3653c2537dca7640!2zUmFyaSwgQ29sYsO6bg!3m2!1d-35.766779899999996!2d-71.4143879!5e0!3m2!1ses-419!2scl!4v1732040207084!5m2!1ses-419!2scl";

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }

    // Fetch data from the django API
    fetch('https://7c0b1511aa8dbca7afe7745d6614ff72.loophole.site/api/lugares/buscar/?nombre=rari') //Cambiar el nombre por el lugar turistico requerido
      .then(response => response.json())
      .then(data => {
        setLat(data.latitud);
        setLng(data.longitud);
        console.log(data.latitud);
        console.log(data.longitud);
      })
      .catch(error => console.error('Error fetching location data:', error));
  }, [i18n]);

  const toggleMap = () => {
    setIsFirstMap(!isFirstMap);
  }

  return (
    <div className="index-container">
      <Header/>

      <div className="hero15">
        <div className="hero-content15">
          <h5>{t('WhereToGo')}</h5>
          <h1>Rari</h1>
          <h4>{t('RariInfo')}</h4>
        </div>
      </div>

      <div className="info-section1">
        <section className="map-section">
          {lat && lng && isFirstMap ? (
            <LeafletMap latitud={lat} longitud={lng} mapId={"rariMap"} googleMapUrl={googleMapUrl}/>
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1732043192964!6m8!1m7!1sCAoSLEFGMVFpcE91NzZEUU1RZUxrcnhTWFNIRGRadzlFNDdHX3FkcmFyUXYyaWQw!2m2!1d-35.76248929902175!2d-71.41764832208362!3f35.73071622634859!4f2.4484483329164277!5f0.7820865974627469"
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
          <p>{t('RariRemember')}</p>
          <br></br>
          <div className="button-group">
            <button className="btn-blue" onClick={() => window.open("https://www.google.com/maps/embed?pb=!4v1732043192964!6m8!1m7!1sCAoSLEFGMVFpcE91NzZEUU1RZUxrcnhTWFNIRGRadzlFNDdHX3FkcmFyUXYyaWQw!2m2!1d-35.76248929902175!2d-71.41764832208362!3f35.73071622634859!4f2.4484483329164277!5f0.7820865974627469", "_blank")}>
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

export default Rari;
