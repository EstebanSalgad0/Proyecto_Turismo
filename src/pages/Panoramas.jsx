import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../styles/Panoramas.css?v=1.5' // Estilos específicos para el componente
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import Header from '../components/Header';

const Panoramas = () => {

  const [currentSlide, setCurrentSlide] = useState(0); // Estado para el slide actual
  const totalSlides = 4; // Número total de slides

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
      <Header/>

      {/* Hero Section */}
      <div className="hero100">
        <div className="hero-content100">
          <h5>Panoramas</h5>
          <h1>Eventos y Celebraciones Locales</h1>
          <h4>La comuna de Colbún, se caracteriza por una rica tradición cultural y un vibrante calendario de actividades que destacan a lo largo del año. Estos eventos, llenos de historia y costumbres, unen a los habitantes de la comuna y atraen a visitantes de todo el país.</h4>
        </div>
      </div>

      <br></br>
      <div className="carousel-subheader2">
            <h1>Lo más destacado de nuestros  próximos eventos y actividades</h1>
          </div>

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

            
      {/* Carousel Section */}
      <section className="carousel-section1">
        <div className="carousel-header1">
          <h5>Admira</h5>
          <div className="carousel-subheader1">
            <h2>Belleza Natural</h2>
            <a href="#">Ve más <span>&#8594;</span></a>
          </div>
        </div>

        {/* Carrusel de imágenes */}
        <div className="carousel-container1">
          {/* Cards del carrusel */}
          <div className="carousel-card1" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            <div className="carousel-image1"></div>
            <p>Mirador Las Vizcachas</p>
          </div>
          <div className="carousel-card1" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            <div className="carousel-image1"></div>
            <p>Parque Nacional Guaquivilo</p>
          </div>
          <div className="carousel-card1" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            <div className="carousel-image1"></div>
            <p>Cavernas Los Bellotos</p>
          </div>
          <div className="carousel-card1" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            <div className="carousel-image1"></div>
            <p>Embalse Machicura</p>
          </div>
          <div className="carousel-card1" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            <div className="carousel-image1"></div>
            <p>Prueba scroll</p>
          </div>
          <div className="carousel-card1" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            <div className="carousel-image1"></div>
            <p>Prueba 2</p>
          </div>
          <div className="carousel-card1" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            <div className="carousel-image1"></div>
            <p>Prueba 3</p>
          </div>
        </div>

        {/* Flechas de control */}
        <button className="carousel-control1 prev" onClick={prevSlide}>&#10094;</button>
        <button className="carousel-control1 next" onClick={nextSlide}>&#10095;</button>
      </section>
      
    </div>
  );
};

export default Panoramas;