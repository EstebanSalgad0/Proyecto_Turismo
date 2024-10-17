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
          <h5>¿Deseas dejar una opinión de un servicio?</h5>
          <div className="carousel-subheader">
            <h1>Catastro de Opiniones de Servicios</h1>
          </div>
        </div>
        <br></br>
        <h5>¡Únete al Catastro de Opiniones de Servicios para turistas</h5>
                <br></br>
        <h5>Por favor, ser respetuoso con las opiniones dadas. Para dar su opinión debe registrarse siguiendo las instrucciones presentes a continuación </h5>
               <br></br>
        <br></br>
        <br></br>
        <div className="carousel-subheader">
        <h2>[Insertar Instrucciones Video Corto]</h2>
          </div>
          <br></br>
          <div className="carousel-header">
  <h2>
    <Link to="/registrarse">¿Deseas dejar una opinión? ¡Regístrese Aquí!</Link>
  </h2>
</div>
<br></br>
        
      </section>
    </div>
  );
};

export default Zoit;