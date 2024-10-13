import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Header.css';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activitiesDropdownOpen, setActivitiesDropdownOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [userEmail, setUserEmail] = useState(''); // Estado para almacenar el correo del usuario
  const navigate = useNavigate();

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

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

  // Obtener el correo del usuario desde localStorage
  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
    } else {
      setUserEmail('');
    }
  }, []);

  // Cerrar sesión
  const handleLogout = () => {
    fetch('http://127.0.0.1:8000/logout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          console.log('Sesión cerrada');
          navigate('/login');
        }
      })
      .catch((error) => {
        console.error('Error al cerrar la sesión:', error);
      });
  };

  // Cerrar sesión automáticamente cuando se cierra la ventana
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      fetch('http://127.0.0.1:8000/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }).then((response) => {
        console.log('Sesión cerrada automáticamente');
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <header className={`navbar1 ${showHeader ? 'show' : 'hide'}`}>
      <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <i className="bi bi-list"></i>
      </button>
      <div className={`navbar-links1 ${menuOpen ? 'active' : ''}`}>
        <Link to="/Index" className="header-icon">
          <img src="src/assets/img/icono.png" alt="icono" />
        </Link>
        <div className="dropdown" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
          <div className="button-with-arrow">
            <button className="Ir">¿A dónde ir?</button>
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

        <div className="dropdown" onMouseEnter={() => setActivitiesDropdownOpen(true)} onMouseLeave={() => setActivitiesDropdownOpen(false)}>
          <div className="button-with-arrow">
            <button className="Hacer">¿Qué hacer?</button>
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

        {/* Mostrar el botón de "Panoramas" solo si el correo coincide */}
        {userEmail == 'javiermar2000@gmail.com' && (
          <Link to="/Panoramas">
            <button className="Panoramas">Panoramas</button>
          </Link>
        )}
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

      <div className="dark-mode-toggle">
        <button onClick={toggleDarkMode} className="btn-blue2">
          {darkMode ? (
            <img src="src/assets/img/luna.png" alt="Luna" className="icon-image2" />
          ) : (
            <img src="src/assets/img/sol4.png" alt="Sol" className="icon-image2" />
          )}
        </button>
      </div>

      <div className="navbar-logout">
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </header>
  );
};

export default Header;
