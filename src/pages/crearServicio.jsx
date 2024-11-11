import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/crearServicio.css';
import ConfirmModal from '../components/ModalDelete';
import Header from '../components/Header';

const CrearServicio = () => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [redesSociales, setRedesSociales] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState(null); // Estado para la imagen
    const [mensaje, setMensaje] = useState('');
    const [servicios, setServicios] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editServicioId, setEditServicioId] = useState(null);
    const [expandedServicio, setExpandedServicio] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [deleteServiceId, setDeleteServiceId] = useState(null);
    const [actionType, setActionType] = useState('');
    const [userName, setUserName] = useState('');
    const [showSidebar, setShowSidebar] = useState(false); 
    const [dragActive, setDragActive] = useState(false); // Estado para el arrastre
    const [showServiceListSidebar, setShowServiceListSidebar] = useState(false);

    const fetchServicios = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(import.meta.env.VITE_MIS_SERVICIOS_URL, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            setServicios(response.data);
        } catch (error) {
            console.error("Error al obtener los servicios:", error);
        }
    };

    useEffect(() => {
        const nameFromDatabase = 'P'; // Puedes obtener esto de tu backend o autenticación
        setUserName(nameFromDatabase);
      }, []);

    const getInitial = (name) => {
        return name ? name.charAt(0).toUpperCase() : '';
    };

    useEffect(() => {
        fetchServicios();
    }, []);
    

    const handleEditService = () => {
        setShowServiceListSidebar(true); // Muestra la barra lateral de selección de servicios
        setShowSidebar(false); // Asegúrate de que la barra de edición esté cerrada
        setEditMode(false); // Apaga el modo de edición inicial
    };
    
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            const url = `${import.meta.env.VITE_MIS_SERVICIOS_URL}${deleteServiceId}/`;
            await axios.delete(url, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            setMensaje('Servicio eliminado exitosamente!');
            fetchServicios();
            setShowModal(false);
        } catch (error) {
            setMensaje('Error al eliminar el servicio: ' + (error.response?.data?.error || 'Error desconocido.'));
            console.error("Error al eliminar el servicio:", error);
        }
    };

    const handleReenviar = async (servicioId) => {
        try {
            const token = localStorage.getItem('token');
            const url = `${import.meta.env.VITE_REENVIAR_SERVICIOS_URL}${servicioId}/`;
            await axios.post(url, { accion: 'reenviar' }, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            setMensaje('Servicio reenviado exitosamente!');
            fetchServicios();
        } catch (error) {
            setMensaje('Error al reenviar el servicio: ' + (error.response?.data?.error || 'Error desconocido.'));
            console.error("Error al reenviar el servicio:", error);
        }
    };

    const handleCreateNew = () => {
        setNombre('');
        setCorreo('');
        setRedesSociales('');
        setDescripcion('');
        setImagen(null);
        setEditMode(false);
    };

    const handleFileChange = (e) => {
        setImagen(e.target.files[0]); // Manejar el archivo de imagen seleccionado
    };

    const toggleExpand = (id) => {
        setExpandedServicio(expandedServicio === id ? null : id);
    };

    const confirmDelete = (id) => {
        setDeleteServiceId(id);
        setActionType('delete');
        setShowModal(true);
    };

    const confirmEdit = () => {
        setActionType('edit');
        setShowModal(true);
    };

    const handleConfirmAction = () => {
        if (actionType === 'delete') {
            handleDelete();
        } else if (actionType === 'edit') {
            handleSubmit();
        }
        setShowModal(false);
    };

    const handleToggleSidebar = () => {
        if (editMode) {
            setEditMode(false);
            setEditServicioId(null);
        }
        setNombre('');
        setCorreo('');
        setRedesSociales('');
        setDescripcion('');
        setImagen(null);
        setShowSidebar(!showSidebar);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };
    
    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };
    
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setImagen(file); // Actualiza la imagen con el archivo arrastrado
        }
    };

    const handleServiceClick = (servicio) => {
        setNombre(servicio.nombre);
        setCorreo(servicio.correo);
        setRedesSociales(servicio.redes_sociales);
        setDescripcion(servicio.descripcion);
        setEditServicioId(servicio.id);
        setShowServiceListSidebar(false); // Cierra la lista de servicios
        setShowSidebar(true); // Abre la barra lateral de edición
        setEditMode(true); // Activa el modo de edición
    };
    const handleNameChange = (e) => {
        const inputName = e.target.value;
        if (inputName.length <= 25) {
            setNombre(inputName);
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('correo', correo);
        formData.append('redes_sociales', redesSociales);
        formData.append('descripcion', descripcion);
        if (imagen) {
            formData.append('imagen', imagen);
        }
    
        try {
            const token = localStorage.getItem('token');
            let url;
            let method;
    
            if (editMode) {
                url = `${import.meta.env.VITE_MIS_SERVICIOS_URL}${editServicioId}/`;
                method = 'put';
            } else {
                url = import.meta.env.VITE_CREAR_SERVICIOS_URL;
                method = 'post';
            }
    
            await axios[method](url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${token}`
                }
            });
    
            setMensaje(editMode ? 'Servicio actualizado exitosamente!' : 'Servicio creado exitosamente!');
    
            fetchServicios();
            setEditMode(false);
            setNombre('');
            setCorreo('');
            setRedesSociales('');
            setDescripcion('');
            setImagen(null);
            setShowSidebar(false); // Cerrar sidebar tras envío exitoso
    
            // Limpiar mensaje de éxito después de 3 segundos
            setTimeout(() => setMensaje(''), 3000);
    
        } catch (error) {
            setMensaje('Error al crear o actualizar el servicio: ' + (error.response?.data?.error || 'Error desconocido.'));
            console.error("Error al crear o actualizar el servicio:", error);
        }
    };
    
    return (
        <div className="container">
            <Header />
    
            <div className="profile-container">
                <div className="avatar-container">
                    <div className="avatar-ser">
                        <span className="avatar-text-ser">{getInitial(userName)}</span>
                    </div>
                </div>
                <div className='FullName'>Aquí va el nombre</div>
                <div className='TipoRol'>Aquí va el rol</div>
                <div className='Contador'>Servicios creados: </div>
    
                <div className='ButtonsCRUD'>
                    <button onClick={handleToggleSidebar}>
                        <h5>Crear Servicios</h5>
                    </button>
                    <button onClick={handleEditService}>
                        <h5>Editar Servicios</h5>
                    </button>
                </div>
    
                {/* Sidebar para la lista de servicios a editar */}
                {showServiceListSidebar && (
                    <>
                        <div className="overlay" onClick={() => setShowServiceListSidebar(false)}></div>
                        <div className="service-list-sidebar">
                            <button className="close-button" onClick={() => setShowServiceListSidebar(false)}><p>X</p></button>
                            <h3>Selecciona un servicio para editar:</h3>
                            {servicios.map(servicio => (
                                <button 
                                    key={servicio.id} 
                                    className="service-item" 
                                    onClick={() => handleServiceClick(servicio)}
                                >
                                    {servicio.nombre}
                                </button>
                            ))}
                        </div>
                    </>
                )}
    
                {/* Sidebar para creación/edición de servicio */}
                {showSidebar && (
                    <>
                        <div className="overlay" onClick={() => setShowSidebar(false)}></div>
                        <div className="sidebar">
                            <img src="src/assets/img/icono.png" className="sidebar-img" />
    
                            <button className="close-button" onClick={() => setShowSidebar(false)}><p>X</p></button>
    
                            <h1>{editMode ? 'Editar Servicio' : 'Crear Servicio'}</h1>
                            <h3>¡Únete a la Creación de Servicios para Emprendedores!</h3>
    
                            <form onSubmit={handleSubmit}>
                                <label>Nombre del Servicio</label>
                                <input
                                    type="text"
                                    value={nombre}
                                    onChange={handleNameChange}
                                    placeholder="Nombre del Servicio"
                                    required
                                />
    
                                <label>Descripción del Servicio</label>
                                <textarea
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    placeholder="Descripción del Servicio"
                                    required
                                />
    
                                <label>Agrega una Imagen</label>
                                <div
                                    className={`file-upload-container ${dragActive ? 'drag-active' : ''}`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        id="file-upload"
                                        className="file-upload-input"
                                    />
                                    <label htmlFor="file-upload" className="file-upload-label">
                                        <div className="file-upload-content">
                                            <span className="file-upload-icon">↑</span>
                                            <p>Elige un archivo o arrástralo y colócalo aquí</p>
                                            <p className="file-upload-instructions">Recomendamos usar archivos .jpg de alta calidad con un tamaño inferior a 20 MB.</p>
                                        </div>
                                    </label>
                                </div>
    
                                <label>Contacto o Fono</label>
                                <textarea
                                    type="text"
                                    value={redesSociales}
                                    onChange={(e) => setRedesSociales(e.target.value)}
                                    placeholder="Contacto o Fono"
                                />
    
                                <label>Valor</label>
                                <input
                                    type="text"
                                    placeholder="Valor del Servicio"
                                />
    
                                <button type="submit">{editMode ? 'Actualizar Servicio' : 'Crear Servicio'}</button>
                                {mensaje && <p>{mensaje}</p>}
                            </form>
                        </div>
                    </>
                )}
    
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
                                    <button 
                                        className="reenviar" 
                                        onClick={(e) => { 
                                            e.stopPropagation(); 
                                            handleReenviar(servicio.id); 
                                        }}
                                    >
                                        <i className="bi bi-send-fill"></i>
                                    </button>
                                    <h3 className="service-title">{servicio.nombre}</h3>
                                    <h4 className='ser-descripcion'>{servicio.descripcion}</h4>
                                    <h5 className='Costo'>$$$</h5>
                                </div>
                            </div>
                        ))
                    )}
                </div>
    
                <ConfirmModal 
                    show={showModal}
                    message={actionType === 'delete' ? "¿Estás seguro de que quieres eliminar este servicio?" : "¿Estás seguro de que quieres actualizar este servicio?"}
                    onConfirm={handleConfirmAction} 
                    onCancel={() => setShowModal(false)} 
                />
            </div>    
        </div>
    );
};

export default CrearServicio;