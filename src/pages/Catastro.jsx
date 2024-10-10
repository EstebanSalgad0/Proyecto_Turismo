import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../styles/Turismo.css?v=1.2';
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
          <h5>Se parte del catastro de servicios</h5>
          <div className="carousel-subheader">
            <h1>Catastro de servicios</h1>
          </div>
        </div>
        <br></br>
        <h5>¡Únete al Catastro de Servicios para Artesanas/os, Bienes, Servicios y Cabañas!</h5>
                <br></br>
        <h5>Si eres artesana/o, ofreces productos, servicios o tienes cabañas, esta es tu oportunidad para formar parte de una comunidad que impulsa el desarrollo local. Regístrate en nuestro Catastro de Servicios y da a conocer tu oferta a nivel regional y nacional. Al inscribirte, podrás: </h5>
               <br></br>
        <h5>- Visibilizar tu emprendimiento.</h5>
        <h5>- Conectar con potenciales clientes.</h5>
        <h5>- Formar parte de proyectos y actividades promocionales.</h5>
        <br></br>
        <h5>¡Es rápido, gratuito y sencillo! Completa el formulario y comienza a potenciar tu negocio junto a nosotros. ¡Haz crecer tu emprendimiento siendo parte de este gran directorio comunitario!</h5>
        <br></br>
        <br></br>
        <div className="carousel-subheader">
            <h2>Eres Artesana/o</h2>
          </div>
          <br></br>
          <div className="carousel-subheader">
            <h2>Ofreces Bienes y Servicios</h2>
          </div>
          <br></br>
          <div className="carousel-subheader">
            <h2>Tienes cabañas</h2>
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
      <Footer />
    </div>
  );
};

export default Zoit;