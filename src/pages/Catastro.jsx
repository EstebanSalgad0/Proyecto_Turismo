import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../styles/Catastro.css?v=1.0'; // Archivo de estilos específico
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';

const CadastreService = () => {
  const { t, i18n } = useTranslation(); // Hook para usar traducciones

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language'); // Obtener idioma guardado
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage); // Cambiar el idioma si es necesario
    }
  }, [i18n]);

  // Hook para desplazar la página al inicio cuando se carga el componente
  useEffect(() => {
    window.scrollTo(0, 0); // Mueve la página hacia la parte superior
  }, []);

  return (
    <div className="cadastre-container-CZ">
      {/* Navbar */}
      <Header />

      {/* Sección de introducción */}
      <section className="intro-section-CZ">
        <div className="intro-header-CZ">
          <h5>{t('ServiceCadastre')}</h5>
          <div className="intro-subheader-CZ">
            <h1>{t('CadastreService')}</h1>
          </div>
        </div>

        <div className="intro-details-CZ">
          <h5>{t('JoinService')}</h5>
          <h5>{t('Artisan')}</h5>
          <ul>
            <li><h5>{t('Business')}</h5></li>
            <li><h5>{t('Connect')}</h5></li>
            <li><h5>{t('Promotional')}</h5></li>
          </ul>
          <h5>{t('Fast')}</h5>
        </div>
      </section>

      {/* Sección de enlaces */}
      <section className="links-section-CZ">
        <div className="link-item-CZ">
          <h2>
            <Link to="/registrarse">{t('ArtisanRegister')}</Link>
            <span className="link-description-CZ">({t('ClickToContinue')})</span>
          </h2>
          
        </div>
        <div className="link-item-CZ">
          <h2>
            <Link to="/registrarse">{t('BusinessRegister')}</Link>
            <span className="link-description-CZ">({t('ClickToContinue')})</span>
          </h2>
        </div>
        <div className="link-item-CZ">
          <h2>
            <Link to="/registrarse">{t('CabinsRegister')}</Link>
            <span className="link-description-CZ">({t('ClickToContinue')})</span>
          </h2>
        </div>
      </section>
      <SocialSection/>
      <Footer/>
    </div>
    
  );
};

export default CadastreService;
