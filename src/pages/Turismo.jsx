import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Turismo.css'; // Asegúrate de tener este archivo para estilos específicos
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import '../components/i18n';
import { useTranslation } from 'react-i18next';
import ContactSection from '../components/ContactSection'; // Importa el componente de contacto reutilizable

const Turismo = () => {
  const { t, i18n } = useTranslation(); // Hook para manejar traducciones

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language'); // Obtener idioma guardado
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage); // Cambiar idioma si es necesario
    }
  }, [i18n]);

  return (
    <div className="turismo-container-TA">
      {/* Navbar */}
      <Header />

      {/* Sección de introducción */}
      <section className="intro-section-TA">
        <div className="intro-header-TA">
          <h5>{t('Turism')}</h5>
          <div className="intro-subheader-TA">
            <h1>{t('WhatToDo')}</h1>
          </div>
        </div>

        <div className="intro-details-TA">
          <p>{t('AdventureTime')}</p>
        </div>
        <br></br><br></br>
      </section>

      {/* Sección de contacto reutilizable */}
      <ContactSection />
      <SocialSection/>
      <Footer />
    </div>
  );
};

export default Turismo;

