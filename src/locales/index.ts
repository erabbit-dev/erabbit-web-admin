import { createI18n } from 'vue-i18n'

import { useAppStore } from '@/stores'

import en from './en.json'
import zh from './zh-CN.json'
import type { App } from 'vue'

export function setupI18n(app: App) {
  const appStore = useAppStore()

  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: appStore.settings.lang,
    fallbackLocale: 'zh',
    messages: { en, zh }
  })

  app.use(i18n)
}
