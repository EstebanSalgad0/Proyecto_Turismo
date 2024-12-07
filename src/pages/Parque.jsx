import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Parque.css?v=1.4'; // Estilos específicos para el componente
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';
import Carousel from '../components/carousel';
import LeafletMap from '../components/LeafletMap'; // Componente de mapa

const Parque = () => {
  // Mapa Parque Guaiquivilo
  const [latParque, setLatParque] = useState(null);
  const [lngParque, setLngParque] = useState(null);
  const [isFirstMapParque, setIsFirstMapParque] = useState(true);

  const googleMapUrl =
    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d414371.98836577515!2d-71.50037627847176!3d-35.76846930086965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-35.9732392!2d-70.97871119999999!5e0!3m2!1ses-419!2scl!4v1732052411676!5m2!1ses-419!2scl";
  
  // Mapa Cavernas los bellotos
  const [latCavernas, setLatCavernas] = useState(null);
  const [lngCavernas, setLngCavernas] = useState(null);
  const [isFirstMapCavernas, setIsFirstMapCavernas] = useState(true);

  const googleMapUrl2 =
    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d828615.5593044015!2d-71.94269390211225!3d-35.780791715560255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-35.8577431!2d-71.10464329999999!5e0!3m2!1ses-419!2scl!4v1732052453221!5m2!1ses-419!2scl";

 // Mapa Mirador Loros Tricahue
 const [latGuardia, setLatGuardia] = useState(null);
 const [lngGuardia, setLngGuardia] = useState(null);
 const [isFirstMapGuardia, setIsFirstMapGuardia] = useState(true);

 const googleMapUrl3 =
   "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d227527.47735367808!2d-71.58702013940739!3d-35.77430504649028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-35.8374204!2d-71.3186113!5e0!3m2!1ses-419!2scl!4v1732589685295!5m2!1ses-419!2scl";

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language'); // Obtener el idioma guardado
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage); // Cambiar el idioma si es necesario
    }
    
    // Fetch data from the Django API (Parque Guaiquivilo)
    fetch('https://59d8706a9084d7426b317e87f91aa310.loophole.site/api/lugares/buscar/?nombre=parque_guaiquivilo') // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatParque(data.latitud);
      setLngParque(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));
    
    // Fetch data from the Django API (Cavernas los bellotos)
    fetch('https://59d8706a9084d7426b317e87f91aa310.loophole.site/api/lugares/buscar/?nombre=cavernas_bellotos') // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatCavernas(data.latitud);
      setLngCavernas(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));

    // Fetch data from the Django API (Mirador Loro Tricahue)
    fetch('https://59d8706a9084d7426b317e87f91aa310.loophole.site/api/lugares/buscar/?nombre=mirador_loro_tricahue') // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatGuardia(data.latitud);
      setLngGuardia(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));
  }, [i18n]); // Añadir el estado del idioma como dependencia

  // toggle mapa Parque Guaiquivilo
  const toggleMapParque = () => {
    setIsFirstMapParque(!isFirstMapParque);
  };

  // toggle mapa Cavernas los bellotos
  const toggleMapCavernas = () => {
    setIsFirstMapCavernas(!isFirstMapCavernas);
  };

   // Cambia entre mapas (La Guardia)
   const toggleMapGuardia = () => {
    setIsFirstMapGuardia(!isFirstMapGuardia);
  };

  return (
    <div className="index-container">
      {/* Navbar */}
      <Header/>

      {/* Hero Section 1 */}
      <div className="hero10">
        <div className="hero-content10">
          <br></br>
          <h5>{t('Parks')}</h5>
          <h1>{t('NationalPark')}</h1>
          <h4>{t('NationalParkInfo')}</h4>
        </div>
      </div>

      {/* Parque Guaiquivilo */}
      <div className="info-section1">
        <section className="map-section">
          {latParque && lngParque && isFirstMapParque ? (
            <LeafletMap latitud={latParque} longitud={lngParque} mapId={"parqueMap"} googleMapUrl={googleMapUrl}/>
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1732110474401!6m8!1m7!1sCAoSLEFGMVFpcFBUZnI4YmdRSGU2NS1QaW5TNkhTOHotTmRiUnZFNGVhNktvczdr!2m2!1d-35.972158419846!2d-70.97984180199266!3f12.44909734021195!4f-0.46061438048621994!5f0.7820865974627469"
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
          <p>{t('NationalParkRemember')}</p>
          <br></br><br></br><br></br><br></br>
          <div className="button-group">
            <button className="btn-blue" onClick={() => window.open("https://www.google.com/maps/embed?pb=!4v1732110474401!6m8!1m7!1sCAoSLEFGMVFpcFBUZnI4YmdRSGU2NS1QaW5TNkhTOHotTmRiUnZFNGVhNktvczdr!2m2!1d-35.972158419846!2d-70.97984180199266!3f12.44909734021195!4f-0.46061438048621994!5f0.7820865974627469", "_blank")}>
              {t('Discover')}
            </button>
            <button className="btn-blue2" onClick={toggleMapParque}>
              <i className="bi bi-geo-alt"></i>
            </button>
          </div>
        </section>
      </div>

      {/* Hero Section 2 */}
      <div className="hero10">
        <div className="hero-content10">
          <h5>{t('Parks')}</h5>
          <h1>{t('CavesBellotos')}</h1>
          <h4>{t('CavernasLosBellotosInfo')}</h4>
        </div>
      </div>

      {/* Cavernas Bellotos */}
      <div className="info-section1">
        <section className="map-section">
          {latCavernas && lngCavernas && isFirstMapCavernas ? (
            <LeafletMap latitud={latCavernas} longitud={lngCavernas} mapId={"cavernasMap"} googleMapUrl={googleMapUrl2}/>
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1732110530473!6m8!1m7!1sCAoSLEFGMVFpcFB4WmN2YzdwZkJveWdHMExEb0pXemc1N3pUakpzVkdYaGNWM1Rq!2m2!1d-35.86711438704836!2d-71.10167798481488!3f50.39907268022614!4f15.795228398432457!5f0.7820865974627469"
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
          <p>{t('CavernasLosBellotosRemember')}</p>
          <br></br><br></br><br></br><br></br><br></br>
          <div className="button-group">
            <button className="btn-blue" onClick={() => window.open("https://www.google.com/maps/embed?pb=!4v1732110530473!6m8!1m7!1sCAoSLEFGMVFpcFB4WmN2YzdwZkJveWdHMExEb0pXemc1N3pUakpzVkdYaGNWM1Rq!2m2!1d-35.86711438704836!2d-71.10167798481488!3f50.39907268022614!4f15.795228398432457!5f0.7820865974627469", "_blank")}>
              {t('Discover')}
            </button>
            <button className="btn-blue2" onClick={toggleMapCavernas}>
              <i className="bi bi-geo-alt"></i>
            </button>
          </div>
        </section>
      </div>

      {/* Hero Section 2 */}
      <div className="hero1000">
        <div className="hero-content1000">
          <h5>{t('Parks')}</h5>
          <h1>{t('MiradorTricahue')}</h1>
          <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</h4>
        </div>
      </div>

      {/* La Guardia */}
      <div className="info-section1">
        <section className="map-section">
          {latGuardia && lngGuardia && isFirstMapGuardia ? (
            <LeafletMap latitud={latGuardia} longitud={lngGuardia} mapId={"guardiaMap"} googleMapUrl={googleMapUrl3}/>
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
          <br></br>
          <p>{t('ColbunBeauty')}</p>
          <br></br>
          <div className="button-group">
            <button className="btn-blue" onClick={() => window.open("https://www.google.com/maps/embed?pb=!4v1732110530473!6m8!1m7!1sCAoSLEFGMVFpcFB4WmN2YzdwZkJveWdHMExEb0pXemc1N3pUakpzVkdYaGNWM1Rq!2m2!1d-35.86711438704836!2d-71.10167798481488!3f50.39907268022614!4f15.795228398432457!5f0.7820865974627469", "_blank")}>
              {t('Discover')}
            </button>
            <button className="btn-blue2" onClick={toggleMapCavernas}>
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

export default Parque;
