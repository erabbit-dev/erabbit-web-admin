import { createPinia } from 'pinia'
import type { App } from 'vue'
import { createPersistedState } from 'pinia-plugin-persistedstate'

export const store = createPinia()

export function setupStore(app: App) {
  const persist = createPersistedState()
  store.use(persist)

  app.use(store)
}

export * from './modules/app'
export * from './modules/user'
