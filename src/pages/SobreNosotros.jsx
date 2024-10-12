import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../styles/SobreNosotros.css?v=1.4';
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
          <h5>Visita Colbún</h5>
          <div className="carousel-subheader">
            <h1>Sobre Nosotros</h1>
          </div>
        </div>
        <br></br>
        <h5>En el Área de Cultura y Turismo de nuestra comuna, 
            trabajamos con el objetivo de potenciar y desarrollar 
            dos aspectos fundamentales de nuestro territorio: la cultura 
            y el turismo, áreas que destacan por su enorme riqueza natural,
             histórica y tradicional. </h5>
                <br></br>
                <div className="carousel-subheader">
            <h2>Turismo</h2>
          </div>
          <br></br><br></br>
        <h5>Desde el 18 de abril de 2017, con la creación del Departamento de Turismo Municipal, nos enfocamos en posicionar la actividad turística como un pilar clave para el desarrollo económico local. Nuestra misión es trabajar de la mano con el sector público y privado para impulsar el destino “Colbún” como una marca reconocida a nivel local, nacional e internacional. Nos comprometemos a proteger y promover de manera sustentable nuestros recursos naturales y arqueológicos de interés turístico, asegurando su conservación para las generaciones futuras. </h5>
        <br></br>
        <h5>Nos dedicamos a gestionar de forma responsable las zonas de interés turístico, como la Zona de Interés Turístico (ZOIT) Lago Colbún Rari, declarada en 2016. Asimismo, cumplimos con las normativas municipales y realizamos campañas de promoción y marketing turístico, posicionando a nuestra comuna como un destino preferente. </h5>
               <br></br>
               <div className="carousel-subheader">
            <h2>Cultura</h2>
          </div>
          <br></br><br></br>
        <h5>En el ámbito cultural, nos esforzamos por desarrollar espacios que fomenten la creatividad y el arte local. A través del trabajo con actores y comunidades locales, brindamos apoyo para que puedan asociarse y potenciar sus proyectos culturales. También gestionamos recursos municipales, públicos y privados con el fin de fortalecer el desarrollo cultural de nuestra comuna. </h5>
        <br></br>
        <h5>Apoyamos las actividades culturales de otras áreas municipales como educación, salud, desarrollo comunitario y económico local, y promovemos la participación ciudadana en eventos y celebraciones tradicionales que reflejan la identidad cultural de nuestra comuna. </h5>
        <br></br>
        <h5>Uno de nuestros mayores logros ha sido la creación de la Corporación Municipal de Cultura en 2017, cuyo propósito es consolidar el desarrollo cultural de la comuna. Además, estamos construyendo nuestro Primer Plan Municipal de Cultura, que ha sido financiado a través del Fondo de Fortalecimiento de la Gestión Cultural Local 2017, lo que constituye un hito en la historia de nuestra comunidad. </h5>
        <br></br>
        <h5>En el Área de Cultura y Turismo, estamos comprometidos con el desarrollo sostenible, la protección de nuestro patrimonio y el fomento de la identidad local, trabajando incansablemente para que nuestra comuna siga brillando como un destino cultural y turístico.</h5>
      </section>
    </div>
  );
};

export default Zoit;