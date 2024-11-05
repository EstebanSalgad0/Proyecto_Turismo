import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import ControlLetras from './ControlLetras';
import './i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';



const Footer = () => {

  const { t, i18n } = useTranslation(); // Hook para usar traducciones


  return (
    <footer className="footer-section">
        <div className="footer-container">
        <div className="footer-logo">
          <a href="https://www.superacionpobreza.cl/" target="_blank" rel="noopener noreferrer">
        <div className="logo logo-1"></div>
          </a>
        <a href="https://www.uautonoma.cl/" target="_blank" rel="noopener noreferrer">
          <div className="logo logo-2"></div>
        </a>
        <a href="https://municipalidadcolbun.cl/" target="_blank" rel="noopener noreferrer">
          <div className="logo logo-3"></div>
        </a>
      </div>

          <div className="footer-column">
            <h3>{t('VisitFooter')}</h3>
            <ul>
            <li><Link to="/SobreNosotros">{t('AboutUs')}</Link></li>
            <li><Link to="/Asociados">{t('Associates')}</Link></li>
            <li><Link to="/Privacidad">{t('Privacy')}</Link></li>
            <li><Link to="/Catastro">{t('Cadastre')}</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>{t('Interested')}</h3>
            <ul>
              <li><a href="https://municipalidadcolbun.cl/" target='_blank'>{t('Municipality')}</a></li>
              <li><a href="https://chile.travel/" target='_blank'>Chile Travel</a></li>
              <li><a href="https://chilecultura.gob.cl/" target='_blank'>{t('ChileCulture')}</a></li>
              <li><a href="https://www.conaf.cl/parques-nacionales/" target='_blank'>{t('Conaf')}</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>{t('findus')}</h3>
            <ul>
              <li><a href="https://web.facebook.com/p/Municipalidad-de-Colb%C3%BAn-100064570487351/?locale=es_LA&_rdc=1&_rdr" target='_blank'>Facebook</a></li>
              <li><a href="https://www.instagram.com/visitacolbun/?hl=es-la" target='_blank'>Instagram</a></li>
              <li><a href="https://www.youtube.com/@municipalidadcolbun9532" target='_blank'>YouTube</a></li>
            </ul>
          </div>
          <ControlLetras />
        </div>
      </footer>
  )
}

export default Footer
