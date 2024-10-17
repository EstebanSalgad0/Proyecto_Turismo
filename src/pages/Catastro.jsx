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
        <h5>¡Es rápido, gratuito y sencillo! Primero debe registrarse como turista presionando los botones azules de abajo y luego solicitar acceso al administrador mediante la sección de Servicios para poder ofrecer sus servicios publicamente en esta plataforma. Lo esperamos.</h5>
        <br></br>
        <br></br>
        <div className="carousel-subheader">
            <h2>[Insertar Instrucciones Video Corto]</h2>
          </div>
          <br></br>
          <div className="carousel-header">
  <h2>
    <Link to="/registrarse">¿Eres Artesana/o? ¡Regístrate Aquí!</Link>
  </h2>
</div>
<br />
<div className="carousel-header">
  <h2>
    <Link to="/registrarse">¿Ofreces Bienes y/o Servicios? ¡Regístrate Aquí!</Link>
  </h2>
</div>
<br />
<div className="carousel-header">
  <h2>
    <Link to="/registrarse">¿Tienes cabañas? ¡Regístrate Aquí!</Link>
  </h2>
</div>
        
      </section>
    </div>
  );
};

export default Zoit;