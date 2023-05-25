import type { App } from 'vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Nprogress from 'nprogress'

Nprogress.configure({
  showSpinner: false
})

const basicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/dashboard/index.vue')
      },
      {
        path: '/goods',
        component: () => import('@/views/goods/index.vue')
      },
      {
        path: '/goods/add',
        component: () => import('@/views/goods/GoodsAdd.vue')
      },
      {
        path: '/attrs',
        component: () => import('@/views/attrs/index.vue')
      },
      {
        path: '/attrs/group',
        component: () => import('@/views/attrs/AttrsGroup.vue')
      },
      {
        path: '/category/backend',
        component: () => import('@/views/category/CategoryBackend.vue')
      },
      {
        path: '/category/frontend',
        component: () => import('@/views/category/CategoryFrontend.vue')
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: basicRoutes
})

router.beforeEach(() => {
  Nprogress.start()
})

router.afterEach(() => {
  Nprogress.done()
})

export function setupRouter(app: App) {
  app.use(router)
}
