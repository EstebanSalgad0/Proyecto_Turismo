import React from 'react'

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
              <li><a href="#">Sobre Nosotros</a></li>
              <li><a href="#">Asociados</a></li>
              <li><a href="#">Políticas de Privacidad</a></li>
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
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">YouTube</a></li>
            </ul>
          </div>
        </div>
      </footer>
  )
}

export default Footer