import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importar useNavigate para redirigir
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/Header.css?v=3.2";
import ConfirmModal from "./ModalDelete"; // Asegúrate de importar el modal correctamente
import "./i18n"; // Importa el archivo de configuración
import { useTranslation } from "react-i18next";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activitiesDropdownOpen, setActivitiesDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false); // Estado para "Servicios"
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [showHeader, setShowHeader] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Estado para mostrar el modal de confirmación
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú hamburguesa
  const [darkMode, setDarkMode] = useState(false); // Estado para modo oscuro
  const [role, setRole] = useState(""); // Estado para el rol del usuario
  const { t, i18n } = useTranslation(); // Hook para usar traducciones
  const [searchOpen, setSearchOpen] = useState(false); // Estado para controlar la visibilidad de la barra de búsqueda
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para almacenar el valor de la búsqueda
  const [dropdownIconsOpen, setDropdownIconsOpen] = useState(false);
  const [language, setLanguage] = useState("es");
  
  

  const toggleSearch = () => {
    setSearchOpen(!searchOpen); // Alterna la visibilidad de la barra de búsqueda
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      const results = pages.filter((page) =>
        page.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      navigate(searchResults[0].path);
      setSearchOpen(false);
    }
  };

  // Lista de vistas disponibles con sus nombres y rutas
  const pages = [
    { name: "El Melado", path: "/ElMelado" },
    { name: "Pehuenche", path: "/Paso-pehuenche" },
    { name: "Colbún", path: "/Colbun" },
    { name: "Colbún Alto", path: "/Colbun-alto" },
    { name: "Asociados", path: "/Asociados" },
    { name: "Balnearios", path: "/Balnearios" },
    { name: "Lago Colbún", path: "/LagoColbun" },
    { name: "Petroglifos", path: "/Cultura2" },
    { name: "Iglesia de Panimavida", path: "/Cultura3" },
    { name: "Termas de Panimavida", path: "/Cultura4" },
    { name: "Piedra Toba", path: "/Cultura" },
    { name: "La Guardia", path: "/Laguardia" },
    { name: "Los Bellotos", path: "/Losbellotos" },
    { name: "Los boldos", path: "/Losboldos" },
    { name: "OIT", path: "/OIT" },
    { name: "Panimavida", path: "/Panimavida" },
    { name: "Panoramas", path: "/Panoramas" },
    { name: "Parques nacionales", path: "/Parque" },
    { name: "Politicas de Privacidad", path: "/Privacidad" },
    { name: "Quinamavida", path: "/Quinamavida" },
    { name: "Rabones", path: "/Rabones" },
    { name: "Rari", path: "/Rari" },
    { name: "Volcan San Pedro y San Pablo", path: "/Senderismo" },
    { name: "Lagunas Verdes", path: "/Senderismo2" },
    { name: "Las Cuevas", path: "/Senderismo3" },
    { name: "Piedra del Indio", path: "/Senderismo4" },
    { name: "Termas", path: "/Termas" },
    { name: "Sobre Nosotros", path: "/SobreNosotros" },
    { name: "Zona ZOIT", path: "/Zoit" },
    { name: "Registrarse Oferente", path: "/registrarse" },
    { name: "Iniciar Sesión", path: "/login" },
    { name: "Ver Servicios", path: "/mostrarServicios" },
    { name: "Turismo Atiende", path: "/Turismo" },
    { name: "Folletería y Mapas", path: "/Folleteria" },
    // Agrega aquí todas las demás vistas como objetos con `name` y `path`
  ];

  // Redirige al hacer clic en un resultado de búsqueda
  const handleResultClick = (path) => {
    navigate(path);
    setSearchOpen(false);
  };

  // Función para alternar el idioma y guardar preferencia en localStorage
  const toggleLanguage = () => {
    const newLanguage = language === "es" ? "en" : "es";
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const navigate = useNavigate(); // Hook para redirigir

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

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

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Alternar modo oscuro y guardar en localStorage
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  // Leer la preferencia guardada en localStorage cuando el componente cargue
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    if (savedMode) {
      document.body.classList.add("dark-mode");
    }

    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole"); // Limpiar el rol del usuario en localStorage
    navigate("/login");
  };

  // Función para abrir el modal de confirmación
  const confirmLogout = () => {
    setShowLogoutModal(true);
  };

  // Función para cancelar el cierre de sesión
  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const toggleDropdownIcons = () => {
    setDropdownIconsOpen(!dropdownIconsOpen);
  };

  return (
    <header className={`navbar1 ${showHeader ? "show" : "hide"}`}>
      <div className="header-left">
        <Link to="/" className="header-icon">
          <img src="/assets/img/visita_colbun.svg" alt="icono" />
        </Link>

        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className="bi bi-list"></i>
        </button>
      </div>

      <div className={`navbar-links1 ${menuOpen ? "active" : ""}`}>
        <div
          className="dropdown"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <div className="button-with-arrow">
            <button className="Ir">
              {t("WhereToGo")} {/* Texto traducido dinámicamente */}
            </button>
            <img
              src="/assets/img/flecha.png"
              alt="flecha"
              className="arrow-icon"
            />
          </div>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/ElMelado">El Melado</Link>
              </li>
              <li>
                <Link to="/Paso-pehuenche">Pehuenche</Link>
              </li>
              <li>
                <Link to="/Colbun">Colbún</Link>
              </li>
              <li>
                <Link to="/Colbun-alto">Colbún Alto</Link>
              </li>
              <li>
                <Link to="/LagoColbun">Lago Colbún</Link>
              </li>
              <li>
                <Link to="/La-Guardia">La Guardia</Link>
              </li>
              <li>
                <Link to="/Los-Boldos">Los Boldos</Link>
              </li>
              <li>
                <Link to="/Panimavida">Panimávida</Link>
              </li>
              <li>
                <Link to="/Rari">Rari</Link>
              </li>
              <li>
                <Link to="/Quinamavida">Quinamávida</Link>
              </li>
              <li>
                <Link to="/Rabones">Rabones</Link>
              </li>
              <li>
                <Link to="/Los-Bellotos">Los Bellotos</Link>
              </li>
              <li>
                <Link to="/Balneario-Machicura">Balneario Machicura</Link>
              </li>
            </ul>
          )}
        </div>

        <div
          className="dropdown"
          onMouseEnter={() => setActivitiesDropdownOpen(true)}
          onMouseLeave={() => setActivitiesDropdownOpen(false)}
        >
          <div className="button-with-arrow">
            <button className="Hacer">{t("WhatToDo")}</button>
            <img
              src="/assets/img/flecha.png"
              alt="flecha"
              className="arrow-icon"
            />
          </div>
          {activitiesDropdownOpen && (
            <ul className="dropdown-menu">
              <li
                onMouseEnter={() => showSubMenu("cultura")}
                onMouseLeave={hideSubMenu}
              >
                <li>{t("Culture")}</li>
                {activeSubMenu === "cultura" && (
                  <ul className="dropdown-submenu">
                    <li>
                      <Link to="/Cultura2">{t("Petroglyphs")}</Link>
                    </li>
                    <li>
                      <Link to="/Cultura3">{t("Church")}</Link>
                    </li>
                    <li>
                      <Link to="/Cultura4">{t("Springs")}</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li
                onMouseEnter={() => showSubMenu("senderismo")}
                onMouseLeave={hideSubMenu}
              >
                <li>{t("Hike")}</li>
                {activeSubMenu === "senderismo" && (
                  <ul className="dropdown-submenu">
                    <li>
                      <Link to="/Senderismo">{t("Volcano")}</Link>
                    </li>
                    <li>
                      <Link to="/Senderismo2">{t("Lagoons")}</Link>
                    </li>
                    <li>
                      <Link to="/Senderismo3">{t("Caves")}</Link>
                    </li>
                    <li>
                      <Link to="/Senderismo4">{t("Indian")}</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li
                onMouseEnter={() => showSubMenu("parques")}
                onMouseLeave={hideSubMenu}
              >
                <li>{t("Parks")}</li>
                {activeSubMenu === "parques" && (
                  <ul className="dropdown-submenu">
                    <li>
                      <Link to="/Parque">{t("Parks")}</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li
                onMouseEnter={() => showSubMenu("vida-salvaje")}
                onMouseLeave={hideSubMenu}
              >
                <li>{t("Routes")}</li>
                {activeSubMenu === "vida-salvaje" && (
                  <ul className="dropdown-submenu">
                    <li>
                      <Link to="/Termas">{t("HotSprings")}</Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </div>

        <Link to="/Zoit">
          <button className="Zona">{t("ZOIT")}</button>
        </Link>

        <Link to="/Panoramas">
          <button className="Panoramas">{t("Panoramas")}</button>
        </Link>

        {/* Agregar botón de Servicios */}
        <div
          className="dropdown"
          onMouseEnter={() => setServicesDropdownOpen(true)}
          onMouseLeave={() => setServicesDropdownOpen(false)}
        >
          <div className="button-with-arrow">
            <button className="Hacer">
              {" "}
              {/* Usamos la misma clase "Hacer" para que el estilo sea el mismo */}
              {t("Services")}
            </button>
            <img
              src="/assets/img/flecha.png"
              alt="flecha"
              className="arrow-icon2"
            />
          </div>
          {servicesDropdownOpen && (
            <ul className="dropdown-menu">
              {/* Botón de crear servicio visible solo para admin y oferente */}
              {(role === "admin" || role === "oferente") && ( // Solo mostrar el botón desplegable de Servicios si el rol es admin u oferente
                <li>
                  <Link to="/crearServicios">{t("CreateService")}</Link>
                </li>
              )}
              <li>
                <Link to="/mostrarServicios">{t("ViewService")}</Link>
              </li>
              {role === "turista" && (
                <li>
                  <Link to="/solicitudOferente">{t("OfferingServices")}</Link>
                </li>
              )}
              {!(
                role === "admin" ||
                role === "oferente" ||
                role === "turista"
              ) && (
                <li>
                  <Link to="/Catastro">{t("bidder")}</Link>
                </li>
              )}
              {role === "admin" && (
                <li>
                  <Link to="/manejarServicios">{t("ManageServices")}</Link>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>

      <div className="navbar-icons-right">
        {/* Botón caret-down visible solo en pantallas pequeñas */}
        <button onClick={toggleDropdownIcons} className="navbar-toggle-icons">
          {dropdownIconsOpen ? (
            <i className="bi bi-caret-down"></i> // Icono cuando está abierto
          ) : (
            <i className="bi bi-caret-left"></i> // Icono cuando está cerrado
          )}
        </button>
        <div className={`icons-container ${dropdownIconsOpen ? "show" : ""}`}>
          <div className="navbar-auth">
            <button onClick={toggleLanguage} className="btn-blue2">
              {language === "es" ? (
                <>
                  <span className="language-label1">EN</span>
                  <img
                    src="/assets/img/uk4.png"
                    alt="English" 
                    className="icon-image7"
                  />
                </>
              ) : (
                <>
                  <span className="language-label">ES</span>
                  <img
                    src="/assets/img/espana.png"
                    alt="Español"
                    className="icon-image6"
                  />
                </>
              )}
            </button>
          </div>

          <div className="navbar-search">
            <button onClick={toggleSearch}>
              <i className="bi bi-search"></i>
            </button>

            {searchOpen && (
              <div className="search-container">
                {" "}
                {/* Envuelve el formulario de búsqueda y los resultados */}
                <form onSubmit={handleSearchSubmit} className="search-bar">
                  <input
                    type="text"
                    placeholder={t("WhatSearch")}
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button type="submit">
                    <i className="bi bi-arrow-right"></i>
                  </button>
                </form>
                {searchQuery && (
                  <ul className="dropdown-menu1">
                    {searchResults.map((result, index) => (
                      <li
                        key={index}
                        onClick={() => handleResultClick(result.path)}
                      >
                        {result.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          <div className="dark-mode-toggle">
            <button onClick={toggleDarkMode} className="btn-blue2">
              {darkMode ? (
                <img
                  src="/assets/img/sol4.png"
                  alt="Sol"
                  className="icon-image2"
                />
              ) : (
                <img
                  src="/assets/img/luna.png"
                  alt="Luna"
                  className="icon-image3"
                />
              )}
            </button>
          </div>

          {(role === "admin" || role === "oferente" || role === "turista") && (
            <>
              <button onClick={confirmLogout} className="btn-blue2">
                <img
                  src="/assets/img/logout.png"
                  alt="Logout"
                  className="icon-image4"
                />
              </button>
              <ConfirmModal
                show={showLogoutModal}
                message="¿Está seguro de que desea cerrar sesión?"
                onConfirm={handleLogout} // Cerrar sesión si confirma
                onCancel={cancelLogout} // Cerrar el modal si cancela
                className="Modal-IN"
              />
            </>
          )}

          {!(role === "admin" || role === "oferente" || role === "turista") && (
            <Link to="/login">
              <button className="btn-blue2">
                <img
                  src="/assets/img/login.png"
                  alt="Login"
                  className="icon-image5"
                />
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
