import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const CrearServicio = () => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [redesSociales, setRedesSociales] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate(); // Hook para redireccionar

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('correo', correo);
        formData.append('redes_sociales', redesSociales);
        formData.append('descripcion', descripcion);

        // Agregar logs para verificar los valores
        console.log("Nombre:", nombre);
        console.log("Correo:", correo);
        console.log("Redes Sociales:", redesSociales);
        console.log("Descripción:", descripcion);

        try {
            const token = localStorage.getItem('token');
            
            const response = await axios.post('http://localhost:8000/api/crear_servicio/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${token}` // Incluye el token en los encabezados
                },
            });
            setMensaje('Servicio creado exitosamente!');
            console.log("Servicio creado:", response.data);
            navigate('/mostrarServicios'); // Redirige a la lista de servicios después de crear
        } catch (error) {
            setMensaje('Error al crear el servicio: ' + (error.response?.data?.error || 'Error desconocido.'));
            console.error("Error al crear el servicio:", error);
        }
    };

    return (
        <div>
            <Header/>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        <form onSubmit={handleSubmit}>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre del Servicio" required />
            <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Correo" required />
            <input type="text" value={redesSociales} onChange={(e) => setRedesSociales(e.target.value)} placeholder="Redes Sociales" />
            <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción" required />
            <button type="submit">Crear Servicio</button>
            {mensaje && <p>{mensaje}</p>}
        </form>
        </div>
    );
};

export default CrearServicio;