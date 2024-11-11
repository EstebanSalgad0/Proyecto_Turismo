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
            <div className='services-list'>
                <h1 className="services-title">Servicios Disponibles</h1>
                <div className="services">
                    {servicios.length === 0 ? (
                        <p>No tienes servicios creados.</p>
                    ) : (
                        servicios.map(servicio => (
                            <div key={servicio.id} className="service-container">
                                <div 
                                    className={`service-card ${expandedServicio === servicio.id ? 'expanded' : 'closed'}`}
                                    onClick={() => toggleExpand(servicio.id)}
                                >
                                    {expandedServicio === servicio.id && (
                                        <div className="service-header">
                                            <h1 className="service-title">{servicio.nombre}</h1>
                                            
                                        </div>
                                        
                                    )}
                                    <button className="close-button" onClick={(e) => { e.stopPropagation(); toggleExpand(null); }}>
                                        <p>X</p>
                                    </button>

                                    <div className="image-gallery">
                                        {servicio.imagen ? (
                                            <img 
                                                src={`${import.meta.env.VITE_BACKEND_URL}${servicio.imagen}`} 
                                                alt={`Imagen de ${servicio.nombre}`} 
                                                className="gallery-image" 
                                                onError={() => console.error(`Error al cargar la imagen: ${servicio.imagen}`)} 
                                            />
                                        ) : (
                                            <p>No hay imágenes disponibles</p>
                                        )}
                                    </div>
    
                                    {expandedServicio === servicio.id && (
                                        <div className="service-details">
                                            <p className="service-description">
                                                <strong>Descripción:</strong> <span>{servicio.descripcion}</span>
                                            </p>

                                            <div className="service-contact">
                                                <strong>Contacto:</strong> 
                                                <span 
                                                    dangerouslySetInnerHTML={{
                                                        __html: servicio.redes_sociales.replace(/\n/g, '<br />')
                                                    }}
                                                />
                                            </div>
                                            <p className="service-email">
                                                <strong>Correo:</strong> <span>{servicio.correo || 'No disponible'}</span>
                                            </p>
                                            <p className="service-price">
                                                <strong>Valor:</strong> <span>{servicio.valor || 'No disponible'}</span>
                                            </p>
                                        </div>                                    
                                    )}
                                </div>
                                <div className='DownCard'>
                                    <h3 className="service-title">{servicio.nombre}</h3>
                                    <h5 className='TipoOferente'>{servicio.tipo_oferente || 'Tipo no disponible'}</h5>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            
        </div>
    );
};

export default ListarServicios;