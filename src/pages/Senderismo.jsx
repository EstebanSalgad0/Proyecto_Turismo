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

  const googleMapUrl =
    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d413971.11391985946!2d-71.46280600587505!3d-35.84534178897498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e0!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-35.913409!2d-71.0026809!5e0!3m2!1ses-419!2scl!4v1732052240789!5m2!1ses-419!2scl";
  
  // Mapa Mirador las Vizcachas
  const [latMirador, setLatMirador] = useState(null);
  const [lngMirador, setLngMirador] = useState(null);
  const [isFirstMapMirador, setIsFirstMapMirador] = useState(true);

  const googleMapUrl2 =
    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d414489.83046261565!2d-71.70909133865408!3d-35.745844425838605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-35.810394699999996!2d-71.3405238!5e0!3m2!1ses-419!2scl!4v1732052282568!5m2!1ses-419!2scl";

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
            <LeafletMap latitud={latVolcan} longitud={lngVolcan} mapId={"volcanMap"} googleMapUrl={googleMapUrl}/>
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1732110297817!6m8!1m7!1sCAoSLEFGMVFpcFA4Zk80N19wY3psbTY0MGgyNjVpNXlCd1pJR01naDJ0akxmQTBJ!2m2!1d-36.05978151025838!2d-70.81083712126821!3f168.911036017422!4f11.091912792122699!5f0.7820865974627469"
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
            <button className="btn-blue" onClick={() => window.open("https://www.google.com/maps/embed?pb=!4v1732110297817!6m8!1m7!1sCAoSLEFGMVFpcFA4Zk80N19wY3psbTY0MGgyNjVpNXlCd1pJR01naDJ0akxmQTBJ!2m2!1d-36.05978151025838!2d-70.81083712126821!3f168.911036017422!4f11.091912792122699!5f0.7820865974627469", "_blank")}>
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
            <LeafletMap latitud={latMirador} longitud={lngMirador} mapId={"miradorMap"} googleMapUrl={googleMapUrl2}/>
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1732110383451!6m8!1m7!1sCAoSLEFGMVFpcFAzYnk2WUktQU16SjdxMUpKZ2ZuelBESHJpQXdmUkh1Y1FldUds!2m2!1d-35.65339698099861!2d-71.2527705018546!3f257.3353789313492!4f0.9891328586699615!5f0.7820865974627469"
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
            <button className="btn-blue" onClick={() => window.open("https://www.google.com/maps/embed?pb=!4v1732110383451!6m8!1m7!1sCAoSLEFGMVFpcFAzYnk2WUktQU16SjdxMUpKZ2ZuelBESHJpQXdmUkh1Y1FldUds!2m2!1d-35.65339698099861!2d-71.2527705018546!3f257.3353789313492!4f0.9891328586699615!5f0.7820865974627469", "_blank")}>
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