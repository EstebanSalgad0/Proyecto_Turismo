import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/mostrarServicios.css';
import Header from '../components/Header';

const ListarServicios = () => {
    const [servicios, setServicios] = useState([]);
    const [expandedServicio, setExpandedServicio] = useState(null); // Estado para gestionar la expansión

    useEffect(() => {
        const fetchServicios = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_MOSTRAR_SERVICIOS_URL);
                setServicios(response.data);
            } catch (error) {
                console.error('Error al obtener los servicios:', error);
            }
        };

        fetchServicios();
    }, []);

    const toggleExpand = (id) => {
        setExpandedServicio(expandedServicio === id ? null : id); // Alterna el estado de expansión
    };

    return (
        <div className="services-list-container">
            <Header/>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h1 className="services-title">Servicios Disponibles</h1>
            <div className="services-grid">
                {servicios.map((servicio) => (
                    <div 
                        key={servicio.id} 
                        className={`service-card ${expandedServicio === servicio.id ? 'service-card-expanded' : ''}`}
                        onClick={() => toggleExpand(servicio.id)}
                    >
                        <h2 className="service-name">{servicio.nombre}</h2>

                        {/* Debugging: log the image URL */}
                        {console.log(servicio.imagen)}

                        {/* Renderizar la imagen */}
                        {servicio.imagen && (
                        <img 
                            src={`${import.meta.env.VITE_BACKEND_URL}${servicio.imagen}`} // Asumiendo que tienes esta variable de entorno configurada
                            alt={`Imagen de ${servicio.nombre}`} 
                            className="service-image" 
                            onError={() => console.error(`Error al cargar la imagen: ${servicio.imagen}`)} 
                        />
                        )}

                        <p className="service-description">Descripción: {servicio.descripcion}</p>
                        {expandedServicio === servicio.id && (
                            <div className="service-extra-details">
                                <p>Correo: {servicio.correo}</p>
                                <p>Redes Sociales: {servicio.redes_sociales}</p>
                                <p>Valoración: {servicio.valoracion}</p>
                                {/* Aquí puedes agregar las imágenes u otros detalles */}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListarServicios;