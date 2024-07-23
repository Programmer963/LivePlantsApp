import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './json/en.json';
import ru from './json/ru.json';

i18n
.use(initReactI18next)
.init({
    resources: {
        en: { translation: en },
        ru: { translation: ru },
    },
    lng: 'en',
    fallbackLng: 'en',
    debug: true,
    interpolation: {
        escapeValue: false,
    },
});

i18n.on('languageChanged', (lng) => {
  AsyncStorage.setItem('language', lng);
});

const loadLanguage = async () => {
  const savedLanguage = await AsyncStorage.getItem('language');
  if (savedLanguage) {
    i18n.changeLanguage(savedLanguage);
  }
};
loadLanguage();

export default i18n;
