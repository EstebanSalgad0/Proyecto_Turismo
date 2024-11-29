import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/OIT.css?v=1.4';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';
import LeafletMap from '../components/LeafletMap';
import ContactSection from '../components/ContactSection';

const OIT = () => {
  const { t, i18n } = useTranslation(); // Hook para usar traducciones

  // Coordenadas de los mapas
  const [latOff1, setLatOff1] = useState(null);
  const [lngOff1, setLngOff1] = useState(null);
  const [latOff2, setLatOff2] = useState(null);
  const [lngOff2, setLngOff2] = useState(null);

  const googleMapUrlOff1 =
    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d19031.199618275852!2d-71.42691824685197!3d-35.69855558589736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-35.701705!2d-71.40802599999999!5e0!3m2!1ses-419!2scl!4v1732148634055!5m2!1ses-419!2scl";
  const googleMapUrlOff2 =
    "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d168739.661849181!2d-71.62050216939608!3d-35.710942719059005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x966f990a6fbb05b1%3A0xcc8116cf96804acf!2zQ29sYnVuLCBDb2xiw7pu!3m2!1d-35.699248!2d-71.4146915!4m3!3m2!1d-35.763318!2d-71.419848!5e0!3m2!1ses-419!2scl!4v1732148689613!5m2!1ses-419!2scl";

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }

    // Fetch coordenadas del mapa 1
    fetch('http://www.visitacolbun.cl/api/lugares/buscar/?nombre=mapa_folleteria_1')
      .then((response) => response.json())
      .then((data) => {
        setLatOff1(data.latitud);
        setLngOff1(data.longitud);
      })
      .catch((error) => console.error('Error fetching location data:', error));

    // Fetch coordenadas del mapa 2
    fetch('http://www.visitacolbun.cl/api/lugares/buscar/?nombre=mapa_folleteria_2')
      .then((response) => response.json())
      .then((data) => {
        setLatOff2(data.latitud);
        setLngOff2(data.longitud);
      })
      .catch((error) => console.error('Error fetching location data:', error));
  }, [i18n]);

  return (
    <div className="oit-container">
      {/* Navbar */}
      <Header />

      {/* Sección de introducción */}
      <section className="intro-section">
        <div className="intro-header">
          <h5>{t('Turism')}</h5>
          <div className="intro-subheader">
            <h1>{t('Tourist1')}</h1>
          </div>
        </div>

        <div className="intro-details">
          <h5>{t('Tourist3')}</h5>
          <ul>
            <li>{t('Tourist4')}</li>
            <li>{t('Tourist5')}</li>
            <li>{t('Tourist6')}</li>
            <li>{t('Tourist7')}</li>
          </ul>
        </div>
      </section>

      {/* Sección de mapas */}
      <section className="map-section">
        <div className="map-title">
          <h1>{t('Tourist8')}</h1>
          <div className="map-container">
              <div className="map-item">
                {latOff1 && lngOff1 ? (
                  <LeafletMap
                    latitud={latOff1}
                    longitud={lngOff1}
                    mapId="Off1Map"
                    googleMapUrl={googleMapUrlOff1}
                  />
                ) : (
                  <iframe
                    src={googleMapUrlOff1}
                    width="100%"
                    height="400"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                )}
              </div>

              <div className="map-item">
                {latOff2 && lngOff2 ? (
                  <LeafletMap
                    latitud={latOff2}
                    longitud={lngOff2}
                    mapId="Off2Map"
                    googleMapUrl={googleMapUrlOff2}
                  />
                ) : (
                  <iframe
                    src={googleMapUrlOff2}
                    width="100%"
                    height="400"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                )}
              </div>
            </div>
        </div>

        
      </section>
      
      <ContactSection/>
      <SocialSection/>
      <Footer/>

    </div>
  );
};

export default OIT;
