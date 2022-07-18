import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

import polish from './src/constants/languages/pl.json';
import english from './src/constants/languages/en.json';

const resources = {
  en: english,
  pl: polish,
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
});

export default i18next;
