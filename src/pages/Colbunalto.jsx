import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../styles/Colbunalto.css'; // Estilos específicos para el componente
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import Header from '../components/Header';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';
import useCarousel from '../components/useCarousel'; // Hook personalizado para el carrusel

const Colbunalto = () => {
  const { t, i18n } = useTranslation();
  const { currentSlide, nextSlide, prevSlide, totalSlides } = useCarousel(4); // Usa el hook personalizado
  const slideNames = [
    'VizcachazViewpoint',
    'NationalPark',
    'CavesBellotos',
    'Reservoir',
    'LakeColbun',
    'HillViewpoint',
    'ToroWaterfall',
    'AnotherLocation'
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n.language]);

  return (
    <div className="index-container">
      <Header />

      <div className="hero22">
        <div className="hero-content22">
          <h5>{t('WhereToGo')}</h5>
          <h1>Colbun Alto</h1>
          <h4>{t('ColbunInfo')}</h4>
        </div>
      </div>

      <section className="info-section">
        <div className="info-content">
          <h5>{t('UnforgettablePlaces')}</h5>
          <h1>{t('Remember')}</h1>
          <p>{t('ColbunBeauty')}</p>
          <button className="btn-blue">{t('Discover')}</button>
        </div>
      </section>

      <section className="carousel-section1">
        <div className="carousel-header1">
          <h5>{t('Admire')}</h5>
          <div className="carousel-subheader1">
            <h2>{t('NaturalBeauty')}</h2>
            <a href="#">{t('ViewMore')}<span>&#8594;</span></a>
          </div>
        </div>

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

        <button className="carousel-control1 prev" onClick={prevSlide}>&#10094;</button>
        <button className="carousel-control1 next" onClick={nextSlide}>&#10095;</button>
      </section>
    </div>
  );
};

export default Colbunalto;