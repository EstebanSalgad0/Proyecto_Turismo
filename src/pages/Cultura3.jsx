import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Cultura3.css?v=1.4'; // Estilos específicos para el componente
import Header from '../components/Header';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';
import useCarousel from '../components/useCarousel'; // Hook personalizado para el carrusel
import LeafletMap from '../components/LeafletMap'; // Componente de mapa

const Cultura4 = () => {
  const [latIglesia, setLatIglesia] = useState(null);
  const [lngIglesia, setLngIglesia] = useState(null);
  const [isFirstMapIglesia, setIsFirstMapIglesia] = useState(true);
  
  const [latTacitas, setLatTacitas] = useState(null);
  const [lngTacitas, setLngTacitas] = useState(null);
  const [isFirstMapTacitas, setIsFirstMapTacitas] = useState(true);
  
  const [latEmbotelladora, setLatEmbotelladora] = useState(null);
  const [lngEmbotelladora, setLngEmbotelladora] = useState(null);
  const [isFirstMapEmbotelladora, setIsFirstMapEmbotelladora] = useState(true);
  
  const [latEstacion, setLatEstacion] = useState(null);
  const [lngEstacion, setLngEstacion] = useState(null);
  const [isFirstMapEstacion, setIsFirstMapEstacion] = useState(true);

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
    
    // Fetch data from the Django API (Iglesia de Panimavida)
    fetch('http://localhost:8000/api/lugares/buscar/?nombre=iglesia_panimavida') // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatIglesia(data.latitud);
      setLngIglesia(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));
    
    // Fetch data from the Django API (Las Tacitas)
    fetch('http://localhost:8000/api/lugares/buscar/?nombre=las_tacitas') // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatTacitas(data.latitud);
      setLngTacitas(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));
    
    // Fetch data from the Django API (Embotelladora)
    fetch('http://localhost:8000/api/lugares/buscar/?nombre=embotelladora') // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatEmbotelladora(data.latitud);
      setLngEmbotelladora(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));
    
    // Fetch data from the Django API (Estacion del Tren)
    fetch('http://localhost:8000/api/lugares/buscar/?nombre=estacion_tren') // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatEstacion(data.latitud);
      setLngEstacion(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));
  }, [i18n]); // Añadir el estado del idioma como dependencia

  
  const toggleMapIglesia = () => {
    setIsFirstMapIglesia(!isFirstMapIglesia);
  };
  
  const toggleMapTacitas = () => {
    setIsFirstMapTacitas(!isFirstMapTacitas);
  };
  
  const toggleMapEmbotelladora = () => {
    setIsFirstMapEmbotelladora(!isFirstMapEmbotelladora);
  };
  
  const toggleMapEstacion = () => {
    setIsFirstMapEstacion(!isFirstMapEstacion);
  };

  return (
    <div className="index-container">
      {/* Navbar */}
      <Header/>

      {/* Hero Section 1 */}
      <div className="hero30">
        <div className="hero-content30">
          <h5>{t('Culture')}</h5>
          <h1>{t('Church')}</h1>
          <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</h4>
        </div>
      </div>

      {/* Iglesia Panimavida */}
      <div className="info-section1">
        <section className="map-section">
          {latIglesia && lngIglesia && isFirstMapIglesia ? (
            <LeafletMap latitud={latIglesia} longitud={lngIglesia} mapId={"iglesiaMap"} />
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
            <button className="btn-blue2" onClick={toggleMapIglesia}>
              <i className="bi bi-geo-alt"></i>
            </button>
          </div>
        </section>
      </div>

      {/* Hero Section 2 */}
      <div className="hero31">
        <div className="hero-content31">
          <h5>{t('Culture')}</h5>
          <h1>Las Tacitas</h1>
          <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</h4>
        </div>
      </div>

      {/* Las Tacitas */}
      <div className="info-section1">
        <section className="map-section">
          {latTacitas && lngTacitas && isFirstMapTacitas ? (
            <LeafletMap latitud={latTacitas} longitud={lngTacitas} mapId={"tacitasMap"} />
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
            <button className="btn-blue2" onClick={toggleMapTacitas}>
              <i className="bi bi-geo-alt"></i>
            </button>
          </div>
        </section>
      </div>

      {/* Hero Section 3 */}
      <div className="hero32">
        <div className="hero-content32">
          <h5>{t('Culture')}</h5>
          <h1>{t('Bottling')}</h1>
          <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</h4>
        </div>
      </div>

      {/* Embotelladora */}
      <div className="info-section1">
        <section className="map-section">
          {latEmbotelladora && lngEmbotelladora && isFirstMapEmbotelladora ? (
            <LeafletMap latitud={latEmbotelladora} longitud={lngEmbotelladora} mapId={"embotelladoraMap"} />
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
            <button className="btn-blue2" onClick={toggleMapEmbotelladora}>
              <i className="bi bi-geo-alt"></i>
            </button>
          </div>
        </section>
      </div>

      {/* Hero Section 4 */}
      <div className="hero33">
        <div className="hero-content33">
          <h5>{t('Culture')}</h5>
          <h1>{t('Train1')}</h1>
          <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</h4>
        </div>
      </div>

      {/* Estacion del tren */}
      <div className="info-section1">
        <section className="map-section">
          {latEstacion && lngEstacion && isFirstMapEstacion ? (
            <LeafletMap latitud={latEstacion} longitud={lngEstacion} mapId={"estacionMap"} />
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
            <button className="btn-blue2" onClick={toggleMapEstacion}>
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

export default Cultura4;