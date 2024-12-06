import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Senderismo.css?v=1.6'; // Estilos específicos para el componente
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';
import Carousel from '../components/carousel';
import LeafletMap from '../components/LeafletMap';

const Cultura4 = () => {
  // Mapa Volcan San Pedro y San Pablo
  const [latPetro, setLatPetro] = useState(null);
  const [lngPetro, setLngPetro] = useState(null);
  const [isFirstMapPetro, setIsFirstMapPetro] = useState(true);

  const googleMapUrl =
    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d455571.78808134975!2d-71.44172057361573!3d-35.68389131199181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e0!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-35.8219261!2d-70.8121037!5e0!3m2!1ses-419!2scl!4v1732586016822!5m2!1ses-419!2scl";

  // Mapa laguna del dial
  const [latGuardia, setLatGuardia] = useState(null);
  const [lngGuardia, setLngGuardia] = useState(null);
  const [isFirstMapGuardia, setIsFirstMapGuardia] = useState(true);

  const googleMapUrl2 =
    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d120004.68519754826!2d-71.44335669065765!3d-35.68717631831008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-35.688274!2d-71.28830409999999!5e0!3m2!1ses-419!2scl!4v1732039606757!5m2!1ses-419!2scl";

  // Mapa Petroglifos
  const [latTren, setLatTren] = useState(null);
  const [lngTren, setLngTren] = useState(null);
  const [isFirstMapTren, setIsFirstMapTren] = useState(true);

  const googleMapUrl3 =
    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d413940.68078065995!2d-71.64625022256382!3d-35.851171877301056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e0!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-35.9066079!2d-71.310518!5e0!3m2!1ses-419!2scl!4v1732586247982!5m2!1ses-419!2scl";

  // Mapa baños del socorro
  const [latMolino, setLatMolino] = useState(null);
  const [lngMolino, setLngMolino] = useState(null);
  const [isFirstMapMolino, setIsFirstMapMolino] = useState(true);

  const googleMapUrl4 =
    "https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d829635.1840555792!2d-71.95969052147304!3d-35.68285106936987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!3e6!4m3!3m2!1d-35.4182123!2d-71.6719209!4m3!3m2!1d-35.9720307!2d-70.97944269999999!5e0!3m2!1ses-419!2scl!4v1732586295080!5m2!1ses-419!2scl";

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language'); // Obtener el idioma guardado
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage); // Cambiar el idioma si es necesario
    }

    // Fetch data from the Django API (Volcan San Pedro y San Pablo)
    fetch('https://59d8706a9084d7426b317e87f91aa310.loophole.site/api/lugares/buscar/?nombre=volcan_san_pedro_pablo') // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatPetro(data.latitud);
      setLngPetro(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));

    // Fetch data from the Django API (Laguna del Dial)
    fetch('https://59d8706a9084d7426b317e87f91aa310.loophole.site/api/lugares/buscar/?nombre=laguna_dial') // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatGuardia(data.latitud);
      setLngGuardia(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));

    // Fetch data from the Django API (Petroglifos)
    fetch('https://59d8706a9084d7426b317e87f91aa310.loophole.site/api/lugares/buscar/?nombre=petroglifos') // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatTren(data.latitud);
      setLngTren(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));

    // Fetch data from the Django API (baños del socorro)
    fetch('https://59d8706a9084d7426b317e87f91aa310.loophole.site/api/lugares/buscar/?nombre=banos_socorro') // Cambia el nombre por el lugar turístico que necesites
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
      <div className="hero33">
        <div className="hero-content33">
          <h5>{t('Hike')}</h5>
          <h1>{t('Volcano')}</h1>
          <h4>{t('VolcanoInfo')}</h4>
        </div>
      </div>

      {/* Volcan San Pedro y San Pablo */}
      <div className="info-section1">
        <section className="map-section">
          {latPetro && lngPetro && isFirstMapPetro ? (
            <LeafletMap latitud={latPetro} longitud={lngPetro} mapId={"petroglifoMap"} googleMapUrl={googleMapUrl}/>
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1732108627035!6m8!1m7!1sCAoSLEFGMVFpcE9hVjlsRWNwajFhN3RwV3JINDZpVloxakV6X3J1ajdUZ3hNbmVa!2m2!1d-36.17887916381087!2d-70.99122647538593!3f316.26834801075836!4f4.343650540943628!5f0.7820865974627469"
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
          <br></br><br></br><br></br><br></br><br></br>
          <p>{t('VolcanoRemember')}</p>
          <br></br><br></br><br></br><br></br>
          <div className="button-group">
            <button className="btn-blue" onClick={() => window.open("https://www.google.com/maps/embed?pb=!4v1732108627035!6m8!1m7!1sCAoSLEFGMVFpcE9hVjlsRWNwajFhN3RwV3JINDZpVloxakV6X3J1ajdUZ3hNbmVa!2m2!1d-36.17887916381087!2d-70.99122647538593!3f316.26834801075836!4f4.343650540943628!5f0.7820865974627469", "_blank")}>
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
          <h5>{t('Hike')}</h5>
          <h1>{t('LagunaDial')}</h1>
          <h4>{t('LagunaDialInfo')}</h4>
        </div>
      </div>

      {/* Laguna Dial*/}
      <div className="info-section1">
        <section className="map-section">
          {latGuardia && lngGuardia && isFirstMapGuardia ? (
            <LeafletMap latitud={latGuardia} longitud={lngGuardia} mapId={"guardiaMap"} googleMapUrl={googleMapUrl2}/>
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1732108744245!6m8!1m7!1sCAoSLEFGMVFpcFBSdUw3MVJDbFBPZmxWOVo5WkF1d1J4b3lIaEo0MzVySTF5aTJW!2m2!1d-35.72588483261625!2d-71.17014471318163!3f28.858550920051414!4f-2.6888395352959833!5f0.7820865974627469"
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
          <br></br><br></br>
          <p>{t('LagunaDialRemember')}</p>
          <br></br><br></br><br></br>
          <div className="button-group">
            <button className="btn-blue" onClick={() => window.open("https://www.google.com/maps/embed?pb=!4v1732108744245!6m8!1m7!1sCAoSLEFGMVFpcFBSdUw3MVJDbFBPZmxWOVo5WkF1d1J4b3lIaEo0MzVySTF5aTJW!2m2!1d-35.72588483261625!2d-71.17014471318163!3f28.858550920051414!4f-2.6888395352959833!5f0.7820865974627469", "_blank")}>
              {t('Discover')}
            </button>
            <button className="btn-blue2" onClick={toggleMapGuardia}>
              <i className="bi bi-geo-alt"></i>
            </button>
          </div>
        </section>
      </div>

      {/* Hero Section 3 */}
      <div className="hero34">
        <div className="hero-content34">
          <h5>{t('Hike')}</h5>
          <h1>{t('Petroglyphs')}</h1>
          <h4>{t('PetroglifosInfo')}</h4>
        </div>
      </div>

      {/* Petroglifos */}
      <div className="info-section1">
        <section className="map-section">
          {latTren && lngTren && isFirstMapTren ? (
            <LeafletMap latitud={latTren} longitud={lngTren} mapId={"trenChicoMap"} googleMapUrl={googleMapUrl3}/>
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1732108941575!6m8!1m7!1sCAoSLEFGMVFpcFB5NHdsb3k2UDZ2LVladGZ6dFY0MFZURUNaSE9ISEpLQThQMmhi!2m2!1d-36.79345542530866!2d-71.74740462332323!3f293.4261803724048!4f8.974302220732682!5f0.7820865974627469"
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
          <p>{t('PetroglyphsRemember')}</p>
          <br></br>
          <div className="button-group">
            <button className="btn-blue" onClick={() => window.open("https://www.google.com/maps/embed?pb=!4v1732108941575!6m8!1m7!1sCAoSLEFGMVFpcFB5NHdsb3k2UDZ2LVladGZ6dFY0MFZURUNaSE9ISEpLQThQMmhi!2m2!1d-36.79345542530866!2d-71.74740462332323!3f293.4261803724048!4f8.974302220732682!5f0.7820865974627469", "_blank")}>
              {t('Discover')}
            </button>
            <button className="btn-blue2" onClick={toggleMapTren}>
              <i className="bi bi-geo-alt"></i>
            </button>
          </div>
        </section>
      </div>

      {/* Hero Section 4 */}
      <div className="hero77">
        <div className="hero-content77">
          <h5>{t('Hike')}</h5>
          <h1>{t('BanosSocorro')}</h1>
          <h4>{t('BanosSocorroInfo')}</h4>
        </div>
      </div>

      {/* Baños del Socorro */}
      <div className="info-section1">
        <section className="map-section">
          {latMolino && lngMolino && isFirstMapMolino ? (
            <LeafletMap latitud={latMolino} longitud={lngMolino} mapId={"molinoMap"} googleMapUrl={googleMapUrl4}/>
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1732109063190!6m8!1m7!1s_pyOOxhO13cmjhPllzP5GA!2m2!1d-35.6825945070972!2d-71.40388705891255!3f43.35102145107044!4f25.196117320913544!5f0.7820865974627469"
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
          <br></br><br></br><br></br><br></br>
          <p>{t('BanosSocorroRemember')}</p>
          <br></br><br></br><br></br><br></br>
          <div className="button-group">
            <button className="btn-blue" onClick={() => window.open("https://www.google.com/maps/embed?pb=!4v1732109063190!6m8!1m7!1s_pyOOxhO13cmjhPllzP5GA!2m2!1d-35.6825945070972!2d-71.40388705891255!3f43.35102145107044!4f25.196117320913544!5f0.7820865974627469", "_blank")}>
              {t('Discover')}
            </button>
            <button className="btn-blue2" onClick={toggleMapMolino}>
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

export default Cultura4;
