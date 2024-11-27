import React from 'react';
import { useTranslation } from 'react-i18next'; // Para las traducciones
import '../styles/OIT.css'

const ContactSection = () => {
  const { t } = useTranslation();

  return (
    <section className="contact-section">
      <h2 className="contact-title">{t('Contact1')}</h2>
      <div className="contact-container">
        <div className="contact-item">
          <h3>WhatsApp</h3>
          <p>+569 9458 0453</p>
        </div>
        <div className="contact-item">
          <h3>{t('WriteUs')}</h3>
          <p>turismoatiende@sernatur.cl</p>
        </div>
        <div className="contact-item">
          <h3>Call Center</h3>
          <p>600 600 60 66</p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
