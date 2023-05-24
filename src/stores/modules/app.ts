import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore(
  'le-admin-app',
  () => {
    type DefType = {
      dark: boolean
      lang: 'en' | 'zh'
      themeColor: string
    }

    const def: DefType = {
      dark: false,
      lang: 'zh',
      themeColor: ''
    }

    const settings = ref<DefType>({ ...def })
    const setSettingsProperty = (property: keyof DefType, value: DefType[keyof DefType]) => {
      settings.value[property] = value as never
    }
    const resetSettings = () => {
      settings.value = { ...def }
    }

    return { settings, setSettingsProperty, resetSettings }
  },
  {
    persist: true
  }
)
