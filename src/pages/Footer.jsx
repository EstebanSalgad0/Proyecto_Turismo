import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-logo">
            <div className="logo logo-1"></div>
            <div className="logo logo-2"></div>
            <div className="logo logo-3"></div>
          </div>

          <div className="footer-column">
          <h3>Visita Colbún</h3>
          <ul>
          <li><Link to="/SobreNosotros">Sobre Nosotros</Link></li>
          <li><Link to="/Asociados">Asociados</Link></li>
          <li><Link to="/Privacidad">Políticas de Privacidad</Link></li>
          <li><Link to="/Catastro">Se parte del catastro de servicios</Link></li>
        </ul>
      </div>

          <div className="footer-column">
            <h3>Te puede interesar</h3>
            <ul>
              <li><a href="#">Municipalidad de Colbún</a></li>
              <li><a href="#">Chile Travel</a></li>
              <li><a href="#">Chile Cultura</a></li>
              <li><a href="#">Parques nacionales Conaf</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Encuéntranos también en</h3>
            <ul>
              <li><a href="https://web.facebook.com/p/Municipalidad-de-Colb%C3%BAn-100064570487351/?locale=es_LA&_rdc=1&_rdr">Facebook</a></li>
              <li><a href="https://www.instagram.com/municipalidad_colbun/?hl=es">Instagram</a></li>
              <li><a href="https://www.youtube.com/@municipalidadcolbun9532">YouTube</a></li>
            </ul>
          </div>
        </div>
      </footer>
  )
}

export default Footer