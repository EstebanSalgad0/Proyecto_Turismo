import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Zoit.css?v=1.6';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';

const Zoit = () => {
  const { t, i18n } = useTranslation(); // Hook para usar traducciones

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language'); // Obtener el idioma guardado
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage); // Cambiar el idioma si es necesario
    }
  }, [i18n]); // Añadir el estado del idioma como dependencia

  return (
    <div className="zoit-container">
      {/* Navbar */}
      <Header />

      {/* Sección de introducción */}
      <section className="zoit-intro-section">
        <div className="zoit-intro-header">
          <h5>Colbún ZOIT</h5>
          <div className="zoit-intro-subheader">
            <h2>{t('ZoitZone')}</h2>
          </div>
        </div>
        <div className="zoit-intro-details">
          <h5>{t('ZoitText1')}</h5>
          <h5>{t('ZoitText2')}</h5>
          <h5>{t('ZoitText3')}</h5>
        </div>
      </section>
      <SocialSection/>
      <Footer/>
    </div>
  );
};

export default Zoit;

