import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Importamos el hook de traducción
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importa Bootstrap Icons
import '../styles/Index.css'; // Tu archivo de estilos personalizado
import '../Traductor'; // Importa la configuración de i18n

const Index = () => {
  const { t, i18n } = useTranslation(); // Hook de traducción

  // Función para alternar entre español e inglés
  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false); // Estado para controlar el dropdown

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Alterna entre abierto y cerrado
  };

  return (
    <div className="index-container">
      <header className="navbar">
        <div className="navbar-links">
          {/* Botón con dropdown */}
          <div className="dropdown">
            <button className="Ir" onClick={toggleDropdown}>
              {t('where_to_go')}
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li><a href="#">{t('lake_colbun')}</a></li>
                <li><a href="#">{t('rari')}</a></li>
                <li><a href="#">{t('bellotos_reserve')}</a></li>
              </ul>
            )}
          </div>

          <button className="Hacer">{t('what_to_do')}</button>
          <button className="Zona">{t('zoit_zone')}</button>
        </div>
        <div className="navbar-auth">
          <button onClick={toggleLanguage}>{t('language_switch')}</button> {/* Cambia entre ES/EN */}
        </div>
        <div className="navbar-search">
          <button>
            <i className="bi bi-search"></i>
          </button>
        </div>
      </header>

      <div className="hero">
        {/* Video enmarcado         sobre el texto */}
        <div className="video-container">
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/watch?v=Prkycyn3tBw" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
        </div>

        <div className="hero-content">
          <h1>{t('welcome_message')}</h1>
          <h2>{t('subtitle_message')}</h2>
          <button className="btn-green">{t('watch_now')}</button>
        </div>
      </div>
    </div>
  );
};

export default Index;
