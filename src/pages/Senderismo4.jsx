import { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Senderismo.css?v=2.0';// Estilos específicos para el componente
import Header from '../components/Header';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';

const Senderismo = () => {
  const [currentSlide, setCurrentSlide] = useState(0); // Estado para el slide actual, comenzando en 0
  const { t, i18n } = useTranslation(); // Hook para usar traducciones

  // Guardar el idioma seleccionado en localStorage y cargarlo al inicio
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  // Array de nombres de los slides para el carrusel
  const slideNames = [
    'VizcachazViewpoint',
    'NationalPark',
    'CavesBellotos',
    'Reservoir',
    'Test1',
    'Test2',
    'Test3'
  ];

  // Función para manejar las flechas del carrusel
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slideNames.length);
  }, [slideNames.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideNames.length) % slideNames.length);
  };

  // Configuración para deslizar automáticamente cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="index-container">
      {/* Navbar */}
      <Header />

      {/* Hero Section 1 */}
      <div className="hero16">
        <div className="hero-content16">
          <h5>{t('Hike')}</h5>
          <h1 id='volcan'>{t('Volcano')}</h1>
          <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos ab ipsa magni asperiores magnam adipisci earum nemo nisi iure voluptate culpa nihil dolores, possimus animi sapiente natus doloribus! Iste, aliquid!</h4>
        </div>
      </div>

      {/* Info Section 1 */}
      <section className="info-section">
        <div className="info-content">
          <h5>{t('UnforgettablePlaces')}</h5>
          <h1>{t('Remember')}</h1>
          <p>{t('ColbunBeauty')}</p>
          <button className="btn-blue">{t('Discover')}</button>
        </div>
      </section>

      {/* Hero Section 2 */}
      <div className="hero16">
        <div className="hero-content16">
          <h5>{t('Hike')}</h5>
          <h1 id='mirador'>{t('VizcachazViewpoint')}</h1>
          <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos ab ipsa magni asperiores magnam adipisci earum nemo nisi iure voluptate culpa nihil dolores, possimus animi sapiente natus doloribus! Iste, aliquid!</h4>
        </div>
      </div>

      {/* Info Section 2 */}
      <section className="info-section">
        <div className="info-content">
          <h5>{t('UnforgettablePlaces')}</h5>
          <h1>{t('Remember')}</h1>
          <p>{t('ColbunBeauty')}</p>
          <button className="btn-blue">{t('Discover')}</button>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="carousel-section1">
        <div className="carousel-header1">
          <h5>{t('Admire')}</h5>
          <div className="carousel-subheader1">
            <h2>{t('NaturalBeauty')}</h2>
            <a href="#">{t('ViewMore')}<span>&#8594;</span></a>
          </div>
        </div>

        {/* Carrusel de imágenes */}
        <div className="carousel-container1">
          {slideNames.map((slideName, index) => (
            <div
              key={index}
              className="carousel-card1"
              style={{
                transform: `translateX(-${currentSlide * (window.innerWidth <= 768 ? 113 : 40)}%)`
              }}
            >
              <div className="carousel-image1"></div>
              <p>{t(slideName)}</p>
            </div>
          ))}
        </div>

        {/* Flechas de control */}
        <button className="carousel-control1 prev" onClick={prevSlide}>&#10094;</button>
        <button className="carousel-control1 next" onClick={nextSlide}>&#10095;</button>
      </section>
    </div>
  );
};

export default Senderismo;