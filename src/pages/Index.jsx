import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../styles/Index.css';

const Index = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0); // Estado para el slide actual
  const totalSlides = 4; // Número total de slides

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

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
      <header className={`navbar ${showHeader ? 'show' : 'hide'}`}>
        <div className="navbar-links">
          <div className="dropdown">
            <button className="Ir" onClick={toggleDropdown}>
              ¿A dónde ir?
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/ElMelado">El Melado</Link></li>
                <li><Link to="/Paso-pehuenche">Paso Pehuenche</Link></li>
                <li><Link to="/Colbun-alto">Colbún Alto</Link></li>
                <li><Link to="/La-Guardia">La Guardia</Link></li>
                <li><Link to="/Los-Boldos">Los Boldos</Link></li>
                <li><Link to="/Panimavida">Panimávida</Link></li>
                <li><Link to="/Rari">Rari</Link></li>
                <li><Link to="/Quinamavida">Quinamávida</Link></li>
                <li><Link to="/Rabones">Rabones</Link></li>
                <li><Link to="/Los-Bellotos">Los Bellotos</Link></li>
                <li><Link to="/Balneario-Machicura">Balneario Machicura</Link></li>
              </ul>
            )}
          </div>
          <button className="Hacer">¿Qué hacer?</button>
          <button className="Zona">Zona ZOIT</button>
        </div>
        <div className="navbar-auth">
          {/* Botones para cambiar entre español e inglés */}
          <button onClick={() => window.changeLanguage('es')}>ES</button> 
          <button onClick={() => window.changeLanguage('en')}>EN</button>
        </div>
        <div className="navbar-search">
          <button>
            <i className="bi bi-search"></i>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>CONVIERTE A COLBÚN EN TU PRÓXIMA AVENTURA</h1>
          <h2>TE DAMOS LA BIENVENIDA A LA COMUNA</h2>
          <button className="btn-green">Ver ahora</button>
        </div>
      </div>

      {/* Carousel Section */}
      <section className="carousel-section">
        <div className="carousel-header">
          <h5>Admira</h5>
          <div className="carousel-subheader">
            <h2>Belleza Natural</h2>
            <a href="#">Ve más <span>&#8594;</span></a>
          </div>
        </div>

        {/* Carrusel de imágenes */}
        <div className="carousel-container">
          {/* Cards del carrusel */}
          <div className="carousel-card" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            <div className="carousel-image"></div>
            <p>Mirador Las Vizcachas</p>
          </div>
          <div className="carousel-card" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            <div className="carousel-image"></div>
            <p>Parque Nacional Guaquivilo</p>
          </div>
          <div className="carousel-card" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            <div className="carousel-image"></div>
            <p>Cavernas Los Bellotos</p>
          </div>
          <div className="carousel-card" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            <div className="carousel-image"></div>
            <p>Embalse Machicura</p>
          </div>
          <div className="carousel-card" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            <div className="carousel-image"></div>
            <p>Prueba scroll</p>
          </div>
          <div className="carousel-card" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            <div className="carousel-image"></div>
            <p>Prueba 2</p>
          </div>
          <div className="carousel-card" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            <div className="carousel-image"></div>
            <p>Prueba 3</p>
          </div>
        </div>

        {/* Flechas de control */}
        <button className="carousel-control prev" onClick={prevSlide}>&#10094;</button>
        <button className="carousel-control next" onClick={nextSlide}>&#10095;</button>
      </section>


      <section className="community-section">
        <div className="community-content">
          <h1>Acércate más a <br />nuestra comuna</h1>
          <p>
          Servicio País Colbún y la Municipalidad de Colbún comparten sus experiencias transformadoras en las diversas localidades de la comuna. Sumérgete en sus historias, desde la revitalización de espacios públicos hasta proyectos de inclusión social que han mejorado la calidad de vida de los vecinos. Desde talleres educativos en zonas rurales gasta el impulso de emprendimientos locales, descubre cómo el trabajo conjunto ha marcado la diferencia en el corazón de colbún..
          </p>
          <button className="btn-blue">Descubre cómo la colaboración puede transformar comunidades</button>
        </div>
      </section>

      <section className="info-section">
        <div className="info-content">
          <h5>Lugares inolvidables</h5>
          <h1>Algo para no olvidar</h1>
          <p>Descubre la belleza cautivadora de Colbún, donde los tranquilos paisajes rurales se entrelazan con los lagos cristalinos y montañas imponentes que ofrecen una combinación única de naturaleza, aventura al aire libre y un profundo sentido de comunidad. Puedes navegar en las aguas del embalse Machicura, disfrutar de las termas naturales de Panimávida o explorar los senderos que atraviesan los cerros verdes de la región. Colbún te invita a vivir experiencias inolvidables, inmersas en la serenidad y el encanto del corazón de la zona central de Chile.</p>
          <button className="btn-blue">Descubre tu próximo destino</button>
        </div>
      </section>

      <section className="social-section">
        <div className="social-content">
          <h2>¿Cuál será tu próximo destino?</h2>
          <p><strong>Visita Colbún y su gente.</strong> Etiquétanos con <strong>#VisitaColbun</strong>.</p>
          <h3>ENCUÉNTRANOS TAMBIÉN EN</h3>
          <div className="social-icons">
            <i className="bi bi-facebook"></i>
            <i className="bi bi-instagram"></i>
            <i className="bi bi-youtube"></i>
          </div>
        </div>

        <hr className="divider" />

        <div className="help-section">
          <h2>¿Tienes dudas? Nosotros <strong>te ayudamos</strong></h2>
          <div className="help-options">
            <div className="help-item">
              <div className="help-image help-image-1"></div>
              <p><strong>Turismo atiende</strong><br />Agenda tu hora y resuelve dudas</p>
            </div>
            <div className="help-item">
              <div className="help-image help-image-2"></div> 
              <p><strong>Oficinas información turística</strong></p>
            </div>
            <div className="help-item">
              <div className="help-image help-image-3"></div>
              <p><strong>Folletería y mapas</strong></p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-logo">
            <div className="logo logo-1"></div>
            <div className="logo logo-2"></div>
            <div className="logo logo-3"></div>
          </div>

          <div className="footer-column">
            <h3>Visita Colbún</h3>
            <ul>
              <li><a href="#">Sobre Nosotros</a></li>
              <li><a href="#">Asociados</a></li>
              <li><a href="#">Políticas de Privacidad</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Te puede interesar</h3>
            <ul>
              <li><a href="#">Municipalidad de Colbún</a></li>
              <li><a href="#">Chile Travel</a></li>
              <li><a href="#">Chile Cultura</a></li>
              <li><a href="#">Parques nacionales Conaf</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Encuéntranos también en</h3>
            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">YouTube</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
