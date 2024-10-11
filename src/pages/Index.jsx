import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../styles/Index.css?v=4.0';
import Footer from './Footer';


const Index = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activitiesDropdownOpen, setActivitiesDropdownOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true); // Estado para pausar/reproducir
  const videoRef = useRef(null); // Referencia al iframe del video
  const [currentSlide, setCurrentSlide] = useState(0); // Estado para el slide actual
  const totalSlides = 4; // Número total de slides
  const [darkMode, setDarkMode] = useState(false); // Estado para modo oscuro

  const toggleActivitiesDropdown = () => {
    setActivitiesDropdownOpen(!activitiesDropdownOpen);
  };

  const showSubMenu = (menu) => {
    setActiveSubMenu(menu);
  };

  const hideSubMenu = () => {
    setActiveSubMenu(null);
  };

  const toggleVideoPlay = () => {
    // Cambia el estado de reproducción
    if (isPlaying) {
      videoRef.current.src = videoRef.current.src.replace("autoplay=1", "autoplay=0");
    } else {
      videoRef.current.src = videoRef.current.src.replace("autoplay=0", "autoplay=1");
    }
    setIsPlaying(!isPlaying);
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

  // Alternar modo oscuro y guardar en localStorage
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  // Leer la preferencia guardada en localStorage cuando el componente cargue
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    if (savedMode) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <div className={`index-container ${darkMode ? 'dark' : ''}`}>
      {/* Navbar */}
      <header className={`navbar1 ${showHeader ? 'show' : 'hide'}`}>
        <div className="navbar-links1">
        <Link to="/Index" className="header-icon">
        <img src="src/assets/img/icono.png" alt="icono"/>
        </Link>
          <div className="dropdown" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
          <div className="button-with-arrow">
          <button className="Ir">
            ¿A dónde ir?
          </button>
          <img src="src/assets/img/flecha.png" alt="flecha" className="arrow-icon" />
          </div>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/ElMelado">El Melado</Link></li>
                <li><Link to="/Paso-pehuenche">Paso Pehuenche</Link></li>
                <li><Link to="/Colbun">Colbún</Link></li>
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

          <div className="dropdown" onMouseEnter={()=>setActivitiesDropdownOpen(true)} onMouseLeave={()=>setActivitiesDropdownOpen(false)}>
          <div className="button-with-arrow">
          <button className="Hacer">
            ¿Qué hacer?
          </button>
          <img src="src/assets/img/flecha.png" alt="flecha" className="arrow-icon" />
        </div>
            {activitiesDropdownOpen && (
              <ul className="dropdown-menu">
                <li onMouseEnter={() => showSubMenu('cultura')} onMouseLeave={hideSubMenu}>
                <li>Cultura y sitios históricos</li>
                  {activeSubMenu === 'cultura' && (
                    <ul className="dropdown-submenu">
                      <li><Link to="/Cultura2">Petroglifos</Link></li>
                      <li><Link to="/Cultura3">Iglesia de Panimavida</Link></li>
                      <li><Link to="/Cultura4">Termas de Panimavida</Link></li>
                      <li><Link to="/Cultura">Piedra Toba</Link></li>
                    </ul>
                  )}
                </li>
                <li onMouseEnter={() => showSubMenu('senderismo')} onMouseLeave={hideSubMenu}>
                <li>Senderismo</li>
                  {activeSubMenu === 'senderismo' && (
                    <ul className="dropdown-submenu">
                      <li><Link to="/Senderismo">Volcán San Pedro y San Pablo</Link></li>
                      <li><Link to="/Senderismo2">Lagunas Verdes</Link></li>
                      <li><Link to="/Senderismo3">Las Cuevas</Link></li>
                      <li><Link to="/Senderismo4">Piedra del Indio</Link></li>
                    </ul>
                  )}
                </li>
                <li onMouseEnter={() => showSubMenu('parques')} onMouseLeave={hideSubMenu}>
                <li>Parques y vida salvaje</li>
                  {activeSubMenu === 'parques' && (
                    <ul className="dropdown-submenu">
                      <li><Link to="/Parque">Parque nacional Guaiquivilo</Link></li>
                      <li><Link to="/Parque">Cavernas Los Bellotos</Link></li>
                    </ul>
                  )}
                </li>
                <li onMouseEnter={() => showSubMenu('vida-salvaje')} onMouseLeave={hideSubMenu}>
                <li>Rutas</li>
                  {activeSubMenu === 'vida-salvaje' && (
                    <ul className="dropdown-submenu">
                      <li><Link to="/Termas">Termas</Link></li>
                      <li><Link to="/Termas">Embalse Machicura</Link></li>
                    </ul>
                  )}
                </li>
                <li onMouseEnter={() => showSubMenu('vida-salvaje')} onMouseLeave={hideSubMenu}>
                <li><Link to="/QueHacer">Ver Todo</Link></li>
                  {activeSubMenu === 'vida-salvaje' && (
                    <ul className="dropdown-submenu">
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </div>

          <Link to="/Zoit">
        <button className="Zona">Zona ZOIT</button>
        </Link>

        {/* Agregar botón de Panoramas */}
        <Link to="/Panoramas">
          <button className="Panoramas">Panoramas</button>
        </Link>

        
          
        </div>
        <div className="navbar-auth">
          {/* Botones para cambiar entre español e inglés */}
          <button onClick={() => window.changeLanguage('es')}>ES/</button> 
          <button onClick={() => window.changeLanguage('en')}>EN</button>
        </div>
        <div className="navbar-search">
          <button>
            <i className="bi bi-search"></i>
          </button>
        </div>
        {/* Botón de Modo Oscuro */}
        <div className="dark-mode-toggle">
          <button onClick={toggleDarkMode}>
            {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
          </button>
        </div>
      </header>

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
      <button className="btn-blue">Ver ahora</button>
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

      <section className="social-section1">
        <div className="social-content1">
          <h2>¿Cuál será tu próximo destino?</h2>
          <p><strong>Visita Colbún y su gente.</strong> Etiquétanos con <strong>#VisitaColbun</strong>.</p>
          <h3>ENCUÉNTRANOS TAMBIÉN EN</h3>
          <div className="social-icons2">
          <a href="https://web.facebook.com/p/Municipalidad-de-Colb%C3%BAn-100064570487351/?locale=es_LA&_rdc=1&_rdr" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="https://www.instagram.com/municipalidad_colbun/?hl=es" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="https://www.youtube.com/@municipalidadcolbun9532" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-youtube"></i>
          </a>
        </div>
        </div>

        <hr className="divider" />

        <div className="help-section">
          <h2>¿Tienes dudas? Nosotros <strong>te ayudamos</strong></h2>
          <div className="help-options">
          <a href="/Turismo" className="help-item">
            <div className="help-image help-image-1"></div>
          <p><strong>Turismo atiende</strong><br />Agenda tu hora y resuelve dudas</p>
          </a>
          <a href="/OIT" className="help-item">
            <div className="help-image help-image-2"></div>
          <p><strong>Oficinas información turística</strong></p>
          </a>
          <a href="/Folleteria" className="help-item">
            <div className="help-image help-image-3"></div>
            <p><strong>Folletería y mapas</strong></p>
          </a>
        </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
