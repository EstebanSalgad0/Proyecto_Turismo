import React from 'react';
import '../styles/SocialSeccion.css'

const SocialSeccion = () => {
  return (
    <section className="social-section1">
        <div className="social-content1">
            <h2>¿Cuál será tu próximo destino?</h2>
            <p><strong>Visita Colbún y su gente.</strong> Etiquétanos con <strong>#VisitaColbun</strong>.</p>
            <h3>ENCUÉNTRANOS TAMBIÉN EN</h3>
            <div className="social-icons1">
            <i className="bi bi-facebook"></i>
            <i className="bi bi-instagram"></i>
            <i className="bi bi-youtube"></i>
            </div>
        </div>

        <hr className="divider" /> {/* Aquí está el divisor */}

        <div className="help-section">
            <h2>¿Tienes dudas? Nosotros <strong>te ayudamos</strong></h2>
            <div className="help-options">
            <div className="help-item">
                <div className="help-image help-image-1"></div>
                <p><strong>Turismo atiende</strong><br />Agenda tu hora y resuelve dudas</p>
            </div>
            <div className="help-item">
                <div className="help-image help-image-2"></div> 
                <p><strong>Oficinas información turística</strong></p>
            </div>
            <div className="help-item">
                <div className="help-image help-image-3"></div>
                <p><strong>Folletería y mapas</strong></p>
            </div>
            </div>
        </div>
        </section>

  );
};

export default SocialSeccion;
