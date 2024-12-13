import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Panoramas.css?v=1.7';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Carousel from '../components/carousel';
import SocialSection from '../components/SocialSeccion';
import '../components/i18n';
import { useTranslation } from 'react-i18next';

const Panoramas = () => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <div className="index-container">
      <Header />

      {/* Hero Section */}
      <div className="hero100">
        <div className="hero-content100">
          <h5>{t('Panoramas')}</h5>
          <h1>{t('Panoramas1')}</h1>
          <h4>{t('Panoramas2')}</h4>
        </div>
      </div>

<br></br>
      <div className="carousel-subheader2">
        <h1>{t('Panoramas3')}</h1>
      </div>

      {/* Calendar Section */}
      <br></br><br></br>
      <div className="calendar-container">
        <iframe
          src="https://calendar.google.com/calendar/embed?src=javiermar1200%40gmail.com&ctz=America%2FSantiago"
          style={{ border: 0 }}
          width="100%"
          height="100%"
          scrolling="no"
          title="Eventos Turismo Colbún"
        />
      </div>
      <div className="calendar-container">
        <iframe
          src="https://calendar.google.com/calendar/embed?src=es-419.cl%23holiday%40group.v.calendar.google.com&ctz=America%2FSantiago"
          style={{ border: 0 }}
          width="100%"
          height="100%"
          scrolling="no"
          title="Feriados de chile / Chilean holidays"
        />
      </div>

      <Carousel/>
      <SocialSection/>
      <Footer />
    </div>
  );
};

export default Panoramas;