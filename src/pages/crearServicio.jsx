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
    const [telefono, setTelefono] = useState(''); // Nuevo estado para el teléfono
    const [precio, setPrecio] = useState(''); // Nuevo estado para el precio
    const [imagen, setImagen] = useState(null); // Estado para la imagen
    const [mensaje, setMensaje] = useState('');
    const [servicios, setServicios] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editServicioId, setEditServicioId] = useState(null);
    const [expandedServicio, setExpandedServicio] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [deleteServiceId, setDeleteServiceId] = useState(null);
    const [actionType, setActionType] = useState('');

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
        fetchServicios();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('correo', correo);
        formData.append('redes_sociales', redesSociales);
        formData.append('descripcion', descripcion);
        formData.append('telefono', telefono); // Añadir teléfono al FormData
        formData.append('precio', precio); // Añadir precio al FormData
        if (imagen) {
            formData.append('imagen', imagen); // Adjuntar la imagen al FormData
        }

        try {
            const token = localStorage.getItem('token');

            if (editMode) {
                const url = `${import.meta.env.VITE_MIS_SERVICIOS_URL}${editServicioId}/`;
                await axios.put(url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Token ${token}`
                    },
                });
                setMensaje('Servicio actualizado exitosamente!');
            } else {
                await axios.post(import.meta.env.VITE_CREAR_SERVICIOS_URL, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Token ${token}`
                    },
                });
                setMensaje('Servicio creado exitosamente!');
            }
            fetchServicios();
            setEditMode(false);
            setNombre('');
            setCorreo('');
            setRedesSociales('');
            setDescripcion('');
            setTelefono(''); // Limpiar el estado del teléfono
            setPrecio(''); // Limpiar el estado del precio
            setImagen(null); // Limpiar el estado de la imagen
        } catch (error) {
            setMensaje('Error al crear o actualizar el servicio: ' + (error.response?.data?.error || 'Error desconocido.'));
            console.error("Error al crear o actualizar el servicio:", error);
        }
    };

    const handleEdit = (servicio) => {
        setNombre(servicio.nombre);
        setCorreo(servicio.correo);
        setRedesSociales(servicio.redes_sociales);
        setDescripcion(servicio.descripcion);
        setTelefono(servicio.telefono); // Cargar el teléfono al estado
        setPrecio(servicio.precio); // Cargar el precio al estado
        setEditServicioId(servicio.id);
        setEditMode(true);
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
        setTelefono('');
        setPrecio('');
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

    return (
        <div className="container">
            <Header/>
            <div className="sidebar">
                <h1>{editMode ? 'Editar Servicio' : 'Crear Servicio'}</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    if (editMode) {
                        confirmEdit();
                    } else {
                        handleSubmit(e);
                    }
                }}>
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre del Servicio" required />
                    <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Correo" required />
                    <input type="text" value={redesSociales} onChange={(e) => setRedesSociales(e.target.value)} placeholder="Redes Sociales" />
                    <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción" required />
                    <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Teléfono" required /> {/* Campo de teléfono */}
                    <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="Precio" required /> {/* Campo de precio */}
                    <input type="file" onChange={handleFileChange} accept="image/*" />
                    <button type="submit">{editMode ? 'Actualizar Servicio' : 'Crear Servicio'}</button>
                    {editMode && <button type="button" onClick={handleCreateNew}>Crear Nuevo Servicio</button>}
                    {mensaje && <p>{mensaje}</p>}
                </form>
            </div>

            <div className="services">
    {servicios.length === 0 ? (
        <p>No tienes servicios creados.</p>
    ) : (
        servicios.map(servicio => (
            <div key={servicio.id} 
                className={`service-card ${expandedServicio === servicio.id ? 'expanded' : ''}`}
                onClick={() => toggleExpand(servicio.id)}
            >
                <h3>{servicio.nombre}</h3>
                <p>{servicio.descripcion}</p>
                
                {expandedServicio !== servicio.id && (
                    <div className="card-buttons">
                        <button className="reenviar" onClick={(e) => { e.stopPropagation(); handleReenviar(servicio.id); }}>
                        <i className="bi bi-send-fill"></i></button>
                        <button className="editar" onClick={(e) => { e.stopPropagation(); handleEdit(servicio); }}> 
                        <i className="bi bi-pencil-fill"></i></button>
                        <button className="borrar" onClick={(e) => { e.stopPropagation(); confirmDelete(servicio.id); }}> 
                        <i className="bi bi-trash-fill"></i></button>
                    </div>
                )}
                
                {expandedServicio === servicio.id && (
                    <>
                        <p>Correo: {servicio.correo}</p>
                        <p>Redes Sociales: {servicio.redes_sociales}</p>
                        <p>Teléfono: {servicio.telefono}</p>
                        <p>Precio: {servicio.precio}</p>
                        {servicio.imagen && (
                            <img 
                                src={`${import.meta.env.VITE_BACKEND_URL}${servicio.imagen}`} 
                                alt={`Imagen de ${servicio.nombre}`} 
                                className="service-image" 
                                onError={() => console.error(`Error al cargar la imagen: ${servicio.imagen}`)} 
                            />
                        )}
                    </>
                )}
            </div>
        ))
    )}
</div>

            {showModal && (
                <ConfirmModal 
                    show={showModal} 
                    onHide={() => setShowModal(false)} 
                    onConfirm={handleConfirmAction} 
                    message={actionType === 'delete' ? '¿Estás seguro de que deseas eliminar este servicio?' : '¿Deseas guardar los cambios?'}
                />
            )}
        </div>
    );
};

export default CrearServicio;