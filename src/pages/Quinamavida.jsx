import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../styles/Quinamavida.css'; // Estilos específicos para el componente
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import Header from '../components/Header';

const Quinamavida = () => {

  return (
    <div className="index-container">
      {/* Navbar */}
      <Header/>
      {/* Hero Section */}
      <div className="hero13">
        <div className="hero-content13">
          <h5>¿A donde ir?</h5>
          <h1>Quinamávida</h1>
          <h4>Quinamávida es una encantadora localidad en la comuna de Colbún, en la región del Maule, Chile, conocida por su rica tradición artesanal. Aquí, las artesanas locales preservan y transmiten técnicas ancestrales en la creación de textiles y productos hechos a mano, que reflejan la riqueza cultural y el ingenio de la región. Cada pieza elaborada en Quinamávida es un testimonio del talento y la dedicación de sus creadoras, quienes utilizan materiales tradicionales y métodos tradicionales para ofrecer productos únicos y de alta calidad. Al visitar Quinamávida, puedes explorar los talleres de las artesanas, conocer el proceso detrás de cada creación y adquirir recuerdos auténticos que capturan el espíritu de la región. La experiencia en Quinamávida ofrece una inmersión en el arte y la tradición local, combinando la belleza de sus paisajes con la riqueza de su patrimonio cultural.</h4>
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

export default Quinamavida;
