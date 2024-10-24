import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../styles/Turismo.css?v=1.5';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import Header from '../components/Header';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';

const Zoit = () => {

  const { t, i18n } = useTranslation(); // Hook para usar traducciones

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language'); // Obtener el idioma guardado
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage); // Cambiar el idioma si es necesario
    }
  }, [i18n.language]); // Añadir el estado del idioma como dependencia

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
          <h5>{t('VisitFooter')}</h5>
          <div className="carousel-subheader">
            <h1>{t('Privacy')}</h1>
          </div>
        </div>
        <br></br><br></br>
        <h5>Lorem ipsum dolor sit amet consectetur. Leo laoreet nunc at pharetra at morbi consectetur integer. Vel mattis felis viverra pharetra amet pellentesque. Ut id vitae scelerisque orci varius. Ultricies ipsum elementum dui at auctor libero. Scelerisque lacus dictum fusce volutpat pulvinar vel condimentum sit placerat. Eleifend volutpat magna ac ante vel enim nisi bibendum.
Sem a vel sapien purus viverra. Id lacus eget sodales velit massa rhoncus potenti mattis eu. Ullamcorper congue porttitor risus felis convallis. Sed neque sed mauris urna. Eget egestas eget est venenatis dolor sit. Diam id enim netus amet. Arcu dictum nulla neque lacus felis cras sem pulvinar. Pellentesque libero aenean porta elementum. Vitae proin pellentesque nibh nibh. Amet sit sit mi vitae quam bibendum sit. Ut amet integer urna malesuada dictumst at.
Consequat dictum turpis purus venenatis est elit vel orci. Turpis in augue blandit amet. Facilisis ut turpis nibh erat sed. Dui sed tortor sit mauris eget leo facilisi odio tincidunt. Lorem sollicitudin venenatis nec ornare. Massa eu amet sed blandit magna semper quam. Sit habitant cras at posuere sapien aliquam. Pretium tortor id accumsan a tincidunt parturient. Est quam felis pretium praesent quisque. Nibh sit at ut gravida. Euismod velit tellus ultrices magna turpis urna facilisi dolor. Risus purus fringilla facilisi vitae nisl in integer. Lacus consectetur lobortis velit nulla in senectus nisl nisl ut. Pellentesque ut pellentesque amet sed aliquet amet posuere enim. Et turpis posuere risus amet etiam habitasse velit facilisi interdum.
Consectetur maecenas nec ut est viverra cras et non integer. Amet molestie ac tellus erat magna at. Eu viverra mi et eros sit at viverra at faucibus. Cras neque molestie tristique tincidunt posuere tortor convallis est. Magna sed neque maecenas eu faucibus aliquam curabitur purus id.
Nisl donec turpis netus tortor nibh volutpat id orci. Vulputate venenatis ut pharetra vel. Mi non semper convallis mattis diam ac tempus semper. Feugiat semper aliquam pretium nunc. Egestas condimentum a enim sit nisl lacinia. Suscipit porta nibh viverra gravida amet ultrices.
Quis lorem molestie lectus in quam. Ut et eget arcu blandit nunc tincidunt ut. Id semper mauris eu integer.</h5>
                <br></br>
        
      </section>
    </div>
  );
};

export default Zoit;