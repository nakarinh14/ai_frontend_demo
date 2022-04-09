import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from './en'
import zhLocale from './zh'
import hkLocale from './hk'
import thLocale from './th'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale
  },
  zh: {
    ...zhLocale
  },
  hk: {
    ...hkLocale
  },
  th: {
    ...thLocale
  }
}

export function getLanguage () {
  const chooseLanguage = localStorage.getItem('localLang')
  if (chooseLanguage) return chooseLanguage
  const language = (
    navigator.language || navigator.browserLanguage
  ).toLowerCase()
  if (language === 'th') {
    localStorage.setItem('localLang', 'th')
    return 'th'
  } else if (language === 'zh-tw') {
    localStorage.setItem('localLang', 'hk')
    return 'hk'
  } else if (language.indexOf('zh') > -1) {
    localStorage.setItem('localLang', 'zh')
    return 'zh'
  } else {
    localStorage.setItem('localLang', 'en')
    return 'en'
  }
}

const i18n = new VueI18n({
  locale: getLanguage(),
  messages
})

export default i18n
