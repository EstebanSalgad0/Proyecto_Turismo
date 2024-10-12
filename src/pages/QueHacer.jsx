import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../styles/QueHacer.css?v=1.1';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import Header from '../components/Header';

// Importación de imágenes locales
import culturaImage from '../assets/img/Cultural.png';
import senderismoImage from '../assets/img/Senderismo.png';
import parquesImage from '../assets/img/Parque.png';
import vidaSalvajeImage from '../assets/img/Rutas.png';

const Index = () => {

  return (
    <div className="index-container">
      {/* Navbar */}
      <Header/>

      {/* Carousel Section */}
      <section className="carousel-section">
        <div className="carousel-header">
            <br></br><br></br>
          <h5>¿Qué hacer?</h5>
          <div className="carousel-subheader">
            <h2>Belleza Natural</h2>
          </div>
        </div>

        {/* Carrusel de imágenes */}
        <div className="carousel-container">
          <div className="carousel-card">
            <div className="carousel-image" style={{ backgroundImage: `url(${culturaImage})` }}></div>
            <p>Cultura y sitios históricos</p>
          </div>
          <div className="carousel-card">
            <div className="carousel-image" style={{ backgroundImage: `url(${senderismoImage})` }}></div>
            <p>Senderismo</p>
          </div>
          <div className="carousel-card">
            <div className="carousel-image" style={{ backgroundImage: `url(${parquesImage})` }}></div>
            <p>Parques</p>
          </div>
          <div className="carousel-card">
            <div className="carousel-image" style={{ backgroundImage: `url(${vidaSalvajeImage})` }}></div>
            <p>Vida Salvaje</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Index;
