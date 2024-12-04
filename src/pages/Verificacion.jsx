import { useState, useEffect } from 'react';
import '../styles/Verificacion.css'
import { useNavigate } from 'react-router-dom';


const Verificacion = () => {
  const [userName, setUserName] = useState('');

  // Simulación: Cambiar este valor para probar
  useEffect(() => {
    const nameFromDatabase = 'Alejandro'; // Puedes obtener esto de tu backend o autenticación
    setUserName(nameFromDatabase);
  }, []);

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  const navigate = useNavigate();

  return (
    <div className='wrapper-container-veri'>
       <div className="verificacion-container">
           <div className="avatar">
               <span className="avatar-text">{getInitial(userName)}</span>
           </div>

           <h1 className='h1-veri'>Te damos la bienvenida <br /> a Cultura y Turismo</h1>

           <p className="subtitle">¡Conviértete a Colbún en tu próxima aventura!<br />
           Te damos la bienvenida a la comuna</p>

           <button onClick={() => navigate('/')} className="start-btn">
               ¡Comienza tu aventura!
           </button>
       </div>
   </div>
  );
};

export default Verificacion;
