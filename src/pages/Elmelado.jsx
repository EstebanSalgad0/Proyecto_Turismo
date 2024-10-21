import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../styles/Elmelado.css?v=1.3'; // Estilos específicos para el componente
import Footer from '../components/Footer'; 
import SocialSection from '../components/SocialSeccion';
import Header from '../components/Header';

const Elmelado = () => {
  const [currentSlide, setCurrentSlide] = useState(0); // Estado para el slide actual
  const [isFirstMap, setIsFirstMap] = useState(true); // Estado para alternar entre los mapas
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

  // Función para alternar entre los mapas
  const toggleMap = () => {
    setIsFirstMap(!isFirstMap);
  };

  return (
    <div className="index-container">
      {/* Navbar */}
      <Header />

      {/* Hero Section */}
      <div className="hero0">
        <div className="hero-content0">
          <h5>¿A donde ir?</h5>
          <h1>El Melado</h1>
          <h4>El Melado es una pintoresca localidad ubicada en la comuna de Colbún, en la región del Maule, Chile. Este lugar se destaca por su entorno natural, rodeado de montañas, ríos y exuberante vegetación, que lo convierten en un destino ideal para los amantes de la naturaleza y el ecoturismo. El Melado es conocido por el embalse del mismo nombre, una impresionante obra de ingeniería que abastece de agua a la zona y se utiliza para la generación de energía hidroeléctrica. Además, sus paisajes son perfectos para actividades como el senderismo, la pesca y el avistamiento de flora y fauna autóctona, ofreciendo una experiencia única en contacto con la tranquilidad de la cordillera.</h4>
        </div>
      </div>

      <div className="info-section1">
        {/* Map Section */}
        <section className="map-section">
          <iframe
            src={
              isFirstMap
                ? "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d415033.130862824!2d-71.74579409824344!3d-35.64137348183942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x9665c6a2ac07d07d%3A0x265657feafdac8b8!2sTalca!3m2!1d-35.4231882!2d-71.6496958!4m5!1s0x966f81458061102b%3A0xfaef80513d7f4f98!2sEl%20Melado%20Lodge%20-%20Alto%20Ancoa%2C%20Colb%C3%BAn%2C%20Maule!3m2!1d-35.8618603!2d-71.123295!5e0!3m2!1ses!2scl!4v1729200348270!5m2!1ses!2scl"
                : "https://www.google.com/maps/embed?pb=!4v1729508776865!6m8!1m7!1sCAoSLEFGMVFpcE52eG9fOUs1ZkRac2VzYnNNQ3hsYnBpOWFOdnJpcUFUU0VSazhv!2m2!1d-35.87360339666832!2d-71.11635919023739!3f166.054998459084!4f12.54037435121353!5f0.7820865974627469"
            }
            width="100%"
            height="1200"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </section>

        {/* Existing Content Section */}
        <section className="info-content">
          <h5>Lugares inolvidables</h5>
          <h1>Algo para no olvidar</h1>
          <p>Descubre la belleza cautivadora de Colbún, donde los tranquilos paisajes rurales se entrelazan con los lagos cristalinos y montañas imponentes que ofrecen una combinación única de naturaleza, aventura al aire libre y un profundo sentido de comunidad. Puedes navegar en las aguas del embalse Machicura, disfrutar de las termas naturales de Panimávida o explorar los senderos que atraviesan los cerros verdes de la región. Colbún te invita a vivir experiencias inolvidables, inmersas en la serenidad y el encanto del corazón de la zona central de Chile.</p>
          {/* Contenedor para alinear los botones */}
          <div className="button-group">
            <button className="btn-blue" onClick={() => window.open("https://maps.app.goo.gl/GZSD4dNAL8uKZx1N6", "_blank")}>
              Descubre tu próximo destino
            </button>
            {/* Botón pequeño para cambiar entre los mapas */}
            <button className="btn-blue2" onClick={toggleMap}>
            <i className="bi bi-geo-alt"></i>
            </button>
          </div>
        </section>
      </div>

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
          <div className="carousel-card1" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            <div className="carousel-image1"></div>
            <p>Mirador Las Vizcachas</p>
          </div>
        </div>

        {/* Flechas de control */}
        <button className="carousel-control1 prev" onClick={prevSlide}>&#10094;</button>
        <button className="carousel-control1 next" onClick={nextSlide}>&#10095;</button>
      </section>
    </div>
  );
};

export default Elmelado;
