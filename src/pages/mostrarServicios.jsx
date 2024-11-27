import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/mostrarServicios.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';

const ListarServicios = () => {
    const [servicios, setServicios] = useState([]);
    const [expandedServicio, setExpandedServicio] = useState(null); // Estado para gestionar la expansión

    useEffect(() => {
        const fetchServicios = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_MOSTRAR_SERVICIOS_URL);
                
                // Agregar console.log para inspeccionar la respuesta
                console.log('Servicios recibidos:', response.data);

                setServicios(response.data);
            } catch (error) {
                console.error('Error al obtener los servicios:', error);
            }
        };

        fetchServicios();
    }, []);

    // Función para transformar el tipo de oferente
const transformTipoOferente = (tipoOferente) => {
    switch (tipoOferente) {
        case 'bienesServicios':
            return 'Bienes y Servicios';
        case 'artesano': 
            return 'Artesano';
        case 'cabanas': 
            return 'Cabañas';
        default:
            return 'Administrador'; // Devuelve el valor original si no se encuentra una coincidencia
    }
};

    const toggleExpand = (id) => {
        setExpandedServicio(expandedServicio === id ? null : id); // Alterna el estado de expansión
    };

    return (
        <div className="services-list-container">
            <Header />
            <div className='services-list'>
                <br></br>
                <h1 className="services-title">Servicios Disponibles</h1>
                <br></br>
                <div className="services">
                    {servicios.length === 0 ? (
                        <p>No tienes servicios creados.</p>
                    ) : (
                        servicios.map(servicio => (
                            <div key={servicio.id} className="service-container">
                                <div 
                                    className={`service-card ${expandedServicio === servicio.id ? 'expanded2' : 'closed'}`}
                                    onClick={() => toggleExpand(servicio.id)}
                                >
                                    {expandedServicio === servicio.id && (
                                        <div className="service-header">
                                            <h1 className="service-title1">{servicio.nombre}</h1>
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
        {/* Contenedor de los campos de texto */}
        <div className="service-text">
            <p className="service-description">
                <strong>Descripción:</strong> <span>{servicio.descripcion}</span>
            </p>

            <div className="service-contact1">
                <strong>Redes Sociales:</strong> 
                <span 
                    dangerouslySetInnerHTML={{
                        __html: servicio.redes_sociales.replace(/\n/g, '<br />')
                    }}
                />
            </div>
            <p className="service-email1">
                <strong>Contacto:</strong> <span>{servicio.telefono || 'No disponible'}</span>
            </p>
            <p className="service-price1">
                <strong>Valor:</strong> <span>${servicio.precio ? Math.round(servicio.precio) : 'No disponible'}</span>
            </p>
            <p className="service-price1">
                <strong>Oferente:</strong> <span>{transformTipoOferente(servicio.tipo_oferente) || 'No disponible'}</span>
            </p>
        </div>

        {/* Contenedor de la galería de imágenes */}
        <div 
            className={`expanded-gallery1 ${
                servicio.imagen && servicio.imagen2 && servicio.imagen3 && servicio.imagen4
                    ? 'four-images'
                    : servicio.imagen && servicio.imagen2 && servicio.imagen3
                    ? 'three-images'
                    : servicio.imagen && servicio.imagen2
                    ? 'two-images'
                    : 'single-image'
            }`}
        >
            {servicio.imagen && (
                <img 
                    src={`${import.meta.env.VITE_BACKEND_URL}${servicio.imagen}`} 
                    alt={`Imagen de ${servicio.nombre}`} 
                    className="expanded-gallery-image1" 
                    onError={() => console.error(`Error al cargar la imagen: ${servicio.imagen}`)} 
                />
            )}
            {servicio.imagen2 && (
                <img 
                    src={`${import.meta.env.VITE_BACKEND_URL}${servicio.imagen2}`} 
                    alt={`Imagen 2 de ${servicio.nombre}`} 
                    className="expanded-gallery-image1" 
                    onError={() => console.error(`Error al cargar la imagen: ${servicio.imagen2}`)} 
                />
            )}
            {servicio.imagen3 && (
                <img 
                    src={`${import.meta.env.VITE_BACKEND_URL}${servicio.imagen3}`} 
                    alt={`Imagen 3 de ${servicio.nombre}`} 
                    className="expanded-gallery-image1" 
                    onError={() => console.error(`Error al cargar la imagen: ${servicio.imagen3}`)} 
                />
            )}
            {servicio.imagen4 && (
                <img 
                    src={`${import.meta.env.VITE_BACKEND_URL}${servicio.imagen4}`} 
                    alt={`Imagen 4 de ${servicio.nombre}`} 
                    className="expanded-gallery-image1" 
                    onError={() => console.error(`Error al cargar la imagen: ${servicio.imagen4}`)} 
                />
            )}
            {/* Si no hay imágenes disponibles */}
            {!servicio.imagen && !servicio.imagen2 && !servicio.imagen3 && !servicio.imagen4 && (
                <p>No hay imágenes disponibles</p>
            )}
        </div>
    </div>
)}
                                </div>
                                <div className='DownCard'>
                                    <h3 className="service-title">{servicio.nombre}</h3>
                                    <h5 className='TipoOferente'>{transformTipoOferente(servicio.tipo_oferente) || 'Tipo no disponible'}</h5>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <SocialSection/>
            <Footer/>
        </div>
    );
};

export default ListarServicios;