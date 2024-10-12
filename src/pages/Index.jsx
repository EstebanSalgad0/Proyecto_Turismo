import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../styles/Index.css?v=3.3';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import Header from '../components/Header';

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(true); // Estado para pausar/reproducir
  const videoRef = useRef(null); // Referencia al iframe del video
  const [currentSlide, setCurrentSlide] = useState(0); // Estado para el slide actual
  const totalSlides = 4; // Número total de slides

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
          <h1>CONVIERTE A COLBÚN EN TU PRÓXIMA AVENTURA</h1>
          <h2>TE DAMOS LA BIENVENIDA A LA COMUNA</h2>
          <a href="https://www.youtube.com/watch?v=QCvh0Lwfmww" target="colbun" rel="municipalidad_Colbun">
          <button className="btn-blue">
      Ver ahora 
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

      <section className="community-section1">
        <div className="community-content1">
          <h1>Acércate más a <br />nuestra comuna</h1>
          <p>
          Servicio País Colbún y la Municipalidad de Colbún comparten sus experiencias transformadoras en las diversas localidades de la comuna. Sumérgete en sus historias, desde la revitalización de espacios públicos hasta proyectos de inclusión social que han mejorado la calidad de vida de los vecinos. Desde talleres educativos en zonas rurales hasta el impulso de emprendimientos locales, descubre cómo el trabajo conjunto ha marcado la diferencia en el corazón de Colbún.
          </p>
          <a href="https://www.youtube.com/watch?v=NOi1JxhP8Y4" target="colbun" rel="municipalidad_Colbun">
          <button className="btn-blue">Descubre cómo la colaboración puede transformar comunidades</button>
          </a>
        </div>
      </section>

      <section className="info-section1">
        <div className="info-content1">
          <h5>Lugares inolvidables</h5>
          <h1>Algo para no olvidar</h1>
          <p>Descubre la belleza cautivadora de Colbún, donde los tranquilos paisajes rurales se entrelazan con los lagos cristalinos y montañas imponentes que ofrecen una combinación única de naturaleza, aventura al aire libre y un profundo sentido de comunidad. Puedes navegar en las aguas del embalse Machicura, disfrutar de las termas naturales de Panimávida o explorar los senderos que atraviesan los cerros verdes de la región. Colbún te invita a vivir experiencias inolvidables, inmersas en la serenidad y el encanto del corazón de la zona central de Chile.</p>
          <button className="btn-blue">Descubre tu próximo destino</button>
        </div>
      </section>

    </div>
  );
};

export default Index;
