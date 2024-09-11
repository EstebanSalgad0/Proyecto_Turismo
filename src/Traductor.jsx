import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "where_to_go": "Where to go?",
      "what_to_do": "What to do?",
      "zoit_zone": "ZOIT Zone",
      "lake_colbun": "Lake Colbun",
      "rari": "Rari",
      "bellotos_reserve": "Bellotos National Reserve",
      "welcome_message": "TURN COLBÚN INTO YOUR NEXT ADVENTURE.",
      "welcome_message2": "NEXT ADVENTURE.",
      "subtitle_message": "WE WELCOME YOU TO COLBÚN",
      "watch_now": "Watch now",
      "language_switch": "ES"
    }
  },
  es: {
    translation: {
      "where_to_go": "¿A dónde ir?",
      "what_to_do": "¿Qué hacer?",
      "zoit_zone": "Zona ZOIT",
      "lake_colbun": "Lago Colbún",
      "rari": "Rari",
      "bellotos_reserve": "Reserva Nacional De Bellotos",
      "welcome_message": "¡CONVIERTE A COLBÚN EN TU",
      "welcome_message2": "¡ PRÓXIMA AVENTURA!",
      "subtitle_message": "TE DAMOS LA BIENVENIDA A LA COMUNA",
      "watch_now": "Ver ahora",
      "language_switch": "EN"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es', // Idioma por defecto (español)
    fallbackLng: 'es', // Idioma de respaldo
    interpolation: {
      escapeValue: false // React ya se encarga de evitar inyecciones XSS
    }
  });

export default i18n;
