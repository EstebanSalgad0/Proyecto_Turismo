import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Header.css'

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activitiesDropdownOpen, setActivitiesDropdownOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú hamburguesa

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
    <header className={`navbar1 ${showHeader ? 'show' : 'hide'}`}>
      <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <i className="bi bi-list"></i>
      </button>
      <div className={`navbar-links1 ${menuOpen ? 'active' : ''}`}>
        <div className="dropdown" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
          <button className="Ir">¿A dónde ir?</button>
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

        <div className="dropdown" onMouseEnter={() => setActivitiesDropdownOpen(true)} onMouseLeave={() => setActivitiesDropdownOpen(false)}>
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
                  <ul className="dropdown-submenu"></ul>
                )}
              </li>
            </ul>
          )}
        </div>

        <Link to="/Zoit">
          <button className="Zona">Zona ZOIT</button>
        </Link>
      </div>

      <div className="navbar-auth">
        <button onClick={() => window.changeLanguage('es')}>ES/</button>
        <button onClick={() => window.changeLanguage('en')}>EN</button>
      </div>
      <div className="navbar-search">
        <button>
          <i className="bi bi-search"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
