import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../styles/Turismo.css?v=1.3';
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
            <h1>Politicas de Privacidad</h1>
          </div>
        </div>
        <br></br><br></br>
        <h5>Lorem ipsum dolor sit amet consectetur. Leo laoreet nunc at pharetra at morbi consectetur integer. Vel mattis felis viverra pharetra amet pellentesque. Ut id vitae scelerisque orci varius. Ultricies ipsum elementum dui at auctor libero. Scelerisque lacus dictum fusce volutpat pulvinar vel condimentum sit placerat. Eleifend volutpat magna ac ante vel enim nisi bibendum.
Sem a vel sapien purus viverra. Id lacus eget sodales velit massa rhoncus potenti mattis eu. Ullamcorper congue porttitor risus felis convallis. Sed neque sed mauris urna. Eget egestas eget est venenatis dolor sit. Diam id enim netus amet. Arcu dictum nulla neque lacus felis cras sem pulvinar. Pellentesque libero aenean porta elementum. Vitae proin pellentesque nibh nibh. Amet sit sit mi vitae quam bibendum sit. Ut amet integer urna malesuada dictumst at.
Consequat dictum turpis purus venenatis est elit vel orci. Turpis in augue blandit amet. Facilisis ut turpis nibh erat sed. Dui sed tortor sit mauris eget leo facilisi odio tincidunt. Lorem sollicitudin venenatis nec ornare. Massa eu amet sed blandit magna semper quam. Sit habitant cras at posuere sapien aliquam. Pretium tortor id accumsan a tincidunt parturient. Est quam felis pretium praesent quisque. Nibh sit at ut gravida. Euismod velit tellus ultrices magna turpis urna facilisi dolor. Risus purus fringilla facilisi vitae nisl in integer. Lacus consectetur lobortis velit nulla in senectus nisl nisl ut. Pellentesque ut pellentesque amet sed aliquet amet posuere enim. Et turpis posuere risus amet etiam habitasse velit facilisi interdum.
Consectetur maecenas nec ut est viverra cras et non integer. Amet molestie ac tellus erat magna at. Eu viverra mi et eros sit at viverra at faucibus. Cras neque molestie tristique tincidunt posuere tortor convallis est. Magna sed neque maecenas eu faucibus aliquam curabitur purus id.
Nisl donec turpis netus tortor nibh volutpat id orci. Vulputate venenatis ut pharetra vel. Mi non semper convallis mattis diam ac tempus semper. Feugiat semper aliquam pretium nunc. Egestas condimentum a enim sit nisl lacinia. Suscipit porta nibh viverra gravida amet ultrices.
Quis lorem molestie lectus in quam. Ut et eget arcu blandit nunc tincidunt ut. Id semper mauris eu integer.</h5>
                <br></br>


        
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