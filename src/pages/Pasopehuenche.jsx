import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../styles/Pasopehuenche.css'; // Estilos específicos para el componente
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import Header from '../components/Header';

const Pasopehuenche = () => {
  return (
    <div className="index-container">
      {/* Navbar */}
      <Header/>
      {/* Hero Section */}
      <div className="hero12">
        <div className="hero-content12">
          <h5>¿A donde ir?</h5>
          <h1>Paso Pehuenche</h1>
          <h4>Paso Pehuenche, ubicado en la Región del Maule, Chile, es un paso montañoso que conecta el país con Argentina, ofreciendo una ruta impresionante a través de la Cordillera de los Andes. Este paso es conocido por sus paisajes espectaculares, que varían desde vastas planicies hasta formaciones rocosas imponentes y cumbres nevadas. Durante el viaje, los visitantes pueden disfrutar de vistas panorámicas que destacan la majestuosidad de los Andes y la diversidad de la flora y fauna local. En invierno, el paso puede verse cubierto por una capa de nieve, lo que agrega un toque mágico al entorno. Su relevancia no solo radica en su belleza natural, sino también en su importancia como una vía clave para el intercambio comercial y cultural entre Chile y Argentina.</h4>
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

export default Pasopehuenche;
