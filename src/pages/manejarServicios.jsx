import { Link, useNavigate } from 'react-router-dom'; 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const ListarServiciosPendientes = () => {
    const [servicios, setServicios] = useState([]);
    const [mensaje, setMensaje] = useState('');

    const fetchServicios = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8000/api/manejar_servicios/', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            console.log(response.data);
            setServicios(response.data);
        } catch (error) {
            console.error('Error al obtener servicios:', error);
        }
    };

    useEffect(() => {
        fetchServicios(); // Llamar a fetchServicios al cargar el componente
    }, []);

    const handleAcceptService = async (servicioId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:8000/api/manejar_servicios/${servicioId}/`, {
                accion: 'aceptar'
            }, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            console.log(response.data);
            setMensaje('Servicio aceptado con éxito.'); // Mensaje de éxito
            await fetchServicios(); // Re-fetch the services after accepting one
        } catch (error) {
            setMensaje('Error al aceptar el servicio.'); // Mensaje de error
            console.error('Error al manejar el servicio:', error);
        }
    };

    const handleRejectService = async (servicioId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:8000/api/manejar_servicios/${servicioId}/`, {
                accion: 'rechazar'
            }, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            console.log(response.data);
            setMensaje('Servicio rechazado con éxito.'); // Mensaje de éxito
            await fetchServicios(); // Re-fetch the services after rejecting one
        } catch (error) {
            setMensaje('Error al rechazar el servicio.'); // Mensaje de error
            console.error('Error al manejar el servicio:', error);
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
            <h1>Servicios Pendientes</h1>
            {mensaje && <p>{mensaje}</p>}
            {servicios.length === 0 ? (
                <p>No hay servicios pendientes.</p> // Mensaje si no hay servicios
            ) : (
                <ul>
                    {servicios.map(servicio => (
                        <div key={servicio.id}>
                            <span>{servicio.nombre}</span>
                            <button onClick={() => handleAcceptService(servicio.id)}>Aceptar</button>
                            <button onClick={() => handleRejectService(servicio.id)}>Rechazar</button>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ListarServiciosPendientes;