import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../styles/Turismo.css?v=1.4';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import Header from '../components/Header';

const Zoit = () => {

  // Hook para desplazar la página al inicio cuando se carga el componente
  useEffect(() => {
    window.scrollTo(0, 0); // Mueve la página hacia la parte superior
  }, []);
  
  return (
    <div className="index-container">
      {/* Navbar */}
      <Header/>

      {/* Carousel Section */}
      <section className="carousel-section">
        <div className="carousel-header">
            <br></br><br></br><br></br><br></br>
          <h5>Se parte del catastro de servicios</h5>
          <div className="carousel-subheader">
            <h1>Catastro de servicios</h1>
          </div>
        </div>
        <br></br>
        <h5>¡Únete al Catastro de Servicios para Artesanas/os, Bienes, Servicios y Cabañas!</h5>
                <br></br>
        <h5>Si eres artesana/o, ofreces productos, servicios o tienes cabañas, esta es tu oportunidad para formar parte de una comunidad que impulsa el desarrollo local. Regístrate en nuestro Catastro de Servicios y da a conocer tu oferta a nivel regional y nacional. Al inscribirte, podrás: </h5>
               <br></br>
        <h5>- Visibilizar tu emprendimiento.</h5>
        <h5>- Conectar con potenciales clientes.</h5>
        <h5>- Formar parte de proyectos y actividades promocionales.</h5>
        <br></br>
        <h5>¡Es rápido, gratuito y sencillo! Completa el formulario y comienza a potenciar tu negocio junto a nosotros. ¡Haz crecer tu emprendimiento siendo parte de este gran directorio comunitario!</h5>
        <br></br>
        <br></br>
        <div className="carousel-subheader">
            <h2>Eres Artesana/o</h2>
          </div>
          <br></br>
          <div className="carousel-subheader">
            <h2>Ofreces Bienes y Servicios</h2>
          </div>
          <br></br>
          <div className="carousel-subheader">
            <h2>Tienes cabañas</h2>
          </div>
        
      </section>
    </div>
  );
};

export default Zoit;