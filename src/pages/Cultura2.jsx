import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Cultura2.css?v=1.5'; // Estilos específicos para el componente
import Header from '../components/Header';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';
import useCarousel from '../components/useCarousel'; // Hook personalizado para el carrusel
import LeafletMap from '../components/LeafletMap';

const Cultura4 = () => {
  // Mapa Petroglifos
  const [latPetro, setLatPetro] = useState(null);
  const [lngPetro, setLngPetro] = useState(null);
  const [isFirstMapPetro, setIsFirstMapPetro] = useState(true);

  const googleMapUrl =
    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d1658111.1269950196!2d-72.22615492767746!3d-35.7385553963293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e0!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-36.0169348!2d-70.5541559!5e0!3m2!1ses-419!2scl!4v1732049917856!5m2!1ses-419!2scl";

  // Mapa La Guardia
  const [latGuardia, setLatGuardia] = useState(null);
  const [lngGuardia, setLngGuardia] = useState(null);
  const [isFirstMapGuardia, setIsFirstMapGuardia] = useState(true);

  const googleMapUrl2 =
    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d120004.68519754826!2d-71.44335669065765!3d-35.68717631831008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-35.688274!2d-71.28830409999999!5e0!3m2!1ses-419!2scl!4v1732039606757!5m2!1ses-419!2scl";

  // Mapa Tren Chico
  const [latTren, setLatTren] = useState(null);
  const [lngTren, setLngTren] = useState(null);
  const [isFirstMapTren, setIsFirstMapTren] = useState(true);

  const googleMapUrl3 =
    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d3294762.618956662!2d-74.42648521608298!3d-36.250627455393094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-36.7911632!2d-71.7516368!5e0!3m2!1ses-419!2scl!4v1732050565016!5m2!1ses-419!2scl";

  // Mapa Molino de los Tilos
  const [latMolino, setLatMolino] = useState(null);
  const [lngMolino, setLngMolino] = useState(null);
  const [isFirstMapMolino, setIsFirstMapMolino] = useState(true);

  const googleMapUrl4 =
    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d103693.67701366192!2d-71.49153136419426!3d-35.69109853387289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-35.6818929!2d-71.4038092!5e0!3m2!1ses-419!2scl!4v1732050624646!5m2!1ses-419!2scl";

  const { t, i18n } = useTranslation();
  const { currentSlide, nextSlide, prevSlide } = useCarousel(4); // Configurado para 7 slides
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

    // Fetch data from the Django API (petroglifos)
    fetch('http://localhost:8000/api/lugares/buscar/?nombre=petroglifos') // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatPetro(data.latitud);
      setLngPetro(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));

    // Fetch data from the Django API (La Guardia)
    fetch('http://localhost:8000/api/lugares/buscar/?nombre=la_guardia') // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatGuardia(data.latitud);
      setLngGuardia(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));

    // Fetch data from the Django API (Tren Chico)
    fetch('http://localhost:8000/api/lugares/buscar/?nombre=tren_chico') // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatTren(data.latitud);
      setLngTren(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));

    // Fetch data from the Django API (Molino de los Tilos)
    fetch('http://localhost:8000/api/lugares/buscar/?nombre=molino_tilos') // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatMolino(data.latitud);
      setLngMolino(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));
  }, [i18n]); // Añadir el estado del idioma como dependencia

  // Cambia entre mapas (petroglifos)
  const toggleMapPetro = () => {
    setIsFirstMapPetro(!isFirstMapPetro);
  };

  // Cambia entre mapas (La Guardia)
  const toggleMapGuardia = () => {
    setIsFirstMapGuardia(!isFirstMapGuardia);
  };

  // Cambia entre mapas (Tren Chico)
  const toggleMapTren = () => {
    setIsFirstMapTren(!isFirstMapTren);
  };

  // Cambia entre mapas (Molino de los Tilos)
  const toggleMapMolino = () => {
    setIsFirstMapMolino(!isFirstMapMolino);
  };

  return (
    <div className="index-container">
      {/* Navbar */}
      <Header/>

      {/* Hero Section 1 */}
      <div className="hero5">
        <div className="hero-content5">
          <h5>{t('Culture')}</h5>
          <h1>{t('Petroglyphs')}</h1>
          <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</h4>
        </div>
      </div>

      {/* Pteroglifos */}
      <div className="info-section1">
        <section className="map-section">
          {latPetro && lngPetro && isFirstMapPetro ? (
            <LeafletMap latitud={latPetro} longitud={lngPetro} mapId={"petroglifoMap"} googleMapUrl={googleMapUrl}/>
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
            <button className="btn-blue2" onClick={toggleMapPetro}>
              <i className="bi bi-geo-alt"></i>
            </button>
          </div>
        </section>
      </div>

      {/* Hero Section 2 */}
      <div className="hero25">
        <div className="hero-content25">
          <h5>{t('Culture')}</h5>
          <h1>La Guardia</h1>
          <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</h4>
        </div>
      </div>

      {/* La Guardia */}
      <div className="info-section1">
        <section className="map-section">
          {latGuardia && lngGuardia && isFirstMapGuardia ? (
            <LeafletMap latitud={latGuardia} longitud={lngGuardia} mapId={"guardiaMap"} googleMapUrl={googleMapUrl2}/>
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
            <button className="btn-blue2" onClick={toggleMapGuardia}>
              <i className="bi bi-geo-alt"></i>
            </button>
          </div>
        </section>
      </div>

      {/* Hero Section 3 */}
      <div className="hero26">
        <div className="hero-content26">
          <h5>{t('Culture')}</h5>
          <h1>{t('Train')}</h1>
          <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</h4>
        </div>
      </div>

      {/* Tren Chico */}
      <div className="info-section1">
        <section className="map-section">
          {latTren && lngTren && isFirstMapTren ? (
            <LeafletMap latitud={latTren} longitud={lngTren} mapId={"trenChicoMap"} googleMapUrl={googleMapUrl3}/>
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
            <button className="btn-blue2" onClick={toggleMapTren}>
              <i className="bi bi-geo-alt"></i>
            </button>
          </div>
        </section>
      </div>

      {/* Hero Section 4 */}
      <div className="hero27">
        <div className="hero-content27">
          <h5>{t('Culture')}</h5>
          <h1>Molino de los Tilos</h1>
          <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</h4>
        </div>
      </div>

      {/* Molino de los Tilos */}
      <div className="info-section1">
        <section className="map-section">
          {latMolino && lngMolino && isFirstMapMolino ? (
            <LeafletMap latitud={latMolino} longitud={lngMolino} mapId={"molinoMap"} googleMapUrl={googleMapUrl4}/>
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
            <button className="btn-blue2" onClick={toggleMapMolino}>
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