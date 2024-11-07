import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Panoramas.css?v=1.7';
import Header from '../components/Header';
import '../components/i18n';
import { useTranslation } from 'react-i18next';

const Panoramas = () => {
  const { t, i18n } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

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
          src="https://calendar.google.com/calendar/embed?src=es.cl%23holiday%40group.v.calendar.google.com&ctz=UTC"
          style={{ border: 0 }}
          width="100%"
          height="100%"
          scrolling="no"
          title="Feriados de chile / Chilean holidays"
        />
      </div>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      {/* Carousel Section */}
      <section className="carousel-section1">
        <div className="carousel-header1">
          <h5>{t('Admire')}</h5>
          <div className="carousel-subheader1">
            <h2>{t('NaturalBeauty')}</h2>
            <a href="#">{t('ViewMore')}<span>&#8594;</span></a>
          </div>
        </div>

        <div className="carousel-container1">
          {/* Carousel Cards */}
          {['VizcachazViewpoint', 'NationalPark', 'CavesBellotos', 'Reservoir', 'Test1', 'Test2', 'Test3'].map((slide, index) => (
            <div
              key={index}
              className="carousel-card1"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              <div className="carousel-image1"></div>
              <p>{t(slide)}</p>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button className="carousel-control1 prev" onClick={prevSlide}>&#10094;</button>
        <button className="carousel-control1 next" onClick={nextSlide}>&#10095;</button>
      </section>
    </div>
  );
};

export default Panoramas;