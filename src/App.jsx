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
import QueHacer from './pages/QueHacer';
import Cultura from './pages/Cultura';
import Senderismo from './pages/Senderismo';
import Parque from './pages/Parque';
import Termas from './pages/Termas';
import ZOIT from './pages/Zoit';
import Registrarse from './pages/registrarse';
import Verificacion from './pages/Verificacion';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Titulo />} />
        <Route path="/login" element={<InicioSesion />} /> {/* Nueva ruta para InicioSesion */}
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
        <Route path="/QueHacer" element={<QueHacer/>} />
        <Route path="/Cultura" element={<Cultura/>} />
        <Route path="/Senderismo" element={<Senderismo/>} />
        <Route path="/Parque" element={<Parque/>} />
        <Route path="/Termas" element={<Termas/>} />
        <Route path="/Zoit" element={<ZOIT/>} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="/Verificacion" element={<Verificacion />} />
      </Routes>
    </Router>
  );
};

export default App;
