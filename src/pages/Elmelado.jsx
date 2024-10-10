import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../styles/Elmelado.css'; // Estilos específicos para el componente
import Footer from '../components/Footer'; 
import SocialSection from '../components/SocialSeccion';
import Header from '../components/Header';


const Elmelado = () => {
  return (
    <div className="index-container">
      {/* Navbar */}
      <Header/>

      {/* Hero Section */}
      <div className="hero0">
        <div className="hero-content0">
          <h5>¿A donde ir?</h5>
          <h1>El Melado</h1>
          <h4>El Melado es una pintoresca localidad ubicada en la comuna de Colbún, en la región del Maule, Chile. Este lugar se destaca por su entorno natural, rodeado de montañas, ríos y exuberante vegetación, que lo convierten en un destino ideal para los amantes de la naturaleza y el ecoturismo. El Melado es conocido por el embalse del mismo nombre, una impresionante obra de ingeniería que abastece de agua a la zona y se utiliza para la generación de energía hidroeléctrica. Además, sus paisajes son perfectos para actividades como el senderismo, la pesca y el avistamiento de flora y fauna autóctona, ofreciendo una experiencia única en contacto con la tranquilidad de la cordillera.</h4>
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

export default Elmelado;
