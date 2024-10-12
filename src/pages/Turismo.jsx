import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../styles/Turismo.css?v=1.5';
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
            <h1>¿Qué hacer?</h1>
          </div>
        </div>
        <br></br>
        <h5>¿Estas planeando una escapada con amigos, un fin de semana romántico o las vacaciones en familia? Acá te contamos qué, cómo y dónde puedes vivir esa experiencia que siempre soñaste y sumar algunas que aún no sabías que querías experimentar. ¡Vamos a la aventura!</h5>
                <br></br><br></br><br></br>
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