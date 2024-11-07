import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../styles/QueHacer.css?v=1.1';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import Header from '../components/Header';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';
import useCarousel from '../components/useCarousel'; // Hook personalizado para el carrusel

// Importación de imágenes locales
import culturaImage from '../assets/img/Cultural.png';
import senderismoImage from '../assets/img/Senderismo.png';
import parquesImage from '../assets/img/Parque.png';
import vidaSalvajeImage from '../assets/img/Rutas.png';

const QueHacer = () => {
  const { t, i18n } = useTranslation(); // Hook para usar traducciones
  const { currentSlide, nextSlide, prevSlide } = useCarousel(0); // Configuración del carrusel
  const slides = [
    { image: culturaImage, label: t('Culture') },
    { image: senderismoImage, label: t('Hike') },
    { image: parquesImage, label: t('Parks1') },
    { image: vidaSalvajeImage, label: t('Parks2') }
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
      <Header />

      {/* Carousel Section */}
      <section className="carousel-section">
        <div className="carousel-header">
          <br />
          <br />
          <h5>{t('WhatToDo')}</h5>
          <div className="carousel-subheader">
            <h2>{t('NaturalBeauty')}</h2>
          </div>
        </div>

        {/* Carrusel de imágenes */}
        <div className="carousel-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="carousel-card"
              style={{
                transform: `translateX(-${currentSlide * (window.innerWidth <= 768 ? 113 : 130)}%)`
              }}
            >
              <div
                className="carousel-image"
                style={{ backgroundImage: `url(${slide.image})` }}
              ></div>
              <p>{slide.label}</p>
            </div>
          ))}
        </div>

        {/* Flechas de control */}
        <button className="carousel-control prev" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="carousel-control next" onClick={nextSlide}>
          &#10095;
        </button>
      </section>
    </div>
  );
};

export default QueHacer;