import { router } from '@/router'
import { useUserStore } from '@/stores'
import { message } from 'ant-design-vue'
import axios, { AxiosError } from 'axios'

export const baseURL = 'http://api-xiaotuxian-front.itheima.net/'

export type ErrorData = {
  code: string
  message: string
}

function createHttp() {
  const http = axios.create({
    baseURL,
    timeout: 10000
  })

  http.interceptors.request.use(
    (config) => {
      const userStore = useUserStore()
      if (userStore.token) {
        config.headers.Authorization = `Bearer ${userStore.token}`
      }
      return config
    },
    (err) => Promise.reject(err)
  )

  http.interceptors.response.use(
    (res) => res,
    (err: AxiosError<ErrorData | undefined>) => {
      if (err.response?.status === 401) {
        const userStore = useUserStore()
        userStore.setToken('')
        userStore.delUser()
        router.push('/login')
      }
      message.error(err.response?.data?.message || '系统异常')
      return Promise.reject(err)
    }
  )

  return http
}

export const http = createHttp()

export const requestGet = <T>(url: string, params?: object) => {
  return http.get<T>(url, { params })
}

export const requestPost = <T>(url: string, data?: object) => {
  return http.post<T>(url, data)
}

export const requestDelete = <T>(url: string, data?: object) => {
  return http.delete<T>(url, { data })
}

export const requestPut = <T>(url: string, data?: object) => {
  return http.put<T>(url, data)
}
