import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Cultura4.css?v=1.5'; // Estilos específicos para el componente
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';
import Carousel from '../components/carousel';
import LeafletMap from '../components/LeafletMap';

const Cultura4 = () => {
  // Mapa Termas de Panimavida
  const [latTermasP, setLatTermasP] = useState(null);
  const [lngTermasP, setLngTermasP] = useState(null);
  const [isFirstMapTermasP, setIsFirstMapTermasP] = useState(true);

  const googleMapUrl =
    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d207284.75008986876!2d-71.57971686533293!3d-35.730541351364614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-35.7627686!2d-71.4179164!5e0!3m2!1ses-419!2scl!4v1732051571815!5m2!1ses-419!2scl";
  
    const [latPetro, setLatPetro] = useState(null);
  const [lngPetro, setLngPetro] = useState(null);
  const [isFirstMapPetro, setIsFirstMapPetro] = useState(true);

  const googleMapUrl6 =
    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d1658340.8925965272!2d-72.40156019292971!3d-35.72752058936435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e0!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-35.9444181!2d-70.5867937!5e0!3m2!1ses-419!2scl!4v1732051946531!5m2!1ses-419!2scl";
  // Mapa Poza de la Mona
  const [latPoza, setLatPoza] = useState(null);
  const [lngPoza, setLngPoza] = useState(null);
  const [isFirstMapPoza, setIsFirstMapPoza] = useState(true);

  const googleMapUrl2 =
    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d829420.5304898885!2d-71.82992031945923!3d-35.703489096462825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-35.8415825!2d-70.9725874!5e0!3m2!1ses-419!2scl!4v1732051621200!5m2!1ses-419!2scl";
  
  // Mapa Rari
  const [latRari, setLatRari] = useState(null);
  const [lngRari, setLngRari] = useState(null);
  const [isFirstMapRari, setIsFirstMapRari] = useState(true);

  const googleMapUrl3 =
    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d414558.67212681606!2d-71.74451177247516!3d-35.73262155301356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-35.766326299999996!2d-71.4144738!5e0!3m2!1ses-419!2scl!4v1732051697751!5m2!1ses-419!2scl";

  // Mapa Termas de Quinamavida
  const [latTermasQ, setLatTermasQ] = useState(null);
  const [lngTermasQ, setLngTermasQ] = useState(null);
  const [isFirstMapTermasQ, setIsFirstMapTermasQ] = useState(true);

  const googleMapUrl4 =
    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d414474.59265016724!2d-71.75870903849396!3d-35.74877068000064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-35.7956998!2d-71.4266246!5e0!3m2!1ses-419!2scl!4v1732051744420!5m2!1ses-419!2scl";

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language'); // Obtener el idioma guardado
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage); // Cambiar el idioma si es necesario
    }
    
    // Fetch data from the Django API (Termas de Panimavida)
    fetch('https://59d8706a9084d7426b317e87f91aa310.loophole.site/api/lugares/buscar/?nombre=termas_panimavida') // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatTermasP(data.latitud);
      setLngTermasP(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));

    // Fetch data from the Django API (Petroglifos)
    fetch('https://59d8706a9084d7426b317e87f91aa310.loophole.site/api/lugares/buscar/?nombre=petroglifos') // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatPetro(data.latitud);
      setLngPetro(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));
    
    // Fetch data from the Django API (Poza de la Mona)
    fetch('https://59d8706a9084d7426b317e87f91aa310.loophole.site/api/lugares/buscar/?nombre=poza_mona') // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatPoza(data.latitud);
      setLngPoza(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));
    
    // Fetch data from the Django API (Rari)
    fetch('https://59d8706a9084d7426b317e87f91aa310.loophole.site/api/lugares/buscar/?nombre=rari') // Cambia el nombre por el lugar turístico que necesites
    .then(response => response.json())
    .then(data => {
      setLatRari(data.latitud);
      setLngRari(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));
    
    // Fetch data from the Django API (Termas de Quinamavida)
    fetch('https://59d8706a9084d7426b317e87f91aa310.loophole.site/api/lugares/buscar/?nombre=termas_quinamavida') // Cambia el nombre por el lugar turístico que necesites
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

  const toggleMapPetro = () => {
    setIsFirstMapPetro(!isFirstMapPetro);
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
          <h1>{t('Rari1')}</h1>
          <h4>{t('RariInfo1')}</h4>
        </div>
      </div>

      {/* Rari */}
      <div className="info-section1">
        <section className="map-section">
          {latRari && lngRari && isFirstMapRari ? (
            <LeafletMap latitud={latRari} longitud={lngRari} mapId={"rariMap"} googleMapUrl={googleMapUrl3}/>
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1732110040297!6m8!1m7!1sCAoSLEFGMVFpcE5GUFltYV9vVFlLOG1iTnV5Z2VCLTItaGRhNXF5eDZSUjNwNjA2!2m2!1d-35.76681201040139!2d-71.41481823590898!3f2.539690930697418!4f-1.2518759291061201!5f0.7820865974627469"
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
          <p>{t('RariRemember')}</p>
          <br></br>
          <div className="button-group">
            <button className="btn-blue" onClick={() => window.open("https://www.google.com/maps/embed?pb=!4v1732109856360!6m8!1m7!1sCAoSLEFGMVFpcE9JNzVEUzRjM2JqRlpOR01SNDhWYnNTd1E0Q0w4TGhad1pzWXVz!2m2!1d-35.76205581836644!2d-71.41807121598933!3f114.49191794425955!4f0.8264159919051792!5f0.7820865974627469", "_blank")}>
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
          <h1>{t('TermasQuinamavida')}</h1>
          <h4>{t('TermasQuinamavidaInfo')}</h4>
        </div>
      </div>


      {/* Termas de Quinamávida */}
      <div className="info-section1">
        <section className="map-section">
          {latTermasQ && lngTermasQ && isFirstMapTermasQ ? (
            <LeafletMap latitud={latTermasQ} longitud={lngTermasQ} mapId={"meladoMap"} googleMapUrl={googleMapUrl4}/>
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1732110108785!6m8!1m7!1sCAoSLEFGMVFpcE9UNUZSR1MxcGFNN1A5MXk1ekl3TmNRbEQ5Mm15OEZHOFU2enZv!2m2!1d-35.79607496751252!2d-71.42723207417494!3f83.09804123831863!4f5.435251596331639!5f0.7820865974627469"
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
          <p>{t('TermasQuinamavidaRemember')}</p>
          <br></br><br></br><br></br><br></br><br></br><br></br>
          <div className="button-group">
            <button className="btn-blue" onClick={() => window.open("https://www.google.com/maps/embed?pb=!4v1732109976050!6m8!1m7!1sCAoSLEFGMVFpcE1JR0xTYXIxMnlhRUU5dmhSbThOMmRIejJrRXhMWG0zTzdlVW5J!2m2!1d-35.76229748808326!2d-71.41611645995395!3f86.46720390517066!4f-0.46435508906901646!5f0.7820865974627469", "_blank")}>
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
          <h1>{t('Toba')}</h1>
          <h4>{t('TobaInfo')}</h4>
        </div>
      </div>

      <div className="info-section1">
        <section className="map-section">
          {latPetro && lngPetro && isFirstMapPetro ? (
            <LeafletMap latitud={latPetro} longitud={lngPetro} mapId={"petroglifosMap"} googleMapUrl={googleMapUrl6}/>
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
          <p>{t('TobaRemember')}</p>
          <br></br><br></br><br></br><br></br><br></br>
          <div className="button-group">
            <button className="btn-blue" onClick={() => window.open("https://www.google.com/maps/embed?pb=!4v1732110040297!6m8!1m7!1sCAoSLEFGMVFpcE5GUFltYV9vVFlLOG1iTnV5Z2VCLTItaGRhNXF5eDZSUjNwNjA2!2m2!1d-35.76681201040139!2d-71.41481823590898!3f2.539690930697418!4f-1.2518759291061201!5f0.7820865974627469", "_blank")}>
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
          <h1>{t('TelarQuinamavida')}</h1>
          <h4>{t('TelarQuinamavidaInfo')}</h4>
        </div>
      </div>

      {/* Poza de la Mona */}
      <div className="info-section1">
        <section className="map-section">
          {latPoza && lngPoza && isFirstMapPoza ? (
            <LeafletMap latitud={latPoza} longitud={lngPoza} mapId={"pozaMap"} googleMapUrl={googleMapUrl2}/>
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
          <br></br><br></br><br></br><br></br><br></br>
          <p>{t('TermasQuinamavidaRemember')}</p>
          <br></br><br></br><br></br><br></br><br></br>
          <div className="button-group">
            <button className="btn-blue" onClick={() => window.open("https://www.google.com/maps/embed?pb=!4v1732110108785!6m8!1m7!1sCAoSLEFGMVFpcE9UNUZSR1MxcGFNN1A5MXk1ekl3TmNRbEQ5Mm15OEZHOFU2enZv!2m2!1d-35.79607496751252!2d-71.42723207417494!3f83.09804123831863!4f5.435251596331639!5f0.7820865974627469", "_blank")}>
              {t('Discover')}
            </button>
            <button className="btn-blue2" onClick={toggleMapTermasQ}>
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
