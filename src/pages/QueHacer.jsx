import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/QueHacer.css?v=1.1';
import Header from '../components/Header';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';

// Importación de imágenes locales
import culturaImage from '../assets/img/Cultural.png';
import senderismoImage from '../assets/img/Senderismo.png';
import parquesImage from '../assets/img/Parque.png';
import vidaSalvajeImage from '../assets/img/Rutas.png';

const Index = () => {

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
            <br></br><br></br>
          <h5>{t('WhatToDo')}</h5>
          <div className="carousel-subheader">
            <h2>{t('NaturalBeauty')}</h2>
          </div>
        </div>

        {/* Carrusel de imágenes */}
        <div className="carousel-container">
          <div className="carousel-card">
            <div className="carousel-image" style={{ backgroundImage: `url(${culturaImage})` }}></div>
            <p>{t('Culture')}</p>
          </div>
          <div className="carousel-card">
            <div className="carousel-image" style={{ backgroundImage: `url(${senderismoImage})` }}></div>
            <p>{t('Hike')}</p>
          </div>
          <div className="carousel-card">
            <div className="carousel-image" style={{ backgroundImage: `url(${parquesImage})` }}></div>
            <p>{t('Parks1')}</p>
          </div>
          <div className="carousel-card">
            <div className="carousel-image" style={{ backgroundImage: `url(${vidaSalvajeImage})` }}></div>
            <p>{t('Parks2')}</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Index;
