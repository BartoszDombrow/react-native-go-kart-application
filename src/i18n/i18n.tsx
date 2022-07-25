import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

import polish from './languages/pl.json';
import english from './languages/en.json';
import deutch from './languages/de.json';
import ukrainian from './languages/uk.json';

const resources = {
  en: english,
  pl: polish,
  de: deutch,
  uk: ukrainian,
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
});

export default i18next;
