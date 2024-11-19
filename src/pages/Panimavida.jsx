import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Panimavida.css'; // Estilos específicos para el componente
import Header from '../components/Header';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';
import useCarousel from '../components/useCarousel'; // Importa el hook personalizado
import LeafletMap from '../components/LeafletMap';

const Panimavida = () => {
  const [ lat, setLat ] = useState(null);
  const [ lng, setLng ] = useState(null);
  const [ isFirstMap, setIsFirstMap ] = useState(true);
  const { t, i18n } = useTranslation();
  const { currentSlide, nextSlide, prevSlide } = useCarousel(4); // Usa el hook personalizado

  const googleMapUrl =
    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d138579.7139059291!2d-71.46670773351394!3d-35.726296263639156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-35.7589342!2d-71.4178676!5e0!3m2!1ses-419!2scl!4v1732039985017!5m2!1ses-419!2scl";

  const slideNames = [
    'VizcachazViewpoint',
    'NationalPark',
    'CavesBellotos',
    'Reservoir',
    'LakeColbun',
    'HillViewpoint',
    'ToroWaterfall',
    'AnotherLocation'
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }

    fetch('http://localhost:8000/api/lugares/buscar/?nombre=panimavida') // Cambiar nombre por lugar turistico necesitado
      .then( response => response.json())
      .then( data => {
        setLat( data.latitud );
        setLng( data.longitud );
        console.log("latitud = " + data.latitud);
        console.log("longitud = " + data.longitud);
      })
      .catch(error => console.error('Error fetching location data: ', error));
  }, [i18n]);

  const toggleMap = () =>{
    setIsFirstMap(!isFirstMap);
  }
  return (
    <div className="index-container">
      <Header />

      <div className="hero104">
        <div className="hero-content104">
          <h5>{t('WhereToGo')}</h5>
          <h1>Panimávida</h1>
          <h4>{t('PanimavidaInfo')}</h4>
        </div>
      </div>

      <div className="info-section1">
        <section className="map-section">
          {lat && lng && isFirstMap ? (
            <LeafletMap latitud={lat} longitud={lng} mapId={"panimavidaMap"} googleMapUrl={googleMapUrl}/>
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1732043058780!6m8!1m7!1sCAoSLEFGMVFpcFBORHBHemt3S3Atd3NEX2t0aHhwYmM1RVpHQmtlX095amJjWGti!2m2!1d-35.75559967683176!2d-71.41737046928405!3f338.75366241190306!4f-4.329891270804524!5f0.7820865974627469"
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
          <div className="button-group">
            <button className="btn-blue" onClick={() => window.open("https://www.google.com/maps/embed?pb=!4v1732043058780!6m8!1m7!1sCAoSLEFGMVFpcFBORHBHemt3S3Atd3NEX2t0aHhwYmM1RVpHQmtlX095amJjWGti!2m2!1d-35.75559967683176!2d-71.41737046928405!3f338.75366241190306!4f-4.329891270804524!5f0.7820865974627469", "_blank")}>
              {t('Discover')}
            </button>
            <button className="btn-blue2" onClick={toggleMap}>
              <i className="bi bi-geo-alt"></i>
            </button>
          </div>
        </section>
      </div>
      <section className="carousel-section1">
        <div className="carousel-header1">
          <h5>{t('Admire')}</h5>
          <div className="carousel-subheader1">
            <h2>{t('NaturalBeauty')}</h2>
            <a href="#">{t('ViewMore')}<span>&#8594;</span></a>
          </div>
        </div>

        <div className="carousel-container1">
          {slideNames.map((slideName, index) => (
            <div
              key={index}
              className="carousel-card1"
              style={{
                transform: `translateX(-${currentSlide * (window.innerWidth <= 768 ? 113 : 130)}%)`
              }}
            >
              <div className="carousel-image1"></div>
              <p>{t(slideName)}</p>
            </div>
          ))}
        </div>

        <button className="carousel-control1 prev" onClick={prevSlide}>&#10094;</button>
        <button className="carousel-control1 next" onClick={nextSlide}>&#10095;</button>
      </section>
    </div>
  );
};

export default Panimavida;
