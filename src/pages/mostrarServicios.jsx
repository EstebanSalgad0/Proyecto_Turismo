import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListarServicios = () => {
    const [servicios, setServicios] = useState([]);

    useEffect(() => {
        const fetchServicios = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/listar_servicios_aceptados/');
                setServicios(response.data);
            } catch (error) {
                console.error('Error al obtener los servicios:', error);
            }
        };

        fetchServicios();
    }, []);

    return (
        <div>
            <h1>Servicios Aceptados</h1>
            <ul>
                {servicios.map((servicio) => (
                    <li key={servicio.id}>
                        <h2>{servicio.nombre}</h2>
                        <p>Descripción: {servicio.descripcion}</p>
                        <p>Correo: {servicio.correo}</p>
                        <p>Redes Sociales: {servicio.redes_sociales}</p>
                        <p>Valoración: {servicio.valoracion}</p>
                        {/* Aquí puedes agregar las imágenes y más detalles */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListarServicios;
