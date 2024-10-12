import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../styles/OIT.css?v=1.4';
import imagen from '../assets/img/contactanos.png';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import Header from '../components/Header';

const Zoit = () => {

  return (
    <div className="index-container">
      {/* Navbar */}
      <Header/>


      {/* Carousel Section */}
      <section className="carousel-section">
        <div className="carousel-header">
            <br></br><br></br><br></br><br></br>
          <h5>Turismo atiende</h5>
          <div className="carousel-subheader">
            <h1>Oficinas de información turística (OIT)</h1>
          </div>
        </div>
        <br></br>
        <h5>Todas las personas que trabajan en los centros i-SITE son expertos en viajes en sus propias ciudades. Te ayudarán a encontrar actividades, atracciones, alojamiento y transporte de calidad, entre otras cosas. Sea lo que sea que estés buscando, esto garantiza que disfrutes de lo mejor y más reciente que el lugar tiene para ofrecer. Por eso, ya sea que vengas del otro lado del mundo o de las cercanías, comienza hoy a utilizar i-SITE.</h5>
                <br></br>
               <br></br><br></br>
        <h5>- Planificación de itinerario e información</h5>
        <h5>- Reservas en todo el país: alojamiento, transporte, actividades, atracciones</h5>
        <h5>- Mapas gratis, información sobre el clima y la seguridad en la montaña</h5>
        <h5>- Información local sobre eventos, atracciones, restaurantes y otros temas.</h5>
        <br></br><br></br><br></br>
        <div className="carousel-subheader">
            <h1>Oficinas de información turística Colbún</h1>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="carousel-subheader">
            <h2>Contáctanos</h2>
          </div>
          <br></br><br></br>
          <div className="contact-section">
  <div className="contact-item">
    <h3>WhatsApp</h3>
    <p>+569 9458 0453</p>
  </div>
  <div className="contact-item">
    <h3>Escríbenos</h3>
    <p>turismoatiende@sernatur.cl</p>
  </div>
  <div className="contact-item">
    <h3>Call Center</h3>
    <p>600 600 60 66</p>
  </div>
</div>


        
      </section>
    </div>
  );
};

export default Zoit;