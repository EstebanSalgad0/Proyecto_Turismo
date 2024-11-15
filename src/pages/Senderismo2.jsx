import { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Senderismo.css?v=2.0';// Estilos específicos para el componente
import Header from '../components/Header';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';
import LeafletMap from '../components/LeafletMap'; // Importa el componente de mapa

const Senderismo = () => {
  // Mapa Volcn San Pedro y San Pablo
  const [latVolcan, setLatVolcan] = useState(null);
  const [lngVolcan, setLngVolcan] = useState(null);
  const [isFirstMapVolcan, setIsFirstMapVolcan] = useState(true);
  
  // Mapa Mirador las Vizcachas
  const [latMirador, setLatMirador] = useState(null);
  const [lngMirador, setLngMirador] = useState(null);
  const [isFirstMapMirador, setIsFirstMapMirador] = useState(true);

  const [currentSlide, setCurrentSlide] = useState(0); // Estado para el slide actual
  const { t, i18n } = useTranslation(); // Hook para usar traducciones


  // Guardar el idioma seleccionado en localStorage y cargarlo al inicio
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }
    
    // Fetch data from the Django API (Volcán San Pedro y San Pablo)
    fetch('http://localhost:8000/api/lugares/buscar/?nombre=volcan_san_pedro_pablo') // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatVolcan(data.latitud);
      setLngVolcan(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));
    
    // Fetch data from the Django API (Mirador las Vizcachas)
    fetch('http://localhost:8000/api/lugares/buscar/?nombre=mirador_vizcachas') // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatMirador(data.latitud);
      setLngMirador(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));
  }, [i18n]);

  // Array de nombres de los slides para el carrusel
  const slideNames = [
    'VizcachazViewpoint',
    'NationalPark',
    'CavesBellotos',
    'Reservoir',
    'Test1',
    'Test2',
    'Test3'
  ];

  // Función para manejar las flechas del carrusel
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slideNames.length);
  }, [slideNames.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideNames.length) % slideNames.length);
  };

  // Configuración para deslizar automáticamente cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  // toggle mapa Volcán San Pedro y San Pablo
  const toggleMapVolcan = () => {
    setIsFirstMapVolcan(!isFirstMapVolcan);
  };
  
  // toggle mapa Mirador las Vizcachas
  const toggleMapMirador = () => {
    setIsFirstMapMirador(!isFirstMapMirador);
  };
  return (
    <div className="index-container">
      {/* Navbar */}
      <Header />

      {/* Hero Section 1 */}
      <div className="hero16">
        <div className="hero-content16">
          <h5>{t('Hike')}</h5>
          <h1 id='volcan'>{t('Volcano')}</h1>
          <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos ab ipsa magni asperiores magnam adipisci earum nemo nisi iure voluptate culpa nihil dolores, possimus animi sapiente natus doloribus! Iste, aliquid!</h4>
        </div>
      </div>

      {/* Volcán San Pedro y San Pablo */}
      <div className="info-section1">
        <section className="map-section">
          {latVolcan && lngVolcan && isFirstMapVolcan ? (
            <LeafletMap latitud={latVolcan} longitud={lngVolcan} mapId={"volcanMap"} />
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
            <button className="btn-blue2" onClick={toggleMapVolcan}>
              <i className="bi bi-geo-alt"></i>
            </button>
          </div>
        </section>
      </div>

      {/* Hero Section 2 */}
      <div className="hero16">
        <div className="hero-content16">
          <h5>{t('Hike')}</h5>
          <h1 id='mirador'>{t('VizcachazViewpoint')}</h1>
          <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos ab ipsa magni asperiores magnam adipisci earum nemo nisi iure voluptate culpa nihil dolores, possimus animi sapiente natus doloribus! Iste, aliquid!</h4>
        </div>
      </div>

      {/* Mirador las Vizcachas */}
      <div className="info-section1">
        <section className="map-section">
          {latMirador && lngMirador && isFirstMapMirador ? (
            <LeafletMap latitud={latMirador} longitud={lngMirador} mapId={"miradorMap"} />
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
            <button className="btn-blue2" onClick={toggleMapMirador}>
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
                transform: `translateX(-${currentSlide * (window.innerWidth <= 768 ? 113 : 40)}%)`
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

export default Senderismo;