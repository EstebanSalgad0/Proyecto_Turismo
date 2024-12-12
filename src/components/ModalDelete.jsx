import '../styles/Modal.css'; // Asegúrate de incluir el archivo de estilos
import './i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line react/prop-types
const ConfirmModal = ({ show, message, onConfirm, onCancel, className }) => {
  const { t } = useTranslation(); // Hook para usar traducciones
  if (!show) return null; // Si show es falso, no muestra el modal.

  return (
    <div className={`modal-backdrop ${className || ""}`}> {/* Clase dinámica */}
      <div className={`modal-content ${className || ""}`}> {/* También puedes agregar aquí */}
        <h2 className="text">{message}</h2>
        <div className="modal-buttons">
          <button className="modal-button confirm" onClick={onConfirm}>
          {t('confirmar')}
          </button>
          <button className="modal-button cancel" onClick={onCancel}>
          {t('cancelar')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
