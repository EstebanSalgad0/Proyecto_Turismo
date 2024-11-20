import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../styles/Turismo.css?v=1.4';
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
          <h5>{t('ServiceCadastre')}</h5>
          <div className="carousel-subheader">
            <h1>{t('CadastreService')}</h1>
          </div>
        </div>
        <br></br>
        <h5>{t('JoinService')}</h5>
                <br></br>
        <h5>{t('Artisan')}</h5>
               <br></br>
        <h5>{t('Business')}</h5>
        <h5>{t('Connect')}</h5>
        <h5>{t('Promotional')}</h5>
        <br></br>
        <h5>{t('Fast')}</h5>
        <br></br>
        <br></br>
        <div className="carousel-subheader">
          </div>
          <br></br>
          <div className="carousel-header">
  <h2>
    <Link to="/registrarse">{t('ArtisanRegister')}</Link>
  </h2>
</div>
<br />
<div className="carousel-header">
  <h2>
    <Link to="/registrarse">{t('BusinessRegister')}</Link>
  </h2>
</div>
<br />
<div className="carousel-header">
  <h2>
    <Link to="/registrarse">{t('CabinsRegister')}</Link>
  </h2>
</div>
        
      </section>
    </div>
  );
};

export default Zoit;