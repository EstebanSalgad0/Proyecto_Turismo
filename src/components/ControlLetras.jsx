import { useState, useEffect } from 'react';
import '../styles/Botones_tamano.css'; // Estilos específicos para el componente

const ControlLetras = () => {
  const [fontSize, setFontSize] = useState(16); // Tamaño de fuente inicial

  // Función para aumentar el tamaño de la fuente
  const increaseFontSize = () => {
    setFontSize((prevSize) => (prevSize < 32 ? prevSize + 2 : prevSize)); // Máximo 32px
  };

  // Función para disminuir el tamaño de la fuente
  const decreaseFontSize = () => {
    setFontSize((prevSize) => (prevSize > 12 ? prevSize - 2 : prevSize));
  };

  // Aplicar el tamaño de la fuente a todo el documento
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  return (
    <>
      <button onClick={decreaseFontSize} className="btn-floating left">
        <span className="icon">-</span> {/* Icono de menos */}
      </button>
      <button onClick={increaseFontSize} className="btn-floating right">
        <span className="icon">+</span> {/* Icono de más */}
      </button>
    </>
  );
};

export default ControlLetras;
