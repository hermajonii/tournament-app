import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationSR from './locales/sr/translation.json';

const resources = {
  en: { translation: translationEN },
  sr: { translation: translationSR }
};
const savedLang = localStorage.getItem('lang'); // pročitaj iz localStorage
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLang || 'sr',        
    fallbackLng: 'sr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;