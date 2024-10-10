import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../styles/Zoit.css';
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
            <br></br><br></br><br></br>
          <h5>Colbún ZOIT</h5>
          <div className="carousel-subheader">
            <h2>Zona ZOIT</h2>
          </div>
        </div>
        <br></br>
        <h5>La ZOIT Lago Colbún – Rari está conformada por parte de las comunas de San Clemente 
            y Colbún que comparten en sus administraciones las riberas norte y sur del Lago Colbún 
            en la región del Maule. Después de 4 años de gestión ZOIT el destino para su prórroga
             mantendrá la visión de: “Posicionarse como un destino para el turismo de naturaleza,
              aventura, deporte y tradición cultural, basado en el desarrollo turístico
               precordillerano, centrando al Lago Colbún como atractivo principal y 
               eje de su desarrollo, en conjunto con la localidad de Rari; con un reconocimiento nacional
                e internacional”.</h5>
                <br></br>
        <h5>En tanto su misión será: “Impulsar el ordenamiento de la actividad turística, permitiendo
             ir hacia la superación de brechas y un desarrollo sustentable, rescatando las tradiciones
              y la identidad para promover un destino de naturaleza, campo, patrimonio y actividades
               náuticas con una oferta turística atractiva para visitantes nacionales”.</h5>
               <br></br>
        <h5>Sumado a lo anterior, debemos señalar lo siguiente, un número enorme de actividades, 
            ferias y festivales culturales se desarrollan en nuestra comuna anualmente, 
            siempre asociados a nuestra identidad y aquello que más hace distinguir a cada
             comunidad local, pasando por el Crin, el Telar, las carretas, las Esquilas, Fiestas
              Religiosas entre otras, y que son de renombre nacional. Muestra Nacional de Artesanía
               y Folclore Panimávida, la Fiesta de la Esquila, La noche de San Juan (única fiesta
                de invierno en la región), Chancho al Humo, Fiesta del Crin, San Sebastián 
                (reconocida actividad nacional), entre muchas otras, donde se tiene un público 
                que dobla normalmente al total de la Población Comunal.</h5>

      </section>

    </div>
  );
};

export default Zoit;
