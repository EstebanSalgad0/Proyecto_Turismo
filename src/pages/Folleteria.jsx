import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Folleteria.css?v=1.5';
import Header from '../components/Header';
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
    <div className="index-container">
      {/* Navbar */}
      <Header/>


      {/* Carousel Section */}
      <section className="carousel-section">
        <div className="carousel-header">
            <br></br><br></br><br></br><br></br>
          <h5>{t('Turism')}</h5>
          <div className="carousel-subheader">
            <h1>{t('Brochures')}</h1>
          </div>
        </div>
        <br></br><br></br>
        <h5>{t('Tourist9')}</h5>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
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