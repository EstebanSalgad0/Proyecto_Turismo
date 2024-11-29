import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/QueHacer.css?v=1.1';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';

// Importación de imágenes locales
import culturaImage from '/assets/img/Cultural.png';
import senderismoImage from '/assets/img/Senderismo.png';
import parquesImage from '/assets/img/Parque.png';
import vidaSalvajeImage from '/assets/img/Rutas.png';

const QueHacer = () => {
  const { t, i18n } = useTranslation(); // Hook para usar traducciones

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language'); // Obtener el idioma guardado
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage); // Cambiar el idioma si es necesario
    }
  }, [i18n]); // Añadir el estado del idioma como dependencia

  const slides = [
    { image: culturaImage, label: t('Culture') },
    { image: senderismoImage, label: t('Hike') },
    { image: parquesImage, label: t('Parks1') },
    { image: vidaSalvajeImage, label: t('Parks2') }
  ];

  return (
    <div className="index-container">
      {/* Navbar */}
      <Header />

      {/* Sección de encabezado */}
      <section className="header-section-QH">
        <div className="header-content-QH">
          <h5>{t('WhatToDo')}</h5>
          <h2>{t('NaturalBeauty')}</h2>
        </div>
      </section>

      {/* Cards Section */}
      <section className="cards-section-QH">
        {slides.map((slide, index) => (
          <div key={index} className="card-QH">
            <div
              className="card-image-QH"
              style={{ backgroundImage: `url(${slide.image})` }}
            ></div>
            <p>{slide.label}</p>
          </div>
        ))}
      </section>

      {/* Social Section */}
      <SocialSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default QueHacer;
