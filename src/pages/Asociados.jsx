import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Turismo.css?v=1.6';
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
            <h1>{t('Associates')}</h1>
          </div>
        </div>
        <br></br>
        <div className="carousel-subheader">
            <h2>{t('Convenios')}</h2>
          </div>
          <br></br><br></br>
        <h5>{t('Convenios1')}</h5>
                <br></br>
        <h5>{t('Convenios2')}</h5>
        <h5>{t('Convenios3')}</h5>
        <h5>{t('Convenios4')}</h5>
        <br></br>
        <h5>{t('Convenios5')}</h5>
        <br></br>
        <div className="carousel-subheader">
            <h2>{t('Convenios6')}</h2>
          </div>
          <br></br><br></br>
          <h5>- Fundación Superación de la Pobreza, Maule.</h5>
          <h5>- Corporación Cultural de San Javier.</h5>
          <h5>- Teatro Regional del Maule.</h5>
          <h5>- Facultad de Música, Arquitectura y Diseño, Universidad de Talca.</h5>
          <h5>- Fundación Guayasamín de Ecuador.</h5>
          <h5>- Corporación Educacional Aldea Rural.</h5>
          <h5>- Parque Cultural Valparaíso.</h5>

      </section>
    </div>
  );
};

export default Zoit;