import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ar from './ar.json'
import en from './en.json'

export const LANGS = ['ar', 'en']
export const DEFAULT_LANG = 'ar'

export function getStoredLang() {
  try {
    const v = localStorage.getItem('lang')
    return LANGS.includes(v) ? v : DEFAULT_LANG
  } catch {
    return DEFAULT_LANG
  }
}

i18n.use(initReactI18next).init({
  resources: { ar: { translation: ar }, en: { translation: en } },
  lng: getStoredLang(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  returnObjects: true,
})

export default i18n
