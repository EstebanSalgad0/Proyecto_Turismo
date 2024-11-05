import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InicioSesion from './components/InicioSesion';
import Bienvenida from './components/bienvenida';
import OlvideContrasena from './components/OlvideContrasena';
import Titulo from './pages/Index'; // Importa el componente Index
import ElMelado from './pages/Elmelado'; // Importa el componente ElMelado
import Pasopehuenche from './pages/Pasopehuenche';
import Colbunalto from './pages/Colbunalto';
import Colbun from './pages/Colbun';
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
import Cultura2 from './pages/Cultura2';
import Cultura3 from './pages/Cultura3';
import Cultura4 from './pages/Cultura4';
import Senderismo from './pages/Senderismo';
import Senderismo2 from './pages/Senderismo2';
import Senderismo3 from './pages/Senderismo3';
import Senderismo4 from './pages/Senderismo4';
import Parque from './pages/Parque';
import Termas from './pages/Termas';
import ZOIT from './pages/Zoit';
import Turismo from './pages/Turismo';
import OIT from './pages/OIT';
import Folleteria from './pages/Folleteria';
import SobreNosotros from './pages/SobreNosotros';
import Asociados from './pages/Asociados';
import Privacidad from './pages/Privacidad';
import Catastro from './pages/Catastro';
import Panoramas from './pages/Panoramas';
import Registrarse from '../src/components/registrarse';
import Verificacion from '../src/components/Verificacion';
import Footer from '../src/components/Footer';
import SocialSection from '../src/components/SocialSeccion';
import SolicitudOferente from './pages/solicitudOferente';
import ManejarSolicitudes from './pages/manejarSolicitudes';
import CrearServicio from './pages/crearServicio';
import ListarServicios from './pages/mostrarServicios';
import ListarServiciosPendientes from './pages/manejarServicios';
import Catastro_opiniones from './pages/Catastro_opiniones';
import LeafletMapMelado from '../src/components/LeafletMapMelado';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Titulo />} />
        <Route path="/login" element={<InicioSesion />} /> {/* Nueva ruta para InicioSesion */}
        <Route path="/bienvenida" element={<Bienvenida />} /> {/* Nueva ruta para Bienvenida */}
        <Route path="/OlvideContrasena" element={<OlvideContrasena />} /> {/* Nueva ruta para OlvideContraseña */}
        <Route path="/Index" element={<Titulo />} />
        <Route path="/ElMelado" element={<ElMelado />} /> {/* Nueva ruta para ElMelado */}
        <Route path="/Paso-pehuenche" element={<Pasopehuenche/>} />
        <Route path="/Colbun-alto" element={<Colbunalto/>} />
        <Route path="/Colbun" element={<Colbun/>} />
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
        <Route path="/Cultura2" element={<Cultura2/>} />
        <Route path="/Cultura3" element={<Cultura3/>} />
        <Route path="/Cultura4" element={<Cultura4/>} />
        <Route path="/Senderismo" element={<Senderismo/>} />
        <Route path="/Senderismo2" element={<Senderismo2/>} />
        <Route path="/Senderismo3" element={<Senderismo3/>} />
        <Route path="/Senderismo4" element={<Senderismo4/>} />
        <Route path="/Parque" element={<Parque/>} />
        <Route path="/Termas" element={<Termas/>} />
        <Route path="/Zoit" element={<ZOIT/>} />
        <Route path="/Turismo" element={<Turismo/>} />
        <Route path="/OIT" element={<OIT/>} />
        <Route path="/Folleteria" element={<Folleteria/>} />
        <Route path="/SobreNosotros" element={<SobreNosotros/>} />
        <Route path="/Asociados" element={<Asociados/>} />
        <Route path="/Privacidad" element={<Privacidad/>} />
        <Route path="/Catastro" element={<Catastro/>} />
        <Route path="/Panoramas" element={<Panoramas/>} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="/Verificacion" element={<Verificacion />} />
        <Route path="/solicitudOferente" element={<SolicitudOferente />} />
        <Route path="/manejarSolicitudes" element={<ManejarSolicitudes />} />
        <Route path="/crearServicios" element={<CrearServicio/>} />
        <Route path="/mostrarServicios" element={<ListarServicios/>} />
        <Route path="/manejarServicios" element={<ListarServiciosPendientes/>} />
        <Route path="/Catastro_opiniones" element={<Catastro_opiniones/>} />
        <Route path="/LeafletMapMelado" element={<LeafletMapMelado/>} />
      </Routes>

      <SocialSection />

      <Footer />
    </Router>
  );
};

export default App;
