import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../styles/Cultura3.css?v=1.4'; // Estilos específicos para el componente
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import Header from '../components/Header';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';
import useCarousel from '../components/useCarousel'; // Hook personalizado para el carrusel

const Cultura4 = () => {
  const { t, i18n } = useTranslation();
  const { currentSlide, nextSlide, prevSlide, totalSlides } = useCarousel(0); // Configurado para 7 slides
  const slideNames = [
    'VizcachazViewpoint',
    'NationalPark',
    'CavesBellotos',
    'Reservoir',
    'Test1',
    'Test2',
    'Test3'
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language'); // Obtener el idioma guardado
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage); // Cambiar el idioma si es necesario
    }
  }, [i18n.language]); // Añadir el estado del idioma como dependencia

  return (
    <div className="index-container">
      {/* Navbar */}
      <Header/>

      {/* Hero Section 1 */}
      <div className="hero30">
        <div className="hero-content30">
          <h5>{t('Culture')}</h5>
          <h1>{t('Church')}</h1>
          <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</h4>
        </div>
      </div>

      {/* Info Section */}
      <section className="info-section">
        <div className="info-content">
          <h5>{t('UnforgettablePlaces')}</h5>
          <h1>{t('Remember')}</h1>
          <p>{t('ColbunBeauty')}</p>
          <button className="btn-blue">{t('Discover')}</button>
        </div>
      </section>

      {/* Hero Section 2 */}
      <div className="hero31">
        <div className="hero-content31">
          <h5>{t('Culture')}</h5>
          <h1>Las Tacitas</h1>
          <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</h4>
        </div>
      </div>

      {/* Info Section */}
      <section className="info-section">
        <div className="info-content">
          <h5>{t('UnforgettablePlaces')}</h5>
          <h1>{t('Remember')}</h1>
          <p>{t('ColbunBeauty')}</p>
          <button className="btn-blue">{t('Discover')}</button>
        </div>
      </section>

      {/* Hero Section 3 */}
      <div className="hero32">
        <div className="hero-content32">
          <h5>{t('Culture')}</h5>
          <h1>{t('Bottling')}</h1>
          <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</h4>
        </div>
      </div>

      {/* Info Section */}
      <section className="info-section">
        <div className="info-content">
          <h5>{t('UnforgettablePlaces')}</h5>
          <h1>{t('Remember')}</h1>
          <p>{t('ColbunBeauty')}</p>
          <button className="btn-blue">{t('Discover')}</button>
        </div>
      </section>

      {/* Hero Section 4 */}
      <div className="hero33">
        <div className="hero-content33">
          <h5>{t('Culture')}</h5>
          <h1>{t('Train1')}</h1>
          <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</h4>
        </div>
      </div>

      {/* Info Section */}
      <section className="info-section">
        <div className="info-content">
          <h5>{t('UnforgettablePlaces')}</h5>
          <h1>{t('Remember')}</h1>
          <p>{t('ColbunBeauty')}</p>
          <button className="btn-blue">{t('Discover')}</button>
        </div>
      </section>
            
      {/* Carousel Section */}
      <section className="carousel-section1">
        <div className="carousel-header1">
          <h5>{t('Admire')}</h5>
          <div className="carousel-subheader1">
            <h2>{t('NaturalBeauty')}</h2>
            <a href="#">{t('ViewMore')}<span>&#8594;</span></a>
          </div>
        </div>

        {/* Carrusel de imágenes */}
        <div className="carousel-container1">
          {slideNames.map((slideName, index) => (
            <div
              key={index}
              className="carousel-card1"
              style={{
                transform: `translateX(-${currentSlide * (window.innerWidth <= 768 ? 113 : 130)}%)`
              }}
            >
              <div className="carousel-image1"></div>
              <p>{t(slideName)}</p>
            </div>
          ))}
        </div>

        {/* Flechas de control */}
        <button className="carousel-control1 prev" onClick={prevSlide}>&#10094;</button>
        <button className="carousel-control1 next" onClick={nextSlide}>&#10095;</button>
      </section>
    </div>
  );
};

export default Cultura4;