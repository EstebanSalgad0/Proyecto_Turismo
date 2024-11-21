import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/OIT.css?v=1.4';
import Header from '../components/Header';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';
import LeafletMap from '../components/LeafletMap';

const Zoit = () => {
  // Coordenadas mapa 1
  const [latOff1, setLatOff1] = useState(null);
  const [lngOff1, setLngOff1] = useState(null);
  const googleMapUrlOff1 = "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d19031.199618275852!2d-71.42691824685197!3d-35.69855558589736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-35.701705!2d-71.40802599999999!5e0!3m2!1ses-419!2scl!4v1732148634055!5m2!1ses-419!2scl";

  // Coordenadas mapa 2
  const [latOff2, setLatOff2] = useState(null);
  const [lngOff2, setLngOff2] = useState(null);
  const googleMapUrlOff2 = "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d168739.661849181!2d-71.62050216939608!3d-35.710942719059005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-35.763318!2d-71.419848!5e0!3m2!1ses-419!2scl!4v1732148689613!5m2!1ses-419!2scl";

  const { t, i18n } = useTranslation(); // Hook para usar traducciones

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language'); // Obtener el idioma guardado
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage); // Cambiar el idioma si es necesario
    }
    
    // Fetch data from the Django API
    fetch('http://localhost:8000/api/lugares/buscar/?nombre=mapa_folleteria_1')
      .then(response => response.json())
      .then(data => {
        setLatOff1(data.latitud);
        setLngOff1(data.longitud);
      })
      .catch(error => console.error('Error fetching location data:', error));
      
    // Fetch data from the Django API
    fetch('http://localhost:8000/api/lugares/buscar/?nombre=mapa_folleteria_2')
    .then(response => response.json())
    .then(data => {
      setLatOff2(data.latitud);
      setLngOff2(data.longitud);
    })
    .catch(error => console.error('Error fetching location data:', error));
  }, [i18n]); // Añadir el estado del idioma como dependencia

  return (
    <div className="index-container">
      {/* Navbar */}
      <Header/>


      {/* Carousel Section */}
      <section className="carousel-section">
        <div className="carousel-header">
        <br></br><br></br><br></br><br></br>
          <h5>{t('Turism')}</h5>
          <div className="carousel-subheader">
            <h1>{t('Tourist1')}</h1>
          </div>
        </div>
        <br></br>
        <h5>{t('Tourist3')}</h5>
                <br></br>
               <br></br><br></br>
        <h5>{t('Tourist4')}</h5>
        <h5>{t('Tourist5')}</h5>
        <h5>{t('Tourist6')}</h5>
        <h5>{t('Tourist7')}</h5>
        <br></br><br></br><br></br>
        <div className="carousel-subheader">
            <h1>{t('Tourist8')}</h1>
        </div>
        <div className="info-section2">
          <section className="map-section">
            {latOff1 && lngOff1 ? (
              <LeafletMap latitud={latOff1} longitud={lngOff1} mapId={"Off1Map"} googleMapUrl={googleMapUrlOff1}/>
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
        </div>
        <div className="info-section2">
          <section className="map-section">
            {latOff2 && lngOff2 ? (
              <LeafletMap latitud={latOff2} longitud={lngOff2} mapId={"Off2Map"} googleMapUrl={googleMapUrlOff2}/>
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
        </div>
        <br></br>
        <div className="carousel-subheader">
          <h2>{t('Contact1')}</h2>
        </div>
        <br></br><br></br>
        <div className="contact-section">
          <div className="contact-item">
            <h3>WhatsApp</h3>
            <p>+569 9458 0453</p>
          </div>
          <div className="contact-item">
            <h3>{t('WriteUs')}</h3>
            <p>turismoatiende@sernatur.cl</p>
          </div>
          <div className="contact-item">
            <h3>Call Center</h3>
            <p>600 600 60 66</p>
          </div>
        </div>


        
      </section>
    </div>
  );
};

export default Zoit;