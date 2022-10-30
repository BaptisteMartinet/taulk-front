import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from 'locales/en/translation.json';
import translationFR from 'locales/fr/translation.json';

export enum Language {
  FR = 'fr',
  EN = 'en',
}

const defaultLanguage = Language.EN;
const resources: Resource = {
  en: { translation: translationEN },
  fr: { translation: translationFR },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: defaultLanguage,
    keySeparator: '.', // to support nested translations
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  }).catch((e) => { console.log(e); });

export default i18n;
