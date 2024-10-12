import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../styles/Turismo.css?v=1.6';
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
            <h1>Asociados</h1>
          </div>
        </div>
        <br></br>
        <div className="carousel-subheader">
            <h2>Convenios establecidos</h2>
          </div>
          <br></br><br></br>
        <h5>En enero del 2017, desde el Municipio se firmó un acuerdo con el Consejo Nacional de Cultura y las Artes, ingresando a la Agenda de Red Cultura comprometiéndose en 3 metas de gestión cultural entre los años 2017 y 2022:</h5>
                <br></br>
        <h5>1. Disponer de al menos 2% del presupuesto municipal anual para asignar al ítem Cultura.</h5>
        <h5>2. Contar con una persona especializada a cargo de Cultura.</h5>
        <h5>3. Contar con un Plan Municipal de Cultura integrado en el PLADECO.</h5>
        <br></br>
        <h5>El 5 de mayo del 2017, por Decreto Extento N°001060 se aprueba la incorporación de la Municipalidad de Colbún a la Asociación Cultural del Maule, logrando tener acceso a recurso del Gobierno Regional para invertir en actividades culturales.</h5>
        <br></br>
        <div className="carousel-subheader">
            <h2>Redes de apoyo</h2>
          </div>
          <br></br><br></br>
          <h5>- Fundación Superación de la Pobreza, Maule.</h5>
          <h5>- Corporación Cultural de San Javier.</h5>
          <h5>- Teatro Regional del Maule.</h5>
          <h5>- Facultad de Música, Arquitectura y Diseño, Universidad de Talca.</h5>
          <h5>- Fundación Guayasamín de Ecuador.</h5>
          <h5>- Corporación Educacional Aldea Rural.</h5>
          <h5>- Parque Cultural Valparaíso.</h5>

      </section>
    </div>
  );
};

export default Zoit;