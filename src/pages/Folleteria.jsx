import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Folleteria.css'; // CSS específico para Folleteria
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import '../components/i18n';
import { useTranslation } from 'react-i18next';
import LeafletMap from '../components/LeafletMap'; // Componente para mapas dinámicos
import ContactSection from '../components/ContactSection'; // Sección de contacto reutilizable

const Folleteria = () => {
  const { t, i18n } = useTranslation();

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const googleMapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093647!2d144.95565141531898!3d-37.81732797975151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf0727e84aa4eaa7a!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1632999965765!5m2!1sen!2sau";

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }

    // Simulación de obtener coordenadas
    fetch('https://c61a7d0a26cfe25ef240d4257ce62807.loophole.site/api/lugares/buscar/?nombre=mapa_folleteria')
      .then((response) => response.json())
      .then((data) => {
        setLat(data.latitud || -35.699248); // Coordenadas de ejemplo
        setLng(data.longitud || -71.4146915);
      })
      .catch((error) => console.error('Error fetching location data:', error));
  }, [i18n]);

  return (
    <div className="folleteria-container">
      {/* Navbar */}
      <Header />

      {/* Sección de introducción */}
      <section className="intro-section">
        <div className="intro-header">
          <h5>{t('Turism')}</h5>
          <div className='intro-subheader'>
            <h1>{t('Brochures')}</h1>
          </div>
        </div>
        <p className="intro-text">{t('Tourist9')}</p>
      </section>

      {/* Sección del mapa */}
      <section className="map-section-fo">
        <div className="map-container">
          <div className="map-item">
            {lat && lng ? (
              <LeafletMap latitud={lat} longitud={lng} mapId="MapaFolleteria" />
            ) : (
              <iframe
                src={googleMapUrl}
                width="100%"
                height="400"
                allowFullScreen
                loading="lazy"
              ></iframe>
            )}
          </div>
        </div>
      </section>

      {/* Sección de contacto reutilizable */}
      <ContactSection />
      <SocialSection/>
      <Footer/>
    </div>
  );
};

export default Folleteria;
