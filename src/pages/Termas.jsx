import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Termas.css?v=1.6'; // Estilos específicos para el componente
import Header from '../components/Header';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';
import useCarousel from '../components/useCarousel'; // Hook personalizado para el carrusel
import LeafletMap from '../components/LeafletMap'; // Componente de mapa

const Termas = () => {
  // Mapa Termas
  const [latTermas, setLatTermas] = useState(null);
  const [lngTermas, setLngTermas] = useState(null);
  const [isFirstMapTermas, setIsFirstMapTermas] = useState(true);
  
  // Mapa Embalse Machicura
  const [latEmbalse, setLatEmbalse] = useState(null);
  const [lngEmbalse, setLngEmbalse] = useState(null);
  const [isFirstMapEmbalse, setIsFirstMapEmbalse] = useState(true);

  const { t, i18n } = useTranslation();
  const { currentSlide, nextSlide, prevSlide } = useCarousel(0); // Configurado para 7 slides
  const slideNames = [
    'VizcachazViewpoint',
    'NationalPark',
    'CavesBellotos',
    'Reservoir',
    'Test1',
    'Test2',
    'Test3'
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language'); // Obtener el idioma guardado
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage); // Cambiar el idioma si es necesario
    }
    
    // Fetch data from the Django API (Termas)
    fetch('http://localhost:8000/api/lugares/buscar/?nombre=termas_rutas') // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatTermas(data.latitud);
      setLngTermas(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));
    
    // Fetch data from the Django API (Emblase Machicura)
    fetch('http://localhost:8000/api/lugares/buscar/?nombre=emblase_machicura') // Cambia el nombre por el lugar turístico que necesites
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
          <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</h4>
        </div>
      </div>

      {/* Termas */}
      <div className="info-section1">
        <section className="map-section">
          {latTermas && lngTermas && isFirstMapTermas ? (
            <LeafletMap latitud={latTermas} longitud={lngTermas} mapId={"termasMap"} />
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1729508776865!6m8!1m7!1sCAoSLEFGMVFpcE52eG9fOUs1ZkRac2VzYnNNQ3hsYnBpOWFOdnJpcUFUU0VSazhv!2m2!1d-35.87360339666832!2d-71.11635919023739!3f166.054998459084!4f12.54037435121353!5f0.7820865974627469"
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
            <button className="btn-blue" onClick={() => window.open("https://maps.app.goo.gl/GZSD4dNAL8uKZx1N6", "_blank")}>
              {t('Discover')}
            </button>
            <button className="btn-blue2" onClick={toggleMapTermas}>
              <i className="bi bi-geo-alt"></i>
            </button>
          </div>
        </section>
      </div>

      {/* Hero Section 2 */}
      <div className="hero17">
        <div className="hero-content17">
          <h5>{t('Routes')}</h5>
          <h1>{t('Reservoir')}</h1>
          <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</h4>
        </div>
      </div>

      {/* Embalse Machicura */}
      <div className="info-section1">
        <section className="map-section">
          {latEmbalse && lngEmbalse && isFirstMapEmbalse ? (
            <LeafletMap latitud={latEmbalse} longitud={lngEmbalse} mapId={"embalseMap"} />
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1729508776865!6m8!1m7!1sCAoSLEFGMVFpcE52eG9fOUs1ZkRac2VzYnNNQ3hsYnBpOWFOdnJpcUFUU0VSazhv!2m2!1d-35.87360339666832!2d-71.11635919023739!3f166.054998459084!4f12.54037435121353!5f0.7820865974627469"
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
            <button className="btn-blue" onClick={() => window.open("https://maps.app.goo.gl/GZSD4dNAL8uKZx1N6", "_blank")}>
              {t('Discover')}
            </button>
            <button className="btn-blue2" onClick={toggleMapEmbalse}>
              <i className="bi bi-geo-alt"></i>
            </button>
          </div>
        </section>
      </div>

      {/* Carousel Section */}
      <section className="carousel-section1">
        <div className="carousel-header1">
          <h5>{t('Admire')}</h5>
          <div className="carousel-subheader1">
            <h2>{t('NaturalBeauty')}</h2>
            <a href="#">{t('ViewMore')}<span>&#8594;</span></a>
          </div>
        </div>

        {/* Carrusel de imágenes */}
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

        {/* Flechas de control */}
        <button className="carousel-control1 prev" onClick={prevSlide}>&#10094;</button>
        <button className="carousel-control1 next" onClick={nextSlide}>&#10095;</button>
      </section>
    </div>
  );
};

export default Termas;