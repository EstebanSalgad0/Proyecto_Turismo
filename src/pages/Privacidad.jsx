import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Privacidad.css?v=1.5';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';

const Privacidad = () => {
  const { t, i18n } = useTranslation(); // Hook para usar traducciones

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language'); // Obtener el idioma guardado
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage); // Cambiar el idioma si es necesario
    }
  }, [i18n]);

  return (
    <div className="privacidad-container">
      {/* Navbar */}
      <Header />

      {/* Sección de encabezado */}
      <section className="header-section">
        <div className="header">
          <h5>{t('VisitFooter')}</h5>
          <div className="subheader">
            <h1>{t('Privacy')}</h1>
          </div>
        </div>
      </section>

      {/* Sección de contenido */}
      <section className="content-section">
        <p>
        {t("Privacidad1")}
        </p>
        <p>
        {t("Privacidad2")}
        </p>
        <p>
        {t("Privacidad3")}
        </p>
        <p>
        {t("Privacidad4")}
        </p>
        <p>
        {t("Privacidad5")}
        </p>
        <p>
        {t("Privacidad6")}
        </p>
        <p>
        {t("Privacidad7")}
        </p>
        <p>
        {t("Privacidad8")}
        </p>
        <p>
        {t("Privacidad9")}
        </p>
        <p>
        {t("Privacidad10")}
        </p>
        <p>
        {t("Privacidad11")}
        </p>
        <p>
        {t("Privacidad12")}
        </p>
        <p>
        {t("Privacidad13")}
        </p>
        <p>
        {t("Privacidad14")}
        </p>
        <p>
        {t("Privacidad15")}
        </p>
        <p>
        {t("Privacidad16")}
        </p>
        <p>
        {t("Privacidad17")}
        </p>
      </section>
      <SocialSection/>
      <Footer/>
      
    </div>
  );
};

export default Privacidad;
