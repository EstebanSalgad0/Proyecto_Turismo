import React from 'react';
import '../styles/SocialSeccion.css'

const SocialSeccion = () => {
  return (
    <section className="social-section1">
        <div className="social-content1">
            <h2>¿Cuál será tu próximo destino?</h2>
            <p><strong>Visita Colbún y su gente.</strong> Etiquétanos con <strong>#VisitaColbun</strong>.</p>
            <h3>ENCUÉNTRANOS TAMBIÉN EN</h3>
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
          <h2>¿Tienes dudas? Nosotros <strong>te ayudamos</strong></h2>
          <div className="help-options">
          <a href="/Turismo" className="help-item">
            <div className="help-image help-image-1"></div>
          <p><strong>Turismo atiende</strong><br />Agenda tu hora y resuelve dudas</p>
          </a>
          <a href="/OIT" className="help-item">
            <div className="help-image help-image-2"></div>
          <p><strong>Oficinas información turística</strong></p>
          </a>
          <a href="/Folleteria" className="help-item">
            <div className="help-image help-image-3"></div>
            <p><strong>Folletería y mapas</strong></p>
          </a>
        </div>
        </div>
        </section>

  );
};

export default SocialSeccion;
