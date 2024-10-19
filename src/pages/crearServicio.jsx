import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/crearServicio.css';
import ConfirmModal from '../components/ModalDelete';

const CrearServicio = () => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [redesSociales, setRedesSociales] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [servicios, setServicios] = useState([]); // Estado para listar los servicios
    const [editMode, setEditMode] = useState(false); // Modo de edición
    const [editServicioId, setEditServicioId] = useState(null); // ID del servicio que se está editando
    const [expandedServicio, setExpandedServicio] = useState(null);
    const [showModal, setShowModal] = useState(false); // Controlar si el modal está visible
    const [deleteServiceId, setDeleteServiceId] = useState(null);
    const [actionType, setActionType] = useState(''); // Controlar si es delete o edit
    const navigate = useNavigate(); // Hook para redireccionar

    // Función para obtener los servicios del oferente
    const fetchServicios = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8000/api/mis_servicios/', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            setServicios(response.data);
        } catch (error) {
            console.error("Error al obtener los servicios:", error);
        }
    };

    // Se ejecuta cuando el componente se monta para obtener los servicios
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

        try {
            const token = localStorage.getItem('token');
            let response;

            if (editMode) {
                // Si estamos en modo de edición, actualizamos el servicio
                response = await axios.put(`http://localhost:8000/api/mis_servicios/${editServicioId}/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Token ${token}`
                    },
                });
                setMensaje('Servicio actualizado exitosamente!');
            } else {
                // Si no estamos en modo de edición, creamos un nuevo servicio
                response = await axios.post('http://localhost:8000/api/crear_servicio/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Token ${token}`
                    },
                });
                setMensaje('Servicio creado exitosamente!');
            }
            fetchServicios(); // Refrescar la lista de servicios después de crear o editar
            setEditMode(false); // Volver al modo de creación
            setNombre('');
            setCorreo('');
            setRedesSociales('');
            setDescripcion('');
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
        setEditServicioId(servicio.id);
        setEditMode(true); // Cambiar a modo edición
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8000/api/mis_servicios/${deleteServiceId}/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            setMensaje('Servicio eliminado exitosamente!');
            fetchServicios();
            setShowModal(false); // Cerrar el modal después de eliminar
        } catch (error) {
            setMensaje('Error al eliminar el servicio: ' + (error.response?.data?.error || 'Error desconocido.'));
            console.error("Error al eliminar el servicio:", error);
        }
    };

    const handleReenviar = async (servicioId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:8000/api/reenviar_servicio/${servicioId}/`, { accion: 'reenviar' }, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            setMensaje('Servicio reenviado exitosamente!');
            fetchServicios(); // Refrescar la lista de servicios
        } catch (error) {
            setMensaje('Error al reenviar el servicio: ' + (error.response?.data?.error || 'Error desconocido.'));
            console.error("Error al reenviar el servicio:", error);
        }
    };
    

    const handleCreateNew = () => {
        // Restablece el formulario para crear un nuevo servicio
        setNombre('');
        setCorreo('');
        setRedesSociales('');
        setDescripcion('');
        setEditMode(false); // Cambiar a modo creación
    };

    const toggleExpand = (id) => {
        setExpandedServicio(expandedServicio === id ? null : id); // Toggle del expandir/colapsar
    };
    
    const confirmDelete = (id) => {
        setDeleteServiceId(id);
        setActionType('delete');
        setShowModal(true); // Mostrar el modal de confirmación
    };

    const confirmEdit = () => {
        setActionType('edit');
        setShowModal(true); // Mostrar el modal de confirmación para la actualización
    };

    const handleConfirmAction = () => {
        if (actionType === 'delete') {
            handleDelete();
        } else if (actionType === 'edit') {
            handleSubmit(); // Aquí se llama a handleSubmit solo después de confirmar
        }
        setShowModal(false); // Cerrar modal después de la acción
    };

    return (
        <div className="container">
            <div className="sidebar">
                <h1>{editMode ? 'Editar Servicio' : 'Crear Servicio'}</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    if (editMode) {
                        confirmEdit(); // Si estamos en modo edición, mostrar el modal
                    } else {
                        handleSubmit(e); // Si no es modo edición, crear directamente
                    }
                }}>
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre del Servicio" required />
                    <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Correo" required />
                    <input type="text" value={redesSociales} onChange={(e) => setRedesSociales(e.target.value)} placeholder="Redes Sociales" />
                    <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción" required />
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
                                <div>
                                    <button className="close-button" onClick={(e) => { e.stopPropagation(); toggleExpand(null); }}>X</button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Modal de Confirmación */}
            <ConfirmModal 
                show={showModal}
                message={actionType === 'delete' ? "¿Estás seguro de que quieres eliminar este servicio?" : "¿Estás seguro de que quieres actualizar este servicio?"}
                onConfirm={handleConfirmAction} 
                onCancel={() => setShowModal(false)} 
            />
        </div>
    );
};

export default CrearServicio;
