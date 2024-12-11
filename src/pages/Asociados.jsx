import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Asociados.css?v=1.6';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SocialSection from '../components/SocialSeccion';
import '../components/i18n'; // Importa el archivo de configuración
import { useTranslation } from 'react-i18next';

const Asociado = () => {
  const { t, i18n } = useTranslation(); // Hook para manejar traducciones

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language'); // Obtener idioma guardado
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage); // Cambiar idioma si es necesario
    }
  }, [i18n]);

  // Hook para desplazar la página al inicio cuando se carga el componente
  useEffect(() => {
    window.scrollTo(0, 0); // Mueve la página hacia la parte superior
  }, []);

  return (
    <div className="asociado-container-as">
      {/* Navbar */}
      <Header />

      {/* Sección de encabezado */}
      <section className="header-section-as">
        <div className="header-as">
          <br></br><br></br>
          <h5>{t('VisitFooter')}</h5>
          <div className="subheader-as">
            <h1>{t('Associates')}</h1>
          </div>
        </div>
      </section>

      {/* Sección de convenios */}
      <section className="content-section-as">
        <div className="subheader-as">
          <h2>{t('Convenios')}</h2>
        </div>

        <div className="convenios-list-as">
          <p>{t('Convenios1')}</p>
          <div className='convenios-list-as-num'>
            <p>{t('Convenios2')}</p>
            <p>{t('Convenios3')}</p>
            <p>{t('Convenios4')}</p>
          </div>
        </div>

        <div className="additional-info-as">
          <p>{t('Convenios5')}</p>
        </div>

        <div className="partners-list-as">
          <h2>{t('Convenios6')}</h2>
          <ul>
            <li>Fundación Superación de la Pobreza, Maule.</li>
            <li>Corporación Cultural de San Javier.</li>
            <li>Teatro Regional del Maule.</li>
            <li>Facultad de Música, Arquitectura y Diseño, Universidad de Talca.</li>
            <li>Fundación Guayasamín de Ecuador.</li>
            <li>Corporación Educacional Aldea Rural.</li>
            <li>Parque Cultural Valparaíso.</li>
          </ul>
        </div>
      </section>
      <SocialSection/>
      <Footer/>
    </div>
  );
};

export default Asociado;
