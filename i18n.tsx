import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

import polish from './src/constants/languages/pl.json';
import english from './src/constants/languages/en.json';
import deutch from './src/constants/languages/de.json';
import ukrainian from './src/constants/languages/uk.json';

const resources = {
  en: english,
  pl: polish,
  de: deutch,
  uk: ukrainian,
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'uk',
});

export default i18next;
