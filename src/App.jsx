import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InicioSesion from './pages/InicioSesion';
// import Index from './pages/Index'; // Importa el componente Index
import Titulo from './pages/Index';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InicioSesion />} />
        <Route path="/Index" element={<Titulo />} /> {/* Ruta para la página en blanco */}
      </Routes>
    </Router>
  );
};

export default App;
