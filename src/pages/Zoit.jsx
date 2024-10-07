import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../styles/Zoit.css';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';

const Zoit = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activitiesDropdownOpen, setActivitiesDropdownOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

      {/* Carousel Section */}
      <section className="carousel-section">
        <div className="carousel-header">
            <br></br><br></br><br></br>
          <h5>Colbún ZOIT</h5>
          <div className="carousel-subheader">
            <h2>Zona ZOIT</h2>
          </div>
        </div>
        <br></br>
        <h5>La ZOIT Lago Colbún – Rari está conformada por parte de las comunas de San Clemente 
            y Colbún que comparten en sus administraciones las riberas norte y sur del Lago Colbún 
            en la región del Maule. Después de 4 años de gestión ZOIT el destino para su prórroga
             mantendrá la visión de: “Posicionarse como un destino para el turismo de naturaleza,
              aventura, deporte y tradición cultural, basado en el desarrollo turístico
               precordillerano, centrando al Lago Colbún como atractivo principal y 
               eje de su desarrollo, en conjunto con la localidad de Rari; con un reconocimiento nacional
                e internacional”.</h5>
                <br></br>
        <h5>En tanto su misión será: “Impulsar el ordenamiento de la actividad turística, permitiendo
             ir hacia la superación de brechas y un desarrollo sustentable, rescatando las tradiciones
              y la identidad para promover un destino de naturaleza, campo, patrimonio y actividades
               náuticas con una oferta turística atractiva para visitantes nacionales”. </h5>
               <br></br>
        <h5>Sumado a lo anterior, debemos señalar lo siguiente, un número enorme de actividades, 
            ferias y festivales culturales se desarrollan en nuestra comuna anualmente, 
            siempre asociados a nuestra identidad y aquello que más hace distinguir a cada
             comunidad local, pasando por el Crin, el Telar, las carretas, las Esquilas, Fiestas
              Religiosas entre otras, y que son de renombre nacional. Muestra Nacional de Artesanía
               y Folclore Panimávida, la Fiesta de la Esquila, La noche de San Juan (única fiesta
                de invierno en la región), Chancho al Humo, Fiesta del Crin, San Sebastián 
                (reconocida actividad nacional), entre muchas otras, donde se tiene un público 
                que dobla normalmente al total de la Población Comunal.</h5>


        
      </section>

      <SocialSection />
      <Footer />
    </div>
  );
};

export default Zoit;
