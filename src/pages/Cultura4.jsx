import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Cultura4.css?v=1.5'; // Estilos específicos para el componente
import Header from '../components/Header';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';
import useCarousel from '../components/useCarousel'; // Hook personalizado para el carrusel
import LeafletMap from '../components/LeafletMap';

const Cultura4 = () => {
  // Mapa Termas de Panimavida
  const [latTermasP, setLatTermasP] = useState(null);
  const [lngTermasP, setLngTermasP] = useState(null);
  const [isFirstMapTermasP, setIsFirstMapTermasP] = useState(true);
  
  // Mapa Poza de la Mona
  const [latPoza, setLatPoza] = useState(null);
  const [lngPoza, setLngPoza] = useState(null);
  const [isFirstMapPoza, setIsFirstMapPoza] = useState(true);
  
  // Mapa Rari
  const [latRari, setLatRari] = useState(null);
  const [lngRari, setLngRari] = useState(null);
  const [isFirstMapRari, setIsFirstMapRari] = useState(true);

  // Mapa Termas de Quinamavida
  const [latTermasQ, setLatTermasQ] = useState(null);
  const [lngTermasQ, setLngTermasQ] = useState(null);
  const [isFirstMapTermasQ, setIsFirstMapTermasQ] = useState(true);

  const { t, i18n } = useTranslation();
  const { currentSlide, nextSlide, prevSlide } = useCarousel(4); // Configurado para 4 slides
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
    
    // Fetch data from the Django API (Termas de Panimavida)
    fetch('http://localhost:8000/api/lugares/buscar/?nombre=termas_panimavida') // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatTermasP(data.latitud);
      setLngTermasP(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));
    
    // Fetch data from the Django API (Poza de la Mona)
    fetch('http://localhost:8000/api/lugares/buscar/?nombre=poza_mona') // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatPoza(data.latitud);
      setLngPoza(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));
    
    // Fetch data from the Django API (Rari)
    fetch('http://localhost:8000/api/lugares/buscar/?nombre=rari') // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatRari(data.latitud);
      setLngRari(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));
    
    // Fetch data from the Django API (Termas de Quinamavida)
    fetch('http://localhost:8000/api/lugares/buscar/?nombre=termas_quinamavida') // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatTermasQ(data.latitud);
      setLngTermasQ(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));
  }, [i18n]); // Añadir el estado del idioma como dependencia

  // Toggle Termas Panimavida
  const toggleMapTermasP = () => {
    setIsFirstMapTermasP(!isFirstMapTermasP);
  };

  // Toggle Poza de la Mona
  const toggleMapPoza = () => {
    setIsFirstMapPoza(!isFirstMapPoza);
  };
  
  // Toggle Rari
  const toggleMapRari = () => {
    setIsFirstMapRari(!isFirstMapRari);
  };
  
  // Toggle Termas de Quinamavida
  const toggleMapTermasQ = () => {
    setIsFirstMapTermasQ(!isFirstMapTermasQ);
  };

  return (
    <div className="index-container">
      {/* Navbar */}
      <Header/>

      {/* Hero Section 1 */}
      <div className="hero40">
        <div className="hero-content40">
          <h5>{t('Culture')}</h5>
          <h1>{t('Springs')}</h1>
          <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</h4>
        </div>
      </div>

      {/* Termas Panimavida */}
      <div className="info-section1">
        <section className="map-section">
          {latTermasP && lngTermasP && isFirstMapTermasP ? (
            <LeafletMap latitud={latTermasP} longitud={lngTermasP} mapId={"termasPMap"} />
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
            <button className="btn-blue2" onClick={toggleMapTermasP}>
              <i className="bi bi-geo-alt"></i>
            </button>
          </div>
        </section>
      </div>

      {/* Hero Section 2 */}
      <div className="hero41">
        <div className="hero-content41">
          <h5>{t('Culture')}</h5>
          <h1>La Poza de La Mona</h1>
          <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</h4>
        </div>
      </div>

      {/* Poza de la Mona */}
      <div className="info-section1">
        <section className="map-section">
          {latPoza && lngPoza && isFirstMapPoza ? (
            <LeafletMap latitud={latPoza} longitud={lngPoza} mapId={"pozaMap"} />
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
            <button className="btn-blue2" onClick={toggleMapPoza}>
              <i className="bi bi-geo-alt"></i>
            </button>
          </div>
        </section>
      </div>

      {/* Hero Section 3 */}
      <div className="hero42">
        <div className="hero-content42">
          <h5>{t('Culture')}</h5>
          <h1>Rari &quot;Ciudad Artesanal del Mundo&quot;</h1>
          <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</h4>
        </div>
      </div>

      {/* Rari */}
      <div className="info-section1">
        <section className="map-section">
          {latRari && lngRari && isFirstMapRari ? (
            <LeafletMap latitud={latRari} longitud={lngRari} mapId={"rariMap"} />
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
            <button className="btn-blue2" onClick={toggleMapRari}>
              <i className="bi bi-geo-alt"></i>
            </button>
          </div>
        </section>
      </div>

      {/* Hero Section 4 */}
      <div className="hero43">
        <div className="hero-content43">
          <h5>{t('Culture')}</h5>
          <h1>Termas de Quinamávida</h1>
          <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</h4>
        </div>
      </div>

      {/* Termas de Quinamávida */}
      <div className="info-section1">
        <section className="map-section">
          {latTermasQ && lngTermasQ && isFirstMapTermasQ ? (
            <LeafletMap latitud={latTermasQ} longitud={lngTermasQ} mapId={"meladoMap"} />
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
            <button className="btn-blue2" onClick={toggleMapTermasQ}>
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