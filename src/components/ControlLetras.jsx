import React, { useState, useEffect } from 'react';

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
    <div className="mt-4">
      <button onClick={increaseFontSize} className="bg-blue-500 text-black p-2 m-2 rounded">
        Aumentar letra
      </button>
      <button onClick={decreaseFontSize} className="bg-red-500 text-black p-2 m-2 rounded">
        Reducir letra
      </button>
    </div>
  );
};

export default ControlLetras;
