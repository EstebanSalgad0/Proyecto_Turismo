import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../styles/Colbunalto.css'; // Estilos específicos para el componente
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import Header from '../components/Header';

const Colbunalto = () => {
  return (
    <div className="index-container">
      {/* Navbar */}
      <Header/>

      {/* Hero Section */}
      <div className="hero4">
        <div className="hero-content4">
          <h5>¿A donde ir?</h5>
          <h1>Colbun Alto</h1>
          <h4>Colbún Alto es una encantadora localidad en la comuna de Colbún, situada en la región del Maule, Chile. Este pintoresco rincón se destaca por sus vistas panorámicas de los majestuosos paisajes cordilleranos y su cercanía al embalse Colbún, una impresionante obra de ingeniería que no solo embellece el entorno, sino que también juega un papel crucial en la generación de energía hidroeléctrica. En Colbún Alto, la tranquilidad de la vida rural se combina con la majestuosidad de la naturaleza, ofreciendo a los visitantes la oportunidad de disfrutar de actividades al aire libre como el senderismo, la pesca y el avistamiento de aves. El área es ideal para quienes buscan escapar del bullicio urbano y sumergirse en un entorno sereno y natural, donde la comunidad local mantiene vivas las tradiciones y el espíritu acogedor del campo chileno.</h4>
        </div>
      </div>

      <section className="info-section">
        <div className="info-content">
          <h5>Lugares inolvidables</h5>
          <h1>Algo para no olvidar</h1>
          <p>Descubre la belleza cautivadora de Colbún, donde los tranquilos paisajes rurales se entrelazan con los lagos cristalinos y montañas imponentes que ofrecen una combinación única de naturaleza, aventura al aire libre y un profundo sentido de comunidad. Puedes navegar en las aguas del embalse Machicura, disfrutar de las termas naturales de Panimávida o explorar los senderos que atraviesan los cerros verdes de la región. Colbún te invita a vivir experiencias inolvidables, inmersas en la serenidad y el encanto del corazón de la zona central de Chile.</p>
          <button className="btn-blue">Descubre tu próximo destino</button>
        </div>
      </section>
            
      {/* Carousel Section */}
      <section className="carousel-section">
        <div className="carousel-header">
          <h5>Admira</h5>
          <div className="carousel-subheader">
            <h2>Belleza Natural</h2>
            <a href="#">Ve más <span>&#8594;</span></a>
          </div>
        </div>

        {/* Carrusel de imágenes */}
        <div className="carousel-container">
          <div className="carousel-card">
            <div className="carousel-image"></div>
            <p>Mirador Las Vizcachas</p>
          </div>
          <div className="carousel-card">
            <div className="carousel-image"></div>
            <p>Parque Nacional Guaquivilo</p>
          </div>
          <div className="carousel-card">
            <div className="carousel-image"></div>
            <p>Cavernas Los Bellotos</p>
          </div>
          <div className="carousel-card">
            <div className="carousel-image"></div>
            <p>Embalse Machicura</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Colbunalto;
