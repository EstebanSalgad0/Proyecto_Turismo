import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Importar useNavigate para redirigir
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Header.css?v=2.0';
import './i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activitiesDropdownOpen, setActivitiesDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false); // Estado para "Servicios"
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú hamburguesa
  const [darkMode, setDarkMode] = useState(false); // Estado para modo oscuro
  const [role, setRole] = useState(''); // Estado para el rol del usuario
  const { t, i18n } = useTranslation(); // Hook para usar traducciones
  const [searchOpen, setSearchOpen] = useState(false); // Estado para controlar la visibilidad de la barra de búsqueda
  const [searchQuery, setSearchQuery] = useState(''); // Estado para almacenar el valor de la búsqueda

  // Estado para el idioma
  const [language, setLanguage] = useState('es');

  const toggleSearch = () => {
    setSearchOpen(!searchOpen); // Alterna la visibilidad de la barra de búsqueda
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Actualiza el valor de la barra de búsqueda
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica para buscar dentro de la página
    console.log('Buscando:', searchQuery);
  };

  // Función para alternar el idioma y guardar preferencia en localStorage
  const toggleLanguage = () => {
    const newLanguage = language === 'es' ? 'en' : 'es';
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const navigate = useNavigate(); // Hook para redirigir

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  // Filtrar contenido en función del término de búsqueda
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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

    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');  // Limpiar el rol del usuario en localStorage
    navigate('/login');
  };

  return (
    <header className={`navbar1 ${showHeader ? 'show' : 'hide'}`}>
      <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <i className="bi bi-list"></i>
      </button>
      <div className={`navbar-links1 ${menuOpen ? 'active' : ''}`}>
        <Link to="/Index" className="header-icon">
          <img src="src/assets/img/icono.png" alt="icono"/>
        </Link>
        <div className="dropdown" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
          <div className="button-with-arrow">
            <button className="Ir">
            {t('WhereToGo')}  {/* Texto traducido dinámicamente */}
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
            {t('WhatToDo')}
            </button>
            <img src="src/assets/img/flecha.png" alt="flecha" className="arrow-icon" />
          </div>
          {activitiesDropdownOpen && (
            <ul className="dropdown-menu">
              <li onMouseEnter={() => showSubMenu('cultura')} onMouseLeave={hideSubMenu}>
                <li>{t('Culture')}</li>
                {activeSubMenu === 'cultura' && (
                  <ul className="dropdown-submenu">
                    <li><Link to="/Cultura2">{t('Petroglyphs')}</Link></li>
                    <li><Link to="/Cultura3">{t('Church')}</Link></li>
                    <li><Link to="/Cultura4">{t('Springs')}</Link></li>
                    <li><Link to="/Cultura">{t('Toba')}</Link></li>
                  </ul>
                )}
              </li>
              <li onMouseEnter={() => showSubMenu('senderismo')} onMouseLeave={hideSubMenu}>
                <li>{t('Hike')}</li>
                {activeSubMenu === 'senderismo' && (
                  <ul className="dropdown-submenu">
                    <li><Link to="/Senderismo">{t('Volcano')}</Link></li>
                    <li><Link to="/Senderismo2">{t('Lagoons')}</Link></li>
                    <li><Link to="/Senderismo3">{t('Caves')}</Link></li>
                    <li><Link to="/Senderismo4">{t('Indian')}</Link></li>
                  </ul>
                )}
              </li>
              <li onMouseEnter={() => showSubMenu('parques')} onMouseLeave={hideSubMenu}>
                <li>{t('Parks')}</li>
                {activeSubMenu === 'parques' && (
                  <ul className="dropdown-submenu">
                    <li><Link to="/Parque">{t('NationalPark')}</Link></li>
                    <li><Link to="/Parque">{t('CavesBellotos')}</Link></li>
                  </ul>
                )}
              </li>
              <li onMouseEnter={() => showSubMenu('vida-salvaje')} onMouseLeave={hideSubMenu}>
                <li>{t('Routes')}</li>
                {activeSubMenu === 'vida-salvaje' && (
                  <ul className="dropdown-submenu">
                    <li><Link to="/Termas">{t('HotSprings')}</Link></li>
                    <li><Link to="/Termas">{t('Reservoir')}</Link></li>
                  </ul>
                )}
              </li>
              <li onMouseEnter={() => showSubMenu('vida-salvaje')} onMouseLeave={hideSubMenu}>
                <li><Link to="/QueHacer">{t('View')}</Link></li>
                {activeSubMenu === 'vida-salvaje' && (
                  <ul className="dropdown-submenu">
                  </ul>
                )}
              </li>
            </ul>
          )}
        </div>

        <Link to="/Zoit">
          <button className="Zona">{t('ZOIT')}</button>
        </Link>

        <Link to="/Panoramas">
          <button className="Panoramas">{t('Panoramas')}</button>
        </Link>


        {/* Agregar botón de Servicios */}
        <div className="dropdown" onMouseEnter={() => setServicesDropdownOpen(true)} onMouseLeave={() => setServicesDropdownOpen(false)}>
          <div className="button-with-arrow">
            <button className="Hacer"> {/* Usamos la misma clase "Hacer" para que el estilo sea el mismo */}
            {t('Services')}
            </button>
            <img src="src/assets/img/flecha.png" alt="flecha" className="arrow-icon" />
        </div>
          {servicesDropdownOpen && (
            <ul className="dropdown-menu">
            {/* Botón de crear servicio visible solo para admin y oferente */}
            {(role === 'admin' || role === 'oferente')&& ( // Solo mostrar el botón desplegable de Servicios si el rol es admin u oferente
            <li>
              <Link to="/crearServicios">{t('CreateService')}</Link>
            </li>
            )}
            <li>
              <Link to="/mostrarServicios">{t('ViewService')}</Link>
            </li>
            {(role === 'admin' || role === 'oferente')&& ( // Solo mostrar el botón desplegable de Servicios si el rol es admin u oferente
            <li>
              <Link to="/editarServicio">{t('EditService')}</Link>
            </li>
            )}
            {(role === 'admin' || role === 'oferente' || role === 'turista')&& (
            <li>
              <Link to="/mostrarServicios">{t('RateServices')}</Link>
            </li>
            )}
            {(role === 'turista')&& (
            <li>
              <Link to="/solicitudOferente">{t('OfferingServices')}</Link>
            </li>
            )}
            {!(role === 'admin' || role === 'oferente' || role === 'turista')&& (
            <li>
              <Link to="/Catastro">{t('bidder')}</Link>
            </li>
            )}
            {!(role === 'admin' || role === 'oferente' || role === 'turista')&& (
            <li>
              <Link to="/Catastro_opiniones">{t('QualifyServices')}</Link>
            </li>
            )}
            {(role === 'admin') && (
            <li>
              <Link to="/manejarSolicitudes">{t('ManageRequests')}</Link>
           </li>
           )}
            {(role === 'admin') && (
            <li>
              <Link to="/manejarServicios">{t('ManageServices')}</Link>
            </li>
            )}
          </ul>
        )}
      </div>
      </div>

      <div className="navbar-auth">
  <button onClick={toggleLanguage} className='btn-blue2'>
    {language === 'es' ? (
      <>
        <span className="language-label1">EN</span>
        <img src="src/assets/img/uk4.png" alt="English" className="icon-image7" />
      </>
    ) : (
      <>
        <span className="language-label">ES</span>
        <img src="src/assets/img/espana.png" alt="Español" className="icon-image6" />
      </>
    )}
  </button>
</div>
<div className="navbar-search">
        <button onClick={toggleSearch}>
          <i className="bi bi-search"></i>
        </button>

        {searchOpen && ( // Mostrar la barra de búsqueda solo si searchOpen es true
          <form onSubmit={handleSearchSubmit} className="search-bar">
            <input
              type="text"
              placeholder={t('¿Que desea buscar?')} // Texto placeholder traducido
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit">
              <i className="bi bi-arrow-right"></i>
            </button>
          </form>
        )}
      </div>

      <div className="dark-mode-toggle">
      <button onClick={toggleDarkMode} className='btn-blue2'>
        {darkMode ? (
          <img src="src/assets/img/sol4.png" alt="Sol" className="icon-image2" />
        ) : (
          <img src="src/assets/img/luna.png" alt="Luna" className="icon-image3" />
        )}
      </button>
    </div>

      {/* Botón de Cerrar Sesión */}
      {(role === 'admin' || role === 'oferente' || role === 'turista') && (
        <button onClick={handleLogout} className="btn-blue2">
          <img src="src/assets/img/logout.png" alt="Logout" className="icon-image4" />
        </button>
      )}

      {/* Botón de Iniciar Sesión */}
      {!(role === 'admin' || role === 'oferente' || role === 'turista') && (
      <Link to="/login">
        <button className="btn-blue2">
          <img src="src/assets/img/login.png" alt="Login" className="icon-image5" />
        </button>
      </Link>
      )}
    </header>
  );
};

export default Header;
