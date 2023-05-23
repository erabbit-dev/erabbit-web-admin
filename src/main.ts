import { createApp } from 'vue'
import App from './App.vue'

import { setupStore } from '@/stores'
import { setupRouter } from '@/router'

import 'virtual:svg-icons-register'
import 'ant-design-vue/dist/antd.variable.min.css'
import '@/design/index.scss'

function bootstrap() {
  const app = createApp(App)

  setupStore(app)
  setupRouter(app)

  app.mount('#app')
}

bootstrap()
