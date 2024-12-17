import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/crearServicio.css";
import ConfirmModal from "../components/ModalDelete";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SocialSection from "../components/SocialSeccion";
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';

const CrearServicio = () => {
  const [nombre, setNombre] = useState("");
  const [redesSociales, setRedesSociales] = useState("");
  const [userTipoOferente, setUserTipoOferente] = useState("");
  const [precio, setPrecio] = useState(""); // Nuevo estado para el precio
  const [descripcion, setDescripcion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [imagen, setImagen] = useState(null); // Estado para la imagen
  const [imagenPreview, setImagenPreview] = useState(null); // Estado para la vista previa de la imagen
  const [imagen2, setImagen2] = useState(null); // Estado para la imagen
  const [imagenPreview2, setImagenPreview2] = useState(null); // Estado para la vista previa de la imagen
  const [imagen3, setImagen3] = useState(null); // Estado para la imagen
  const [imagenPreview3, setImagenPreview3] = useState(null); // Estado para la vista previa de la imagen
  const [imagen4, setImagen4] = useState(null); // Estado para la imagen
  const [imagenPreview4, setImagenPreview4] = useState(null); // Estado para la vista previa de la imagen
  const [mensaje, setMensaje] = useState("");
  const [servicios, setServicios] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editServicioId, setEditServicioId] = useState(null);
  const [expandedServicio, setExpandedServicio] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteServiceId, setDeleteServiceId] = useState(null);
  const [actionType, setActionType] = useState("");
  const [userName, setUserName] = useState();
  const [showSidebar, setShowSidebar] = useState(false);
  const [dragActive, setDragActive] = useState(false); // Estado para el arrastre
  const [dragActive2, setDragActive2] = useState(false); // Estado para el arrastre
  const [dragActive3, setDragActive3] = useState(false); // Estado para el arrastre
  const [dragActive4, setDragActive4] = useState(false); // Estado para el arrastre
  const [showServiceListSidebar, setShowServiceListSidebar] = useState(false);
  const { t, i18n } = useTranslation(); // Hook para usar traducciones

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language'); // Obtener el idioma guardado
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage); // Cambiar el idioma si es necesario
    }
  }, [i18n]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        // Llama a tu endpoint de usuario para obtener los detalles
        const response = await axios.get(
          'https://790cebce69f947b6e00a5ba226c8389a.loophole.site/user/details/',
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        // Desestructura la respuesta para obtener el nombre completo y tipo_oferente
        const { first_name, last_name, tipo_oferente } = response.data;
        setUserName(
          first_name && last_name
            ? `${first_name} ${last_name}`
            : "Administrador de Servicios"
        ); // Asigna nombre o 'A'
        setUserTipoOferente(tipo_oferente); // Asigna el tipo de oferente
      } catch (error) {
        console.error("Error al obtener los detalles del usuario:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const fetchServicios = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get('https://790cebce69f947b6e00a5ba226c8389a.loophole.site/api/mis_servicios/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setServicios(response.data);
    } catch (error) {
      console.error("Error al obtener los servicios:", error);
    }
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
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
      const token = localStorage.getItem("token");
      const url = `${
        'https://790cebce69f947b6e00a5ba226c8389a.loophole.site/api/mis_servicios/'
      }${deleteServiceId}/`;
      await axios.delete(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setMensaje("Servicio eliminado exitosamente!");
      fetchServicios();
      setShowModal(false);
    } catch (error) {
      setMensaje(
        "Error al eliminar el servicio: " +
          (error.response?.data?.error || "Error desconocido.")
      );
      console.error("Error al eliminar el servicio:", error);
    }
  };

  const handleReenviar = async (servicioId) => {
    try {
      const token = localStorage.getItem("token");
      const url = `${
        'https://790cebce69f947b6e00a5ba226c8389a.loophole.site/api/reenviar_servicio/'
      }${servicioId}/`;
      await axios.post(
        url,
        { accion: "reenviar" },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setMensaje("Servicio reenviado exitosamente!");
      fetchServicios();
    } catch (error) {
      setMensaje(
        "Error al reenviar el servicio: " +
          (error.response?.data?.error || "Error desconocido.")
      );
      console.error("Error al reenviar el servicio:", error);
    }
  };

  const transformTipoOferente = (tipoOferente) => {
    switch (tipoOferente) {
      case "bienesServicios":
        return t('bienesServiciosTraducido');
      case "artesano":
        return t('ArtesanoTraducido');
      case "cabanas":
        return t('CabanasTraducido');
      default:
        return "Administrador"; // Devuelve el valor original si no se encuentra una coincidencia
    }
  };

  // Actualización: Manejo de archivos
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file); // Guardamos el archivo original para el backend
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result); // Guardamos la URL base64 solo para la vista previa
      };
      reader.readAsDataURL(file); // Leer el archivo como base64 para la vista previa
    }
  };

  // Actualización: Manejo de archivos
  const handleFileChange2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen2(file); // Guardamos el archivo original para el backend
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview2(reader.result); // Guardamos la URL base64 solo para la vista previa
      };
      reader.readAsDataURL(file); // Leer el archivo como base64 para la vista previa
    }
  };

  // Actualización: Manejo de archivos
  const handleFileChange3 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen3(file); // Guardamos el archivo original para el backend
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview3(reader.result); // Guardamos la URL base64 solo para la vista previa
      };
      reader.readAsDataURL(file); // Leer el archivo como base64 para la vista previa
    }
  };

  // Actualización: Manejo de archivos
  const handleFileChange4 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen4(file); // Guardamos el archivo original para el backend
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview4(reader.result); // Guardamos la URL base64 solo para la vista previa
      };
      reader.readAsDataURL(file); // Leer el archivo como base64 para la vista previa
    }
  };

  const toggleExpand = (id) => {
    setExpandedServicio(expandedServicio === id ? null : id);
  };

  const confirmDelete = (id) => {
    setDeleteServiceId(id);
    setActionType("delete");
    setShowModal(true);
  };

  const handleConfirmAction = () => {
    if (actionType === "delete") {
      handleDelete();
    } else if (actionType === "edit") {
      handleSubmit();
    }
    setShowModal(false);
  };

  const handleToggleSidebar = () => {
    if (editMode) {
      setEditMode(false);
      setEditServicioId(null);
    }
    setNombre("");
    setRedesSociales("");
    setDescripcion("");
    setTelefono("");
    setPrecio("");
    setImagen(null);
    setImagen2(null);
    setImagen3(null);
    setImagen4(null);
    setShowSidebar(!showSidebar);
  };

  // Actualización: Manejo del arrastre
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
      setImagen(file); // Guardamos el archivo original para el backend
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result); // Guardamos la URL base64 solo para la vista previa
      };
      reader.readAsDataURL(file); // Leer el archivo como base64 para la vista previa
    }
  };

  // Actualización: Manejo del arrastre
  const handleDragOver2 = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive2(true);
  };

  const handleDragLeave2 = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive2(false);
  };

  const handleDrop2 = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive2(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setImagen(file); // Guardamos el archivo original para el backend
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result); // Guardamos la URL base64 solo para la vista previa
      };
      reader.readAsDataURL(file); // Leer el archivo como base64 para la vista previa
    }
  };

  // Actualización: Manejo del arrastre
  const handleDragOver3 = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive3(true);
  };

  const handleDragLeave3 = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive3(false);
  };

  const handleDrop3 = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive3(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setImagen(file); // Guardamos el archivo original para el backend
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result); // Guardamos la URL base64 solo para la vista previa
      };
      reader.readAsDataURL(file); // Leer el archivo como base64 para la vista previa
    }
  };

  // Actualización: Manejo del arrastre
  const handleDragOver4 = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive4(true);
  };

  const handleDragLeave4 = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive4(false);
  };

  const handleDrop4 = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive4(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setImagen(file); // Guardamos el archivo original para el backend
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result); // Guardamos la URL base64 solo para la vista previa
      };
      reader.readAsDataURL(file); // Leer el archivo como base64 para la vista previa
    }
  };

  const handleServiceClick = (servicio) => {
    setNombre(servicio.nombre);
    setRedesSociales(servicio.redes_sociales);
    setDescripcion(servicio.descripcion);
    setTelefono(servicio.telefono);
    setPrecio(servicio.precio);
    setEditServicioId(servicio.id);
    // Verificar si la imagen existe y construir la URL
    if (servicio.imagen) {
      const imagenUrl = `${'https://790cebce69f947b6e00a5ba226c8389a.loophole.site'}${servicio.imagen}`;
      setImagenPreview(imagenUrl); // Usar la URL completa para la vista previa
      setImagen(imagenUrl); // Mantener la imagen en el estado
    } else {
      setImagenPreview(null); // Limpiar la vista previa si no hay imagen
      setImagen(null); // Limpiar el estado de la imagen
    }

    // Verificar si la imagen existe y construir la URL
    if (servicio.imagen2) {
      const imagenUrl = `${'https://790cebce69f947b6e00a5ba226c8389a.loophole.site'}${
        servicio.imagen2
      }`;
      setImagenPreview2(imagenUrl); // Usar la URL completa para la vista previa
      setImagen2(imagenUrl); // Mantener la imagen en el estado
    } else {
      setImagenPreview2(null); // Limpiar la vista previa si no hay imagen
      setImagen2(null); // Limpiar el estado de la imagen
    }

    // Verificar si la imagen existe y construir la URL
    if (servicio.imagen3) {
      const imagenUrl = `${'https://790cebce69f947b6e00a5ba226c8389a.loophole.site'}${
        servicio.imagen3
      }`;
      setImagenPreview3(imagenUrl); // Usar la URL completa para la vista previa
      setImagen3(imagenUrl); // Mantener la imagen en el estado
    } else {
      setImagenPreview3(null); // Limpiar la vista previa si no hay imagen
      setImagen3(null); // Limpiar el estado de la imagen
    }

    // Verificar si la imagen existe y construir la URL
    if (servicio.imagen4) {
      const imagenUrl = `${'https://790cebce69f947b6e00a5ba226c8389a.loophole.site'}${
        servicio.imagen4
      }`;
      setImagenPreview4(imagenUrl); // Usar la URL completa para la vista previa
      setImagen4(imagenUrl); // Mantener la imagen en el estado
    } else {
      setImagenPreview4(null); // Limpiar la vista previa si no hay imagen
      setImagen4(null); // Limpiar el estado de la imagen
    }
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
    formData.append("nombre", nombre);
    formData.append("redes_sociales", redesSociales);
    formData.append("descripcion", descripcion);
    formData.append("telefono", telefono);
    formData.append("precio", precio);
    // Solo agregar la imagen al formData si es un archivo nuevo
    if (imagen && typeof imagen !== "string") {
      formData.append("imagen", imagen); // Solo añadir si es un archivo de imagen nuevo
    }
    if (imagen2 && typeof imagen2 !== "string") {
      formData.append("imagen2", imagen2); // Solo añadir si es un archivo de imagen nuevo
    }
    if (imagen3 && typeof imagen3 !== "string") {
      formData.append("imagen3", imagen3); // Solo añadir si es un archivo de imagen nuevo
    }
    if (imagen4 && typeof imagen4 !== "string") {
      formData.append("imagen4", imagen4); // Solo añadir si es un archivo de imagen nuevo
    }

    try {
      const token = localStorage.getItem("token");
      let url;
      let method;

      if (editMode) {
        url = `${'https://790cebce69f947b6e00a5ba226c8389a.loophole.site/api/mis_servicios/'}${editServicioId}/`;
        method = "put";
      } else {
        url = 'https://790cebce69f947b6e00a5ba226c8389a.loophole.site/api/crear_servicio/';
        method = "post";
      }

      await axios[method](url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      });

      setMensaje(
        editMode
          ? "Servicio actualizado exitosamente!"
          : "Servicio creado exitosamente!"
      );

      fetchServicios();
      setEditMode(false);
      setNombre("");
      setRedesSociales("");
      setDescripcion("");
      setTelefono("");
      setPrecio("");
      setImagen(null);
      setImagen2(null);
      setImagen3(null);
      setImagen4(null);
      setShowSidebar(false); // Cerrar sidebar tras envío exitoso

      // Limpiar mensaje de éxito después de 3 segundos
      setTimeout(() => setMensaje(""), 3000);
    } catch (error) {
      setMensaje(
        "Error al crear o actualizar el servicio: " +
          (error.response?.data?.error || "Error desconocido.")
      );
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
        <div className="FullName">{userName || "Nombre no disponible"}</div>
        <div className="TipoRol">
          {transformTipoOferente(userTipoOferente) || "Rol no disponible"}
        </div>
        <div className="Contador">{t("ServiciosCreados")}</div>

        <div className="ButtonsCRUD">
          <button onClick={handleToggleSidebar}>
            <h5>{t("CrearServicios")}</h5>
          </button>
          <button onClick={handleEditService}>
            <h5>{t("EditarServicios")}</h5>
          </button>
        </div>

        {/* Sidebar para la lista de servicios a editar */}
        {showServiceListSidebar && (
          <>
            <div
              className="overlay"
              onClick={() => setShowServiceListSidebar(false)}
            ></div>
            <div className="service-list-sidebar">
              <button
                className="close-button"
                onClick={() => setShowServiceListSidebar(false)}
              >
                <p>X</p>
              </button>
              <h3>{t("ServiciosElegir")}</h3>
              {servicios.map((servicio) => (
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
            <div
              className="overlay"
              onClick={() => setShowSidebar(false)}
            ></div>
            <div className="sidebar">
              <img src="/assets/img/visita_colbun.svg" className="Logo22" />

              <button
                className="close-button"
                onClick={() => setShowSidebar(false)}
              >
                <p>X</p>
              </button>

              <h1>{editMode ? t("EditarServicio") : t("CrearServicio")}</h1>
              <h3>{t("unete")}</h3>
              <br></br>

              <form onSubmit={handleSubmit}>
                <label>{t("nombreServicio")}</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={handleNameChange}
                  placeholder={t("nombreServicio")}
                  required
                />

                <label>{t("descripcionServicio")}</label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder={t("descripcionServicio")}
                  required
                />

                <label>{t("agregarImagen")}</label>
                <div
                  className={`file-upload-container ${
                    dragActive ? "drag-active" : ""
                  }`}
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
                    style={{ display: "none" }} // Ocultar el input real
                  />
                  <label htmlFor="file-upload" className="file-upload-label">
                    <div className="file-upload-content">
                      {imagen ? (
                        // Mostrar vista previa de la imagen si hay una
                        <img
                          src={imagenPreview}
                          alt="Vista previa"
                          className="file-upload-preview"
                        />
                      ) : (
                        // Mostrar contenido por defecto si no hay imagen
                        <>
                          <span className="file-upload-icon">↑</span>
                          <p>{t("agregarImagenInfo")}</p>
                          <p className="file-upload-instructions">
                          {t("agregarImagenRecomendacion")}
                          </p>
                        </>
                      )}
                    </div>
                  </label>
                </div>
                <label>{t("agregarImagen")}</label>
                <div
                  className={`file-upload-container ${
                    dragActive2 ? "drag-active" : ""
                  }`}
                  onDragOver={handleDragOver2}
                  onDragLeave={handleDragLeave2}
                  onDrop={handleDrop2}
                >
                  <input
                    type="file"
                    onChange={handleFileChange2}
                    accept="image/*"
                    id="file-upload2"
                    className="file-upload-input"
                    style={{ display: "none" }} // Ocultar el input real
                  />
                  <label htmlFor="file-upload2" className="file-upload-label">
                    <div className="file-upload-content">
                      {imagen2 ? (
                        // Mostrar vista previa de la imagen si hay una
                        <img
                          src={imagenPreview2}
                          alt="Vista previa"
                          className="file-upload-preview2"
                        />
                      ) : (
                        // Mostrar contenido por defecto si no hay imagen
                        <>
                          <span className="file-upload-icon">↑</span>
                          <p>{t("agregarImagenInfo")}</p>
                          <p className="file-upload-instructions">
                          {t("agregarImagenRecomendacion")}
                          </p>
                        </>
                      )}
                    </div>
                  </label>
                </div>
                <label>{t("agregarImagen")}</label>
                <div
                  className={`file-upload-container ${
                    dragActive3 ? "drag-active" : ""
                  }`}
                  onDragOver={handleDragOver3}
                  onDragLeave={handleDragLeave3}
                  onDrop={handleDrop3}
                >
                  <input
                    type="file"
                    onChange={handleFileChange3}
                    accept="image/*"
                    id="file-upload3"
                    className="file-upload-input"
                    style={{ display: "none" }} // Ocultar el input real
                  />
                  <label htmlFor="file-upload3" className="file-upload-label">
                    <div className="file-upload-content">
                      {imagen3 ? (
                        // Mostrar vista previa de la imagen si hay una
                        <img
                          src={imagenPreview3}
                          alt="Vista previa"
                          className="file-upload-preview3"
                        />
                      ) : (
                        // Mostrar contenido por defecto si no hay imagen
                        <>
                          <span className="file-upload-icon">↑</span>
                          <p>{t("agregarImagenInfo")}</p>
                          <p className="file-upload-instructions">
                          {t("agregarImagenRecomendacion")}
                          </p>
                        </>
                      )}
                    </div>
                  </label>
                </div>
                <label>{t("agregarImagen")}</label>
                <div
                  className={`file-upload-container ${
                    dragActive4 ? "drag-active" : ""
                  }`}
                  onDragOver={handleDragOver4}
                  onDragLeave={handleDragLeave4}
                  onDrop={handleDrop4}
                >
                  <input
                    type="file"
                    onChange={handleFileChange4}
                    accept="image/*"
                    id="file-upload4"
                    className="file-upload-input"
                    style={{ display: "none" }} // Ocultar el input real
                  />
                  <label htmlFor="file-upload4" className="file-upload-label">
                    <div className="file-upload-content">
                      {imagen4 ? (
                        // Mostrar vista previa de la imagen si hay una
                        <img
                          src={imagenPreview4}
                          alt="Vista previa"
                          className="file-upload-preview4"
                        />
                      ) : (
                        // Mostrar contenido por defecto si no hay imagen
                        <>
                          <span className="file-upload-icon">↑</span>
                          <p>{t("agregarImagenInfo")}</p>
                          <p className="file-upload-instructions">
                          {t("agregarImagenRecomendacion")}
                          </p>
                        </>
                      )}
                    </div>
                  </label>
                </div>

                <label>{t("RedesSociales1")}</label>
                <textarea
                  type="text"
                  value={redesSociales}
                  onChange={(e) => setRedesSociales(e.target.value)}
                  placeholder={t("RedesSociales2")}
                />

                <label>{t("Contacto1")}</label>
                <input
                  type="text"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder={t("Contacto2")}
                />

                <label>{t("Valor1")}</label>
                <input
                  type="text"
                  value={precio ? Math.floor(precio) : ""}
                  onChange={(e) => setPrecio(e.target.value.replace(/\D/g, ""))} // Solo permitir números
                  placeholder={t("Valor2")}
                />

                <button type="submit">
                  {editMode ? t("actualizarServicio") : t("CrearServicio")}
                </button>
                {mensaje && <p>{mensaje}</p>}
              </form>
            </div>
          </>
        )}

        <div className="services">
          {servicios.length === 0 ? (
            <p>{t("NotenerServicio")}</p>
          ) : (
            servicios.map((servicio) => (
              <div key={servicio.id} className="service-container">
                <div
                  className={`service-card ${
                    expandedServicio === servicio.id ? "expanded" : "closed"
                  }`}
                  onClick={() => toggleExpand(servicio.id)}
                >
                  {expandedServicio === servicio.id && (
                    <div className="service-header">
                      <h1 className="service-title">{servicio.nombre}</h1>
                    </div>
                  )}
                  <button
                    className="close-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(null);
                    }}
                  >
                    <p>X</p>
                  </button>

                  <div className="image-gallery">
                    {servicio.imagen ? (
                      <img
                        src={`${'https://790cebce69f947b6e00a5ba226c8389a.loophole.site'}${
                          servicio.imagen
                        }`}
                        alt={`Imagen de ${servicio.nombre}`}
                        className="gallery-image"
                        onError={() =>
                          console.error(
                            `Error al cargar la imagen: ${servicio.imagen}`
                          )
                        }
                      />
                    ) : (
                      <p>{t("notenerimagenes")}</p>
                    )}
                  </div>

                  {expandedServicio === servicio.id && (
                    <div
                      className={`expanded-gallery1 ${
                        servicio.imagen &&
                        !servicio.imagen2 &&
                        !servicio.imagen3 &&
                        !servicio.imagen4
                          ? "single-image"
                          : servicio.imagen &&
                            servicio.imagen2 &&
                            !servicio.imagen3 &&
                            !servicio.imagen4
                          ? "two-images"
                          : servicio.imagen &&
                            servicio.imagen2 &&
                            servicio.imagen3 &&
                            !servicio.imagen4
                          ? "three-images"
                          : "four-images"
                      }`}
                    >
                      {/* Fila de imágenes */}
                      {servicio.imagen && (
                        <img
                          src={`${'https://790cebce69f947b6e00a5ba226c8389a.loophole.site'}${
                            servicio.imagen
                          }`}
                          alt={`Imagen 1 de ${servicio.nombre}`}
                          className="expanded-gallery-image1"
                          onError={() =>
                            console.error(
                              `Error al cargar la imagen: ${servicio.imagen}`
                            )
                          }
                        />
                      )}
                      {servicio.imagen2 && (
                        <img
                          src={`${'https://790cebce69f947b6e00a5ba226c8389a.loophole.site'}${
                            servicio.imagen2
                          }`}
                          alt={`Imagen 2 de ${servicio.nombre}`}
                          className="expanded-gallery-image1"
                          onError={() =>
                            console.error(
                              `Error al cargar la imagen: ${servicio.imagen2}`
                            )
                          }
                        />
                      )}
                      {servicio.imagen3 && (
                        <img
                          src={`${'https://790cebce69f947b6e00a5ba226c8389a.loophole.site'}${
                            servicio.imagen3
                          }`}
                          alt={`Imagen 3 de ${servicio.nombre}`}
                          className="expanded-gallery-image1"
                          onError={() =>
                            console.error(
                              `Error al cargar la imagen: ${servicio.imagen3}`
                            )
                          }
                        />
                      )}
                      {servicio.imagen4 && (
                        <img
                          src={`${'https://790cebce69f947b6e00a5ba226c8389a.loophole.site'}${
                            servicio.imagen4
                          }`}
                          alt={`Imagen 4 de ${servicio.nombre}`}
                          className="expanded-gallery-image1"
                          onError={() =>
                            console.error(
                              `Error al cargar la imagen: ${servicio.imagen4}`
                            )
                          }
                        />
                      )}
                    </div>
                  )}

                  {expandedServicio === servicio.id && (
                    <div className="service-details">
                      <p className="service-description">
                        <strong>{t("Descripcion")}</strong>{" "}
                        <span>{servicio.descripcion}</span>
                      </p>

                      <div className="service-contact">
                        <strong>{t("RedesSociales")}</strong>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: servicio.redes_sociales.replace(
                              /\n/g,
                              "<br />"
                            ),
                          }}
                        />
                      </div>
                      <p className="service-email">
                        <strong>{t("Contacto")}</strong>{" "}
                        <span>{servicio.telefono || "No disponible"}</span>
                      </p>
                      <p className="service-price">
                        <strong>{t("Valor")}</strong>
                        <span>
                          ${" "}
                          {servicio.precio
                            ? Math.round(servicio.precio)
                            : "No disponible"}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
                <div className="DownCard">
                  <button
                    className="reenviar"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReenviar(servicio.id);
                    }}
                  >
                    <i className="bi bi-send-fill"></i>
                  </button>
                  <button
                    className="delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      confirmDelete(servicio.id);
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                  <h3 className="service-title">{servicio.nombre}</h3>
                  <h4 className="ser-descripcion">{servicio.descripcion}</h4>
                  <h5 className="Costo">
                    ${" "}
                    {servicio.precio
                      ? Math.round(servicio.precio)
                      : "No disponible"}
                  </h5>
                </div>
              </div>
            ))
          )}
        </div>

        <ConfirmModal
          show={showModal}
          message={
            actionType === "delete"
              ? t("ConfirmarEliminacionServicio")
              : t("ConfirmarActualizacionServicio")
          }
          onConfirm={handleConfirmAction}
          onCancel={() => setShowModal(false)}
          className="Modal-DE"
        />

        <SocialSection />
        <Footer />
      </div>
    </div>
  );
};

export default CrearServicio;
