import React from 'react';
import '../styles/SocialSeccion.css';
import './i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';

const SocialSeccion = () => {

  const { t, i18n } = useTranslation(); // Hook para usar traducciones

  return (
    <section className="social-section1">
        <div className="social-content1">
            <h2>{t('Destination')}</h2>
            <p><strong>{t('Visit')}</strong>{t('Tag')}<strong>#VisitaColbun</strong>.</p>
            <h3>{t('Find')}</h3>
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

        <hr className="divider" /> {/* Aquí está el divisor */}

        <div className="help-section">
          <h2>{t('Doubts')}<strong>{t('Help1')}</strong></h2>
          <div className="help-options">
          <a href="/Turismo" className="help-item">
            <div className="help-image help-image-1"></div>
          <p><strong>{t('Turism')}</strong><br />{t('Schedule')}</p>
          </a>
          <a href="/OIT" className="help-item">
            <div className="help-image help-image-2"></div>
          <p><strong>{t('Tourist')}</strong></p>
          </a>
          <a href="/Folleteria" className="help-item">
            <div className="help-image help-image-3"></div>
            <p><strong>{t('Brochures')}</strong></p>
          </a>
        </div>
        </div>
        </section>

  );
};

export default SocialSeccion;
