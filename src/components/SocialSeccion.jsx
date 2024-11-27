
import '../styles/SocialSeccion.css';
import './i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';

const SocialSeccion = () => {

  const { t } = useTranslation(); // Hook para usar traducciones

  return (
    <section className="social-section1">
        <div className="social-content2">
            <h2>{t('Destination')}</h2>
            <p><strong className='strong1'>{t('Visit')}</strong>{t('Tag')}<strong className='strong1'>#VisitaColbun</strong>.</p>
            <h3>{t('Find')}</h3>
            <div className="social-icons2">
          <a href="https://www.facebook.com/profile.php?id=61557453073534&mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="https://www.instagram.com/visitacolbun/?hl=es-la" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="https://www.youtube.com/channel/UCrMAsIB1z59odXF2FTmHz-A" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-youtube"></i>
          </a>
        </div>
        </div>

        <hr className="divider" /> {/* Aquí está el divisor */}

          <div className="help-section">
            <h2>{t('Doubts')}<strong>{t('Help1')}</strong></h2>
            <div className="help-options">
              <a href="/Turismo" className="help-item">
                <div className="help-image help-image-1"></div>
                <p><strong>{t('Turism')}</strong><p>{t('Schedule')}</p></p>
              </a>
              <a href="/OIT" className="help-item">
                <div className="help-image help-image-2"></div>
                <p><strong>{t('Tourist')}</strong></p>
              </a>
              <a href="/Folleteria" className="help-item">
                <div className="help-image help-image-3"></div>
                <p><strong>{t('Brochures')}</strong></p>
              </a>
            </div>
        </div>
    </section>

  );
};

export default SocialSeccion;
