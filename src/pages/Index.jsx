import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../styles/Index.css?v=3.4';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import Header from '../components/Header';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(true); // Estado para pausar/reproducir
  const videoRef = useRef(null); // Referencia al iframe del video
  const [currentSlide, setCurrentSlide] = useState(0); // Estado para el slide actual
  const totalSlides = 4; // Número total de slides
  const { t, i18n } = useTranslation(); // Hook para usar traducciones

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language'); // Obtener el idioma guardado
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage); // Cambiar el idioma si es necesario
    }
  }, [i18n.language]); // Añadir el estado del idioma como dependencia

  const toggleVideoPlay = () => {
    // Cambia el estado de reproducción
    if (isPlaying) {
      videoRef.current.src = videoRef.current.src.replace("autoplay=1", "autoplay=0");
    } else {
      videoRef.current.src = videoRef.current.src.replace("autoplay=0", "autoplay=1");
    }
    setIsPlaying(!isPlaying);
  };

  // Función para manejar las flechas
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides); // Si llega al final, vuelve al inicio
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides); // Si está en la primera, va a la última
  };

  // Desliza automáticamente cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000);

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  return (
    <div className="index-container">
      {/* Navbar */}
      <Header />
      {/* Hero Section */}
      <div className="hero2">
        <iframe 
          ref={videoRef}
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/QCvh0Lwfmww?autoplay=1&mute=1&loop=1&playlist=QCvh0Lwfmww&vq=hd720" 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerpolicy="strict-origin-when-cross-origin" 
          allowfullscreen>
        </iframe>
        <div className="hero-content2">
          <h1>{t('ColbunTitle')}</h1>
          <h2>{t('SubtitleMessage')}</h2>
          <a href="https://www.youtube.com/watch?v=QCvh0Lwfmww" target="colbun" rel="municipalidad_Colbun">
          <button className="btn-blue">
          {t('WatchNow')} 
      <img src="src/assets/img/verahora_icon.png" alt="icono de reproducción" className="button-icon" />
    </button>
          </a>
        </div>
        <button className="play-button" onClick={toggleVideoPlay}>
                  {isPlaying ? <i className="bi bi-pause"></i> : <i className="bi bi-play"></i>}
          </button>
      </div>


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
          {/* Cards del carrusel */}
          <div className="carousel-card1" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            <div className="carousel-image1"></div>
            <p>{t('VizcachazViewpoint')}</p>
          </div>
          <div className="carousel-card1" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            <div className="carousel-image1"></div>
            <p>{t('NationalPark')}</p>
          </div>
          <div className="carousel-card1" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            <div className="carousel-image1"></div>
            <p>{t('CavesBellotos')}</p>
          </div>
          <div className="carousel-card1" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            <div className="carousel-image1"></div>
            <p>{t('Reservoir')}</p>
          </div>
          <div className="carousel-card1" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            <div className="carousel-image1"></div>
            <p>{t('Test1')}</p>
          </div>
          <div className="carousel-card1" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            <div className="carousel-image1"></div>
            <p>{t('Test2')}</p>
          </div>
          <div className="carousel-card1" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            <div className="carousel-image1"></div>
            <p>{t('Test3')}</p>
          </div>
        </div>

        {/* Flechas de control */}
        <button className="carousel-control1 prev" onClick={prevSlide}>&#10094;</button>
        <button className="carousel-control1 next" onClick={nextSlide}>&#10095;</button>
      </section>

      <section className="community-section1">
        <div className="community-content1">
          <h1>{t('ComeCloser')}<br />{t('OurCommunity')}</h1>
          <p>
          {t('ColbunServiceCountry')}
          </p>
          <a href="https://www.youtube.com/watch?v=NOi1JxhP8Y4" target="colbun" rel="municipalidad_Colbun">
          <button className="btn-blue">{t('Collaboration')}</button>
          </a>
        </div>
      </section>

      <section className="info-section1">
        <div className="info-content1">
          <h5>{t('UnforgettablePlaces')}</h5>
          <h1>{t('Remember')}</h1>
          <p>{t('ColbunBeauty')}</p>
          <button className="btn-blue">{t('Discover')}</button>
        </div>
      </section>

    </div>
  );
};

export default Index;
