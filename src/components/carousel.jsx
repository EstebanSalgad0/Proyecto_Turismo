import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useCarousel from './useCarousel';


// Importa las imágenes
import img1 from '/assets/img/PXL_20240927_102434354.jpg';
import img2 from '/assets/img/Cultural.png';
import img3 from '/assets/img/Parque.png';
import img4 from '/assets/img/PXL_20240927_112617725.jpg';
import img5 from '/assets/img/PXL_20240927_112819235.jpg';
import img6 from '/assets/img/PXL_20240927_120450869.jpg';
import img7 from '/assets/img/PXL_20240927_114154883.jpg';
import img8 from '/assets/img/PXL_20240927_102434354.jpg';

const Carousel = () => {
  const { t } = useTranslation();
  const { currentSlide, nextSlide, prevSlide } = useCarousel(4);

  // Definimos las imágenes y nombres del carrusel aquí mismo
  const slides = [
    { name: 'VizcachazViewpoint', image: img1 },
    { name: 'NationalPark', image: img2 },
    { name: 'CavesBellotos', image: img3 },
    { name: 'Reservoir', image: img4 },
    { name: 'Colbun', image: img5 },
    { name: 'HillViewpoint', image: img6 },
    { name: 'ToroWaterfall', image: img7 },
    { name: 'AnotherLocation', image: img8 },
  ];

  return (
    <section className="carousel-section1">
      {/* Header del carrusel */}
      <div className="carousel-header1">
        <h5>{t('Admire')}</h5>
        <div className="carousel-subheader1">
          <h2>{t('NaturalBeauty')}</h2>
          <Link to="/QueHacer">
            {t('ViewMore')}<span>&#8594;</span>
          </Link>
        </div>
      </div>

      {/* Carrusel de imágenes */}
      <div className="carousel-container1">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="carousel-card1"
            style={{
              transform: `translateX(-${currentSlide * (window.innerWidth <= 768 ? 113 : 130)}%)`
            }}
          >
            <img src={slide.image} alt={t(slide.name)} className="carousel-image1" />
            <p>{t(slide.name)}</p>
          </div>
        ))}
      </div>

      {/* Flechas de control */}
      <button className="carousel-control1 prev" onClick={prevSlide}>&#10094;</button>
      <button className="carousel-control1 next" onClick={nextSlide}>&#10095;</button>
    </section>
  );
};

export default Carousel;
