import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/SobreNosotros.css?v=1.4';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';

const SobreNosotros = () => {
  const { t, i18n } = useTranslation(); // Hook para usar traducciones

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language'); // Obtener el idioma guardado
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage); // Cambiar el idioma si es necesario
    }
  }, [i18n]); // Añadir el estado del idioma como dependencia

  return (
    <div className="sobrenosotros-container-SN">
      {/* Navbar */}
      <Header />

      {/* Sección de encabezado */}
      <section className="header-section-SN">
        <div className="header-SN">
          <h5>{t('VisitFooter')}</h5>
          <div className="subheader-SN">
            <h1>{t('AboutUs')}</h1>
          </div>
        </div>
      </section>

      {/* Sección de contenido */}
      <section className="content-section-SN">
        <h5>{t('CultureXD')}</h5>

        <div className="subheader-SN">
          <h2>{t('Turism')}</h2>
        </div>
        <p>{t('CultureXD1')}</p>
        <p>{t('CultureXD2')}</p>

        <div className="subheader-SN">
          <h2>{t('Culture')}</h2>
        </div>
        <p>{t('CultureXD3')}</p>
        <p>{t('CultureXD4')}</p>
        <p>{t('CultureXD5')}</p>
        <p>{t('CultureXD6')}</p>
      </section>
      <SocialSection/>
      <Footer/>
    </div>
  );
};

export default SobreNosotros;
