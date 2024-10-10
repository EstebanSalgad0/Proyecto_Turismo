import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../styles/SobreNosotros.css?v=1.2';
import Footer from './Footer';

const Zoit = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activitiesDropdownOpen, setActivitiesDropdownOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [darkMode, setDarkMode] = useState(false); // Estado para modo oscuro

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleActivitiesDropdown = () => {
    setActivitiesDropdownOpen(!activitiesDropdownOpen);
  };

  const showSubMenu = (menu) => {
    setActiveSubMenu(menu);
  };

  const hideSubMenu = () => {
    setActiveSubMenu(null);
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
      <header className={`navbar ${showHeader ? 'show' : 'hide'}`}>
        <div className="navbar-links">
        <Link to="/Index" className="header-icon">
        <img src="src/assets/img/icono.png" alt="icono"/>
        </Link>
          <div className="dropdown">
            <button className="Ir" onClick={toggleDropdown}>
              ¿A dónde ir?
            </button>
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

          <div className="dropdown">
            <button className="Hacer" onClick={toggleActivitiesDropdown}>
              ¿Qué hacer?
            </button>
            {activitiesDropdownOpen && (
              <ul className="dropdown-menu">
                <li onMouseEnter={() => showSubMenu('cultura')} onMouseLeave={hideSubMenu}>
                <li>Cultura y sitios históricos</li>
                  {activeSubMenu === 'cultura' && (
                    <ul className="dropdown-submenu">
                      <li><Link to="/Cultura">Petroglifos, El Melado</Link></li>
                    </ul>
                  )}
                </li>
                <li onMouseEnter={() => showSubMenu('senderismo')} onMouseLeave={hideSubMenu}>
                <li>Senderismo</li>
                  {activeSubMenu === 'senderismo' && (
                    <ul className="dropdown-submenu">
                      <li><Link to="/Senderismo#volcan">Volcán San Pedro y San Pablo</Link></li>
                      <li><Link to="/Senderismo#mirador">Mirador las vizcachas</Link></li>
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

      {/* Carousel Section */}
      <section className="carousel-section">
        <div className="carousel-header">
            <br></br><br></br><br></br><br></br>
          <h5>Visita Colbún</h5>
          <div className="carousel-subheader">
            <h1>Sobre Nosotros</h1>
          </div>
        </div>
        <br></br>
        <h5>En el Área de Cultura y Turismo de nuestra comuna, 
            trabajamos con el objetivo de potenciar y desarrollar 
            dos aspectos fundamentales de nuestro territorio: la cultura 
            y el turismo, áreas que destacan por su enorme riqueza natural,
             histórica y tradicional. </h5>
                <br></br>
                <div className="carousel-subheader">
            <h2>Turismo</h2>
          </div>
          <br></br><br></br>
        <h5>Desde el 18 de abril de 2017, con la creación del Departamento de Turismo Municipal, nos enfocamos en posicionar la actividad turística como un pilar clave para el desarrollo económico local. Nuestra misión es trabajar de la mano con el sector público y privado para impulsar el destino “Colbún” como una marca reconocida a nivel local, nacional e internacional. Nos comprometemos a proteger y promover de manera sustentable nuestros recursos naturales y arqueológicos de interés turístico, asegurando su conservación para las generaciones futuras. </h5>
        <br></br>
        <h5>Nos dedicamos a gestionar de forma responsable las zonas de interés turístico, como la Zona de Interés Turístico (ZOIT) Lago Colbún Rari, declarada en 2016. Asimismo, cumplimos con las normativas municipales y realizamos campañas de promoción y marketing turístico, posicionando a nuestra comuna como un destino preferente. </h5>
               <br></br>
               <div className="carousel-subheader">
            <h2>Cultura</h2>
          </div>
          <br></br><br></br>
        <h5>En el ámbito cultural, nos esforzamos por desarrollar espacios que fomenten la creatividad y el arte local. A través del trabajo con actores y comunidades locales, brindamos apoyo para que puedan asociarse y potenciar sus proyectos culturales. También gestionamos recursos municipales, públicos y privados con el fin de fortalecer el desarrollo cultural de nuestra comuna. </h5>
        <br></br>
        <h5>Apoyamos las actividades culturales de otras áreas municipales como educación, salud, desarrollo comunitario y económico local, y promovemos la participación ciudadana en eventos y celebraciones tradicionales que reflejan la identidad cultural de nuestra comuna. </h5>
        <br></br>
        <h5>Uno de nuestros mayores logros ha sido la creación de la Corporación Municipal de Cultura en 2017, cuyo propósito es consolidar el desarrollo cultural de la comuna. Además, estamos construyendo nuestro Primer Plan Municipal de Cultura, que ha sido financiado a través del Fondo de Fortalecimiento de la Gestión Cultural Local 2017, lo que constituye un hito en la historia de nuestra comunidad. </h5>
        <br></br>
        <h5>En el Área de Cultura y Turismo, estamos comprometidos con el desarrollo sostenible, la protección de nuestro patrimonio y el fomento de la identidad local, trabajando incansablemente para que nuestra comuna siga brillando como un destino cultural y turístico.</h5>


        
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
      <Footer />
    </div>
  );
};

export default Zoit;