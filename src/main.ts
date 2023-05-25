import { createApp } from 'vue'
import App from './App.vue'

import { setupStore } from '@/stores'
import { setupRouter } from '@/router'
import { setupI18n } from './locales'

import 'virtual:svg-icons-register'
import 'ant-design-vue/dist/reset.css'
import '@/design/index.scss'

function bootstrap() {
  const app = createApp(App)

  setupStore(app)
  setupRouter(app)
  setupI18n(app)

  app.mount('#app')
}

bootstrap()
