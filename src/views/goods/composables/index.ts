import { ref } from 'vue'
import type { ClassifyDataItem } from '../types'
import { toRaw } from 'vue'

export const useClassifyData = () => {
  const classifyData = ref<ClassifyDataItem[]>([])

  const data = history.state.classifyData as ClassifyDataItem[]
  classifyData.value = data || []

  function setClassifyData(data: ClassifyDataItem[] = []) {
    classifyData.value = data
    history.state.classifyData = toRaw(data)
  }

  return {
    classifyData,
    setClassifyData
  }
}
