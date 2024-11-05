import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/SobreNosotros.css?v=1.4';
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

  // Hook para desplazar la página al inicio cuando se carga el componente
  useEffect(() => {
    window.scrollTo(0, 0); // Mueve la página hacia la parte superior
  }, []);
  

  return (
    <div className="index-container">
      {/* Navbar */}
      <Header/>

      {/* Carousel Section */}
      <section className="carousel-section">
        <div className="carousel-header">
            <br></br><br></br><br></br><br></br>
          <h5>{t('VisitFooter')}</h5>
          <div className="carousel-subheader">
            <h1>{t('AboutUs')}</h1>
          </div>
        </div>
        <br></br>
        <h5>{t('CultureXD')}</h5>
                <br></br>
                <div className="carousel-subheader">
            <h2>{t('Tourism')}</h2>
          </div>
          <br></br><br></br>
        <h5>{t('CultureXD1')}</h5>
        <br></br>
        <h5>{t('CultureXD2')}</h5>
               <br></br>
               <div className="carousel-subheader">
            <h2>{t('Culture')}</h2>
          </div>
          <br></br><br></br>
        <h5>{t('CultureXD3')}</h5>
        <br></br>
        <h5>{t('CultureXD4')}</h5>
        <br></br>
        <h5>{t('CultureXD5')}</h5>
        <br></br>
        <h5>{t('CultureXD6')}</h5>
      </section>
    </div>
  );
};

export default Zoit;