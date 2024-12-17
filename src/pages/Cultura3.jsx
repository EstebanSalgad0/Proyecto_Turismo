import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Cultura3.css?v=1.4'; // Estilos específicos para el componente
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';
import Carousel from '../components/carousel';
import LeafletMap from '../components/LeafletMap'; // Componente de mapa

const Cultura4 = () => {
  const [latIglesia, setLatIglesia] = useState(null);
  const [lngIglesia, setLngIglesia] = useState(null);
  const [isFirstMapIglesia, setIsFirstMapIglesia] = useState(true);

  const googleMapUrl =
    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d207285.37809092423!2d-71.57947266533611!3d-35.730300051173366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-35.761504099999996!2d-71.41799379999999!5e0!3m2!1ses-419!2scl!4v1732051094001!5m2!1ses-419!2scl";
  
  const [latTacitas, setLatTacitas] = useState(null);
  const [lngTacitas, setLngTacitas] = useState(null);
  const [isFirstMapTacitas, setIsFirstMapTacitas] = useState(true);

  const googleMapUrl2 =
    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d831064.5579931617!2d-71.83234775489971!3d-35.545157854255024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-35.4600602!2d-71.0259233!5e0!3m2!1ses-419!2scl!4v1732051154975!5m2!1ses-419!2scl";
  
  const [latEmbotelladora, setLatEmbotelladora] = useState(null);
  const [lngEmbotelladora, setLngEmbotelladora] = useState(null);
  const [isFirstMapEmbotelladora, setIsFirstMapEmbotelladora] = useState(true);

  const googleMapUrl3 =
    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d414474.59265016724!2d-71.75846483849399!3d-35.74877068000064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-35.7958315!2d-71.4308266!5e0!3m2!1ses-419!2scl!4v1732051204327!5m2!1ses-419!2scl";
  
  const [latEstacion, setLatEstacion] = useState(null);
  const [lngEstacion, setLngEstacion] = useState(null);
  const [isFirstMapEstacion, setIsFirstMapEstacion] = useState(true);

  const googleMapUrl4 =
    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d12960.184829085068!2d-71.421741535658!3d-35.70048051624543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-35.702401!2d-71.4080235!5e0!3m2!1ses-419!2scl!4v1732051252280!5m2!1ses-419!2scl";

    // Mapa Termas de Panimavida
  const [latTermasP, setLatTermasP] = useState(null);
  const [lngTermasP, setLngTermasP] = useState(null);
  const [isFirstMapTermasP, setIsFirstMapTermasP] = useState(true);

  const googleMapUrl5 =
    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d207284.75008986876!2d-71.57971686533293!3d-35.730541351364614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-35.7627686!2d-71.4179164!5e0!3m2!1ses-419!2scl!4v1732051571815!5m2!1ses-419!2scl";
  
  // Mapa Poza de la Mona
  const [latPoza, setLatPoza] = useState(null);
  const [lngPoza, setLngPoza] = useState(null);
  const [isFirstMapPoza, setIsFirstMapPoza] = useState(true);

  const googleMapUrl6 =
    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d829420.5304898885!2d-71.82992031945923!3d-35.703489096462825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-35.8415825!2d-70.9725874!5e0!3m2!1ses-419!2scl!4v1732051621200!5m2!1ses-419!2scl";

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language'); // Obtener el idioma guardado
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage); // Cambiar el idioma si es necesario
    }
    
    // Fetch data from the Django API (Iglesia de Panimavida)
    fetch('https://49bdbb88728953fd028caea01d4c7dbd.loophole.site/api/lugares/buscar/?nombre=iglesia_panimavida') // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatIglesia(data.latitud);
      setLngIglesia(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));
    
    // Fetch data from the Django API (Las Tacitas)
    fetch('https://49bdbb88728953fd028caea01d4c7dbd.loophole.site/api/lugares/buscar/?nombre=las_tacitas') // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatTacitas(data.latitud);
      setLngTacitas(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));
    
    // Fetch data from the Django API (Embotelladora)
    fetch('https://49bdbb88728953fd028caea01d4c7dbd.loophole.site/api/lugares/buscar/?nombre=embotelladora') // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatEmbotelladora(data.latitud);
      setLngEmbotelladora(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));

    // Fetch data from the Django API (Termas de Panimavida)
    fetch('https://49bdbb88728953fd028caea01d4c7dbd.loophole.site/api/lugares/buscar/?nombre=termas_panimavida') // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatTermasP(data.latitud);
      setLngTermasP(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));
    
    // Fetch data from the Django API (Poza de la Mona)
    fetch('https://49bdbb88728953fd028caea01d4c7dbd.loophole.site/api/lugares/buscar/?nombre=poza_mona') // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatPoza(data.latitud);
      setLngPoza(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));
    
    // Fetch data from the Django API (Estacion del Tren)
    fetch('https://49bdbb88728953fd028caea01d4c7dbd.loophole.site/api/lugares/buscar/?nombre=estacion_tren') // Cambia el nombre por el lugar turístico que necesites
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
      <div className="hero3004">
        <div className="hero-content3004">
          <h5>{t('Culture')}</h5>
          <h1>{t('Church')}</h1>
          <h4>{t('ChurchInfo')}</h4>
        </div>
      </div>

      {/* Iglesia Panimavida */}
      <div className="info-section1">
        <section className="map-section">
          {latIglesia && lngIglesia && isFirstMapIglesia ? (
            <LeafletMap latitud={latIglesia} longitud={lngIglesia} mapId={"iglesiaMap"} googleMapUrl={googleMapUrl}/>
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1732109399271!6m8!1m7!1sCAoSLEFGMVFpcE1mWm1ZaEVPR0J2UzNDdEp6eG5XbWdrNVdnY0xFRjVnYVNrWkIx!2m2!1d-35.76163928343502!2d-71.4180072564887!3f15.488554708121086!4f15.982022480642627!5f0.7820865974627469"
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
          <p>{t('ChurchRemember')}</p>
          <br></br><br></br><br></br><br></br>
          <div className="button-group">
            <button className="btn-blue" onClick={() => window.open("https://www.google.com/maps/embed?pb=!4v1732109399271!6m8!1m7!1sCAoSLEFGMVFpcE1mWm1ZaEVPR0J2UzNDdEp6eG5XbWdrNVdnY0xFRjVnYVNrWkIx!2m2!1d-35.76163928343502!2d-71.4180072564887!3f15.488554708121086!4f15.982022480642627!5f0.7820865974627469", "_blank")}>
              {t('Discover')}
            </button>
            <button className="btn-blue2" onClick={toggleMapIglesia}>
              <i className="bi bi-geo-alt"></i>
            </button>
          </div>
        </section>
      </div>

      {/* Hero Section 4 */}
      <div className="hero3005">
        <div className="hero-content3005">
          <h5>{t('Culture')}</h5>
          <h1>{t('Train1')}</h1>
          <h4>{t('Train1Info')}</h4>
        </div>
      </div>

      {/* Estacion del tren */}
      <div className="info-section1">
        <section className="map-section">
          {latEstacion && lngEstacion && isFirstMapEstacion ? (
            <LeafletMap latitud={latEstacion} longitud={lngEstacion} mapId={"estacionMap"} googleMapUrl={googleMapUrl4}/>
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1732109774394!6m8!1m7!1sCAoSLEFGMVFpcFB5NHdsb3k2UDZ2LVladGZ6dFY0MFZURUNaSE9ISEpLQThQMmhi!2m2!1d-36.79345542530866!2d-71.74740462332323!3f39.93564425123765!4f2.4770250145362525!5f0.7820865974627469"
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
          <br></br><br></br><br></br>
          <p>{t('Train1Remember')}</p>
          <br></br><br></br>
          <div className="button-group">
            <button className="btn-blue" onClick={() => window.open("https://www.google.com/maps/embed?pb=!4v1732109774394!6m8!1m7!1sCAoSLEFGMVFpcFB5NHdsb3k2UDZ2LVladGZ6dFY0MFZURUNaSE9ISEpLQThQMmhi!2m2!1d-36.79345542530866!2d-71.74740462332323!3f39.93564425123765!4f2.4770250145362525!5f0.7820865974627469", "_blank")}>
              {t('Discover')}
            </button>
            <button className="btn-blue2" onClick={toggleMapEstacion}>
              <i className="bi bi-geo-alt"></i>
            </button>
          </div>
        </section>
      </div>

      {/* Hero Section 2 */}
      <div className="hero3006">
        <div className="hero-content3006">
        <h5>{t('Culture')}</h5>
          <h1>{t('Springs')}</h1>
          <h4>{t('TermasPanimavidaInfo')}</h4>
        </div>
      </div>

      {/* Termas Panimavida */}
      <div className="info-section1">
        <section className="map-section">
          {latTermasP && lngTermasP && isFirstMapTermasP ? (
            <LeafletMap latitud={latTermasP} longitud={lngTermasP} mapId={"termasPMap"} googleMapUrl={googleMapUrl5}/>
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1732109856360!6m8!1m7!1sCAoSLEFGMVFpcE9JNzVEUzRjM2JqRlpOR01SNDhWYnNTd1E0Q0w4TGhad1pzWXVz!2m2!1d-35.76205581836644!2d-71.41807121598933!3f114.49191794425955!4f0.8264159919051792!5f0.7820865974627469"
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
          <br></br><br></br><br></br>
          <p>{t('TermasPanimavidaRemember')}</p>
          <br></br><br></br>
          <div className="button-group">
            <button className="btn-blue" onClick={() => window.open("https://www.google.com/maps/embed?pb=!4v1732109856360!6m8!1m7!1sCAoSLEFGMVFpcE9JNzVEUzRjM2JqRlpOR01SNDhWYnNTd1E0Q0w4TGhad1pzWXVz!2m2!1d-35.76205581836644!2d-71.41807121598933!3f114.49191794425955!4f0.8264159919051792!5f0.7820865974627469", "_blank")}>
              {t('Discover')}
            </button>
            <button className="btn-blue2" onClick={toggleMapTacitas}>
              <i className="bi bi-geo-alt"></i>
            </button>
          </div>
        </section>
      </div>

      {/* Hero Section 3 */}
      <div className="hero3007">
        <div className="hero-content3007">
          <h5>{t('Culture')}</h5>
          <h1>{t('PozaMona')}</h1>
          <h4>{t('LaPozaMonaInfo')}</h4>
        </div>
      </div>

      {/* Poza de la Mona */}
      <div className="info-section1">
        <section className="map-section">
          {latPoza && lngPoza && isFirstMapPoza ? (
            <LeafletMap latitud={latPoza} longitud={lngPoza} mapId={"pozaMap"} googleMapUrl={googleMapUrl6}/>
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1732109976050!6m8!1m7!1sCAoSLEFGMVFpcE1JR0xTYXIxMnlhRUU5dmhSbThOMmRIejJrRXhMWG0zTzdlVW5J!2m2!1d-35.76229748808326!2d-71.41611645995395!3f86.46720390517066!4f-0.46435508906901646!5f0.7820865974627469"
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
          <br></br><br></br><br></br><br></br><br></br><br></br>
          <p>{t('PozaMonaInfo')}</p>
          <br></br><br></br><br></br><br></br>
          <div className="button-group">
            <button className="btn-blue" onClick={() => window.open("https://www.google.com/maps/embed?pb=!4v1732109619684!6m8!1m7!1sDWCbWPwHQLb--hU05-ycOQ!2m2!1d-35.79536237939999!2d-71.42839862393754!3f73.80310833759117!4f-1.8577525390781773!5f0.7820865974627469", "_blank")}>
              {t('Discover')}
            </button>
            <button className="btn-blue2" onClick={toggleMapEmbotelladora}>
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
