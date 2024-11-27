import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Privacidad.css?v=1.5';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';

const Privacidad = () => {
  const { t, i18n } = useTranslation(); // Hook para usar traducciones

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language'); // Obtener el idioma guardado
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage); // Cambiar el idioma si es necesario
    }
  }, [i18n]);

  return (
    <div className="privacidad-container">
      {/* Navbar */}
      <Header />

      {/* Sección de encabezado */}
      <section className="header-section">
        <div className="header">
          <h5>{t('VisitFooter')}</h5>
          <div className="subheader">
            <h1>{t('Privacy')}</h1>
          </div>
        </div>
      </section>

      {/* Sección de contenido */}
      <section className="content-section">
        <h5>
          Lorem ipsum dolor sit amet consectetur. Leo laoreet nunc at pharetra at morbi
          consectetur integer. Vel mattis felis viverra pharetra amet pellentesque. Ut id
          vitae scelerisque orci varius. Ultricies ipsum elementum dui at auctor libero.
          Scelerisque lacus dictum fusce volutpat pulvinar vel condimentum sit placerat.
          Eleifend volutpat magna ac ante vel enim nisi bibendum.
        </h5>
        <h5>
          Sem a vel sapien purus viverra. Id lacus eget sodales velit massa rhoncus potenti
          mattis eu. Ullamcorper congue porttitor risus felis convallis. Sed neque sed
          mauris urna. Eget egestas eget est venenatis dolor sit. Diam id enim netus amet.
        </h5>
      </section>
      <SocialSection/>
      <Footer/>
      
    </div>
  );
};

export default Privacidad;
