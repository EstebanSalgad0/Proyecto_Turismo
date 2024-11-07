// useCarousel.js
import { useState, useEffect, useCallback } from 'react';

const useCarousel = (initialTotalSlides) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(initialTotalSlides);

  // Función para actualizar el número total de slides en función del tamaño de la pantalla
  useEffect(() => {
    const updateTotalSlides = () => {
      if (window.innerWidth <= 768) {
        setTotalSlides(8); // Configura 8 slides para pantallas móviles
      } else {
        setTotalSlides(initialTotalSlides); // Usa el valor inicial para pantallas grandes
      }
    };

    updateTotalSlides(); // Llama a la función una vez al inicio
    window.addEventListener('resize', updateTotalSlides); // Escucha cambios de tamaño

    return () => window.removeEventListener('resize', updateTotalSlides); // Limpia el evento
  }, [initialTotalSlides]);

  // Funciones para avanzar y retroceder en el carrusel
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Desliza automáticamente cada 10 segundos
  useEffect(() => {
    const interval = setInterval(nextSlide, 10000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return { currentSlide, nextSlide, prevSlide, totalSlides };
};

export default useCarousel;