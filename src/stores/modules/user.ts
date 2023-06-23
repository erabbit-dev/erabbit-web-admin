import { getProfileService } from '@/service/user'
import type { User } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'le-admin-user',
  () => {
    const user = ref<User>()
    const setUser = (u: User) => (user.value = u)
    const delUser = () => (user.value = undefined)
    const getUser = async () => {
      const res = await getProfileService()
      user.value = res.data
    }

    const token = ref('')
    const setToken = (t: string) => (token.value = t)

    return { user, token, setUser, delUser, getUser, setToken }
  },
  { persist: true }
)
