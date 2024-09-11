import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InicioSesion from './pages/InicioSesion';
import Titulo from './pages/Index'; // Importa el componente Index
import ElMelado from './pages/Elmelado'; // Importa el componente ElMelado
import Pasopehuenche from './pages/Pasopehuenche';
import Colbunalto from './pages/Colbunalto';
import Laguardia from './pages/Laguardia';
import Losboldos from './pages/Losboldos';
import Panimavida from './pages/Panimavida';
import Rari from './pages/Rari';
import Quinamavida from './pages/Quinamavida';
import Rabones from './pages/Rabones';
import Losbellotos from './pages/Losbellotos';
import Balnearios from './pages/Balnearios';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InicioSesion />} />
        <Route path="/Index" element={<Titulo />} />
        <Route path="/ElMelado" element={<ElMelado />} /> {/* Nueva ruta para ElMelado */}
        <Route path="/Paso-pehuenche" element={<Pasopehuenche/>} />
        <Route path="/Colbun-alto" element={<Colbunalto/>} />
        <Route path="/La-Guardia" element={<Laguardia/>} />
        <Route path="/Los-Boldos" element={<Losboldos/>} />
        <Route path="/Panimavida" element={<Panimavida/>} />
        <Route path="/Rari" element={<Rari/>} />
        <Route path="/Quinamavida" element={<Quinamavida/>} />
        <Route path="/Rabones" element={<Rabones/>} />
        <Route path="/Los-Bellotos" element={<Losbellotos/>} />
        <Route path="/Balneario-Machicura" element={<Balnearios/>} />
      </Routes>
    </Router>
  );
};

export default App;
