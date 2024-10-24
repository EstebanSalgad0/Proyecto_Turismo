import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const CrearServicio = () => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [redesSociales, setRedesSociales] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [servicios, setServicios] = useState([]); // Estado para listar los servicios
    const [editMode, setEditMode] = useState(false); // Modo de edición
    const [editServicioId, setEditServicioId] = useState(null); // ID del servicio que se está editando
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
        // Establecer los valores del formulario con los datos del servicio a editar
        setNombre(servicio.nombre);
        setCorreo(servicio.correo);
        setRedesSociales(servicio.redes_sociales);
        setDescripcion(servicio.descripcion);
        setEditServicioId(servicio.id);
        setEditMode(true); // Cambiar a modo edición
    };

    const handleDelete = async (servicioId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8000/api/mis_servicios/${servicioId}/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            setMensaje('Servicio eliminado exitosamente!');
            fetchServicios(); // Refrescar la lista de servicios
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

    return (
        <div>
            <Header/>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h1>{editMode ? 'Editar Servicio' : 'Crear Servicio'}</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre del Servicio" required />
                <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Correo" required />
                <input type="text" value={redesSociales} onChange={(e) => setRedesSociales(e.target.value)} placeholder="Redes Sociales" />
                <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción" required />
                <button type="submit">{editMode ? 'Actualizar Servicio' : 'Crear Servicio'}</button>
                {editMode && <button type="button" onClick={handleCreateNew}>Crear Nuevo Servicio</button>} {/* Botón para volver al modo de creación */}
                {mensaje && <p>{mensaje}</p>}
            </form>

            <h2>Mis Servicios</h2>
            {servicios.length === 0 ? (
                <p>No tienes servicios creados.</p>
            ) : (
                <ul>
                    {servicios.map(servicio => (
                        <li key={servicio.id}>
                            <h3>{servicio.nombre}</h3>
                            <p>{servicio.descripcion}</p>
                            <button onClick={() => handleEdit(servicio)}>Editar</button>
                            <button onClick={() => handleDelete(servicio.id)}>Eliminar</button>
                            {/* Botón "Reenviar" solo si el servicio no ha sido aceptado */}
                            {servicio.estado !== 'aceptado' && (
                                <button onClick={() => handleReenviar(servicio.id)}>Reenviar</button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CrearServicio;